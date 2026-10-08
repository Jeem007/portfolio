import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCover from "@/components/ui/ProjectCover";
import TechBadge from "@/components/ui/TechBadge";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { pad } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — ${profile.name}`, description: project.description, url: `/work/${project.slug}` },
  };
}

function Block({ title, children }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="eyebrow pt-1">{title}</h2>
      <div className="max-w-2xl text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const tags = project.technologies.length ? project.technologies : project.highlights;

  const facts = [
    ["Category", project.category],
    ["Year", project.year],
    ["Role", project.role],
    ...(project.facts || []),
  ].filter(([, v]) => v);

  return (
    <>
      <Navbar home={false} />
      <main id="main" className="pt-28 md:pt-36">
        <article className="container-x">
          <Link href="/#work" className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All work
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-sm text-accent">{pad(index + 1)}</p>
              <h1 className="text-display mt-3">{project.title}</h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button href={project.liveUrl} external>
                    Visit live site
                  </Button>
                )}
                {project.githubUrl && (
                  <Button href={project.githubUrl} variant="ghost" icon={GithubIcon} external>
                    View source
                  </Button>
                )}
                {project.extraLinks?.map((l) => (
                  <Button key={l.href} href={l.href} variant="ghost" external>
                    {l.label}
                  </Button>
                ))}
              </div>
            </div>
          </header>

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-line">
            <ProjectCover project={project} index={index} priority className="aspect-[16/9]" sizes="100vw" />
          </div>

          {facts.length > 0 && (
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-16">
            <Block title="Overview">
              <p>{project.longDescription || project.description}</p>
            </Block>
            {tags.length > 0 && (
              <Block title={project.technologies.length ? "Stack" : "Highlights"}>
                <ul className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li key={t}>
                      <TechBadge>{t}</TechBadge>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {project.steps?.length > 0 && (
              <Block title="How it works">
                <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                  {project.steps.map((s, i) => (
                    <li key={s.title} className="bg-surface p-5">
                      <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                      <p className="mt-3 font-medium text-fg">{s.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            )}
            {project.features?.length > 0 && (
              <Block title="Features">
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f.title} className="border-l border-accent/40 pl-4">
                      <p className="font-medium text-fg">{f.title}</p>
                      <p className="mt-1 text-base leading-relaxed">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {project.challenges && (
              <Block title="Challenge">
                <p>{project.challenges}</p>
              </Block>
            )}
            {project.solution && (
              <Block title="Solution">
                <p>{project.solution}</p>
              </Block>
            )}
            {project.results && (
              <Block title="Results">
                <p>{project.results}</p>
              </Block>
            )}
          </div>

          {project.images?.length > 0 && (
            <section className="border-t border-line pt-10">
              <h2 className="eyebrow">Screens</h2>
              <div className="mt-8 grid items-start gap-x-6 gap-y-10 md:grid-cols-2">
                {project.images.map((img) => (
                  <figure key={img.src} className={img.wide ? "md:col-span-2" : undefined}>
                    <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                      {img.width ? (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes={img.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="h-auto w-full"
                        />
                      ) : (
                        <div className="relative aspect-[4/3]">
                          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                        </div>
                      )}
                    </div>
                    {img.caption && <figcaption className="mt-3 text-sm text-subtle">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          <Link
            href={`/work/${next.slug}`}
            data-cursor="view"
            className="group my-24 flex items-end justify-between gap-6 border-t border-line pt-10"
          >
            <span>
              <span className="eyebrow">Next project</span>
              <span className="mt-3 block text-heading transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                {next.title}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-10 shrink-0 text-muted transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:size-16"
            />
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
