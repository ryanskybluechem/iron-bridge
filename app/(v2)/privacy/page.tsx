import type { Metadata } from "next";
import { Subpage, SpSection, SpProse } from "../components/Subpage";

export const metadata: Metadata = {
  title: "Privacy Policy | Iron Bridge",
  description:
    "What Iron Bridge Solutions collects through its website forms, how it is used, and how to request changes or removal.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Subpage
      eyebrow="Legal"
      title="Privacy Policy"
      lede="We collect what our forms ask for, use it to respond to you and send the briefings you sign up for, and do not sell it."
    >
      <SpSection>
        <SpProse>
          <h2>Information we collect</h2>
          <p>
            We collect information you give us directly. The free-review
            form asks for your name, business email, a projected income
            range, and a short description of what is driving your tax
            situation. The newsletter signup asks for an email address. We
            do not collect information beyond what these two forms ask for.
          </p>

          <h2>How we use it</h2>
          <p>
            We use the free-review form to respond to your inquiry and
            discuss whether Iron Bridge Solutions can help. We use your
            newsletter email to send the quarterly briefing you signed up
            for. We do not use this information for any other purpose.
          </p>

          <h2>What we do not do</h2>
          <p>
            We do not sell or rent your contact information to anyone. This
            is the same promise that appears in the fine print under our
            free-review form, and it applies to every email address and
            contact record we hold.
          </p>

          <h2>Our calculators run in your browser</h2>
          <p>
            The tax projection, cash-flow runway, and entity comparator
            tools on this site run entirely in your browser. The numbers
            you enter into them are never transmitted to Iron Bridge
            Solutions and are never stored by us.
          </p>

          <h2>Service providers</h2>
          <p>
            We use a hosting provider to operate this website. That
            provider may process form submissions and site traffic as part
            of delivering the site to you, but only to keep the site
            running, not for its own marketing purposes.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep free-review inquiries and newsletter subscriptions for
            as long as they remain useful to our relationship with you, or
            until you ask us to remove them, whichever comes first.
          </p>

          <h2>Your choices</h2>
          <p>
            You can unsubscribe from the quarterly briefing at any time
            using the link in that email. You can also ask us to delete
            your contact information by emailing{" "}
            <a href="mailto:dyoung@ironbridgesolution.com">
              dyoung@ironbridgesolution.com
            </a>
            . We will confirm once it is done.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle your information, we will update
            this page and change the effective date below.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can go to{" "}
            <a href="mailto:dyoung@ironbridgesolution.com">
              dyoung@ironbridgesolution.com
            </a>{" "}
            or 801-389-6558. Iron Bridge Solutions, 205 26th Street STE 24,
            Ogden, UT 84401.
          </p>

          <p className="sp-updated">Effective August 28, 2026</p>
        </SpProse>
      </SpSection>
    </Subpage>
  );
}
