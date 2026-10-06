"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { codeShape, interfaceShape, neuralShape, scatterShape, PHASES } from "./shapes";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uIntro;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  uniform float uMouseStrength;

  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aScatter;
  attribute float aRand;

  varying float vAlpha;
  varying float vAccent;

  vec3 pick(float i) {
    return i < 0.5 ? position : (i < 1.5 ? aShape1 : aShape2);
  }

  void main() {
    float m = mod(uMorph, 3.0);
    float idx = floor(m);
    float f = fract(m);

    // Staggered per-particle transition so shapes dissolve rather than snap.
    float t = clamp((f - aRand * 0.35) / 0.65, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(pick(idx), pick(mod(idx + 1.0, 3.0)), t);

    // Swirl mid-flight, gentle shimmer at rest.
    float flight = sin(t * 3.14159);
    p += vec3(sin(aRand * 40.0 + uTime), cos(aRand * 31.0 + uTime * 0.8), sin(aRand * 17.0 + uTime * 0.6)) * flight * 0.32;
    p += vec3(sin(uTime * 0.7 + aRand * 20.0), cos(uTime * 0.6 + aRand * 13.0), 0.0) * 0.012;

    // Assemble from a scattered cloud on load.
    float intro = clamp(uIntro * 1.45 - aRand * 0.45, 0.0, 1.0);
    intro = 1.0 - pow(1.0 - intro, 3.0);
    p = mix(aScatter, p, intro);

    // Cursor gently pushes particles aside.
    vec2 d = p.xy - uMouse.xy;
    float dist = length(d);
    float push = smoothstep(0.85, 0.0, dist) * uMouseStrength;
    p.xy += normalize(d + 0.0001) * push * 0.32;
    p.z += push * 0.25;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + fract(aRand * 13.0) * 0.9) / -mv.z;

    vAlpha = (0.25 + 0.5 * fract(aRand * 7.0)) * intro;
    vAccent = step(0.87, aRand) + push * 0.6;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d);
    vec3 col = mix(uColor, uAccent, clamp(vAccent, 0.0, 1.0));
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

const HOLD = 3.4;
const TRANSITION = 1.8;
const CYCLE = HOLD + TRANSITION;

/**
 * A single Points object whose particles morph between three formations.
 * Built imperatively in an effect: mutable GPU resources stay out of React state.
 */
export default function ParticleMorph({ count = 7000, pointer, intro, animate = true, interactive = true, onPhase }) {
  const group = useRef(null);
  const points = useRef(null);
  const phase = useRef(-1);
  const mouseWorld = useRef(new THREE.Vector3(99, 99, 0));
  const mouseStrength = useRef(0);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(codeShape(count), 3));
    geometry.setAttribute("aShape1", new THREE.BufferAttribute(interfaceShape(count), 3));
    geometry.setAttribute("aShape2", new THREE.BufferAttribute(neuralShape(count), 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatterShape(count), 3));
    const r = new Float32Array(count);
    for (let i = 0; i < count; i++) r[i] = Math.random();
    geometry.setAttribute("aRand", new THREE.BufferAttribute(r, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uIntro: { value: 0 },
        uSize: { value: 22 },
        uPixelRatio: { value: gl.getPixelRatio() },
        uMouse: { value: new THREE.Vector3(99, 99, 0) },
        uMouseStrength: { value: 0 },
        uColor: { value: new THREE.Color("#e9e9ee") },
        uAccent: { value: new THREE.Color("#ff6a3d") },
      },
    });

    const obj = new THREE.Points(geometry, material);
    const parent = group.current;
    parent.add(obj);
    points.current = obj;

    return () => {
      parent.remove(obj);
      geometry.dispose();
      material.dispose();
      points.current = null;
    };
  }, [count, gl]);

  const ray = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const ndc = useRef(new THREE.Vector2());

  useFrame(({ clock, camera }, delta) => {
    const obj = points.current;
    const g = group.current;
    if (!obj || !g) return;
    const u = obj.material.uniforms;
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    u.uTime.value = animate ? t : 0;
    u.uIntro.value = intro.current.p;
    u.uPixelRatio.value = gl.getPixelRatio();

    // Morph clock: hold each shape, then transition. Starts once assembled.
    if (animate) {
      const local = Math.max(0, t - intro.current.startAt);
      const cycle = Math.floor(local / CYCLE);
      const within = local - cycle * CYCLE;
      u.uMorph.value = cycle + THREE.MathUtils.clamp((within - HOLD) / TRANSITION, 0, 1);
      const current = (within < HOLD + TRANSITION / 2 ? cycle : cycle + 1) % PHASES.length;
      if (current !== phase.current) {
        phase.current = current;
        onPhase?.(current);
      }
    }

    // Damped tilt toward the cursor plus a slow idle sway.
    const px = interactive ? pointer.current.x : 0;
    const py = interactive ? pointer.current.y : 0;
    const sway = animate ? Math.sin(t * 0.25) * 0.12 : 0;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.35 + sway, 2.4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, py * 0.22, 2.4, dt);

    // Project the cursor onto the particle plane in the group's local space.
    if (interactive && pointer.current.active) {
      ndc.current.set(pointer.current.nx, pointer.current.ny);
      ray.current.setFromCamera(ndc.current, camera);
      const hit = ray.current.ray.intersectPlane(plane.current, mouseWorld.current);
      if (hit) g.worldToLocal(mouseWorld.current);
    }
    mouseStrength.current = THREE.MathUtils.damp(
      mouseStrength.current,
      interactive && pointer.current.active ? 1 : 0,
      4,
      dt
    );
    u.uMouse.value.lerp(mouseWorld.current, 1 - Math.exp(-10 * dt));
    u.uMouseStrength.value = mouseStrength.current;
  });

  return <group ref={group} />;
}
