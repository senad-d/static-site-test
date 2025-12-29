import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

/**
 * Home – DimiMont Home-Care single-page layout
 *
 * Order per PRD:
 * 1. Global sticky header
 * 2. Hero
 * 3. About
 * 4. Projects
 * 5. Mailing List and Contacts
 * 6. Footer
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background text-foreground">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
