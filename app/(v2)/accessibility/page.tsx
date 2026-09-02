import type { Metadata } from "next";
import { Subpage, SpSection, SpProse } from "../components/Subpage";

export const metadata: Metadata = {
  title: "Accessibility Statement | Iron Bridge",
  description:
    "Our approach to making the Iron Bridge Solutions website usable for everyone, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <Subpage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      lede="We are working toward WCAG 2.1 AA across this site, and we want to hear about anything that gets in your way."
    >
      <SpSection>
        <SpProse>
          <h2>Our commitment</h2>
          <p>
            Iron Bridge Solutions wants this website to be usable by as many
            people as possible. We are aiming for conformance with WCAG 2.1
            Level AA, the widely used standard for web accessibility.
          </p>

          <h2>What we have done</h2>
          <p>
            We have built this site with semantic headings so its structure
            is easy to follow with a screen reader or keyboard. Interactive
            controls, including forms and navigation, are reachable by
            keyboard. Scroll-driven animations respect your
            reduced-motion setting and turn off automatically when it is
            on. We provide text alternatives for meaningful images.
          </p>

          <h2>Known limitations</h2>
          <p>
            Some sections of this site use scroll-tied animation to reveal
            text and imagery. We have tried to keep these sections readable
            even when animation is reduced or disabled, but if you find a
            section that blocks you from reading or navigating the page,
            please tell us. We would rather fix it than have you struggle
            with it.
          </p>

          <h2>Feedback</h2>
          <p>
            If you run into an accessibility barrier anywhere on this site,
            email{" "}
            <a href="mailto:dyoung@ironbridgesolution.com">
              dyoung@ironbridgesolution.com
            </a>{" "}
            or call 801-389-6558. Please describe the page and what
            happened. We aim to respond within a few business days.
          </p>

          <h2>This statement</h2>
          <p>
            This statement covers the Iron Bridge Solutions website at
            ironbridgesolution.com and will be updated as our work on
            accessibility continues.
          </p>

          <p className="sp-updated">Effective August 28, 2026</p>
        </SpProse>
      </SpSection>
    </Subpage>
  );
}
