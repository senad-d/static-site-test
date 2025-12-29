import { Container } from "./container";

const FACEBOOK_URL = "https://facebook.com/DimiMont-home-care";

/**
 * SiteFooter
 *
 * Bottom-of-page footer with copyright and Facebook link.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background/90">
      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row sm:text-sm text-muted-foreground">
        <p>© 2025 Dimi Mont d.o.o. All rights reserved.</p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit our Facebook page"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.1 5.66 21.3 10.44 22v-6.99H7.9v-2.94h2.54v-2.24c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.49h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.94h-2.34V22C18.34 21.3 22 17.1 22 12.07Z"
            />
          </svg>
        </a>
      </Container>
    </footer>
  );
}