import { profile } from "@/data/portfolio";
import { SocialIcon } from "@/components/ui/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p suppressHydrationWarning>
          © {year} {profile.name}. Designed &amp; built with Next.js, GSAP and Three.js.
        </p>
        <ul className="flex items-center gap-5">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                className="link-underline inline-flex items-center gap-2 hover:text-fg"
              >
                <SocialIcon name={s.icon} className="size-3.5" />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
