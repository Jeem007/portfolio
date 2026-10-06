import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x grid min-h-svh place-content-center gap-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-heading">
        This page <span className="font-serif font-normal italic text-accent">doesn&apos;t exist.</span>
      </h1>
      <Link href="/" className="link-underline mx-auto text-muted hover:text-fg">
        Back to the homepage
      </Link>
    </main>
  );
}
