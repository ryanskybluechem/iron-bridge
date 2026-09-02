import type { Metadata } from "next";
import { Subpage, SpSection, SpProse } from "../components/Subpage";

export const metadata: Metadata = {
  title: "Terms of Use | Iron Bridge",
  description:
    "The terms that govern use of the Iron Bridge Solutions website, including what our content is and is not.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Subpage
      eyebrow="Legal"
      title="Terms of Use"
      lede="This site is informational. Nothing on it is advice, and using it means you agree to these terms."
    >
      <SpSection>
        <SpProse>
          <h2>Acceptance</h2>
          <p>
            By using this website, you agree to these terms. If you do not
            agree, please do not use the site.
          </p>

          <h2>Informational purposes only</h2>
          <p>
            Everything on this site is presented for informational and
            illustrative purposes only. It is not financial, tax, legal, or
            investment advice, and it is not an offer or solicitation to buy
            or sell any security. Your specific situation may differ from
            what is described here, and you should not act on anything on
            this site without talking to us or another qualified
            professional first.
          </p>

          <h2>Case studies</h2>
          <p>
            Case-study details on this site are anonymized. Results shown
            are specific to the facts described and do not guarantee
            future outcomes for you or anyone else.
          </p>

          <h2>Calculators are illustrative</h2>
          <p>
            The tax projection, cash-flow runway, and entity comparator
            tools on this site are illustrative only. They are built to
            show how a strategy might work in general terms, not to
            calculate your actual tax liability or produce a number you
            should rely on.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, design, and tools on this site belong to Iron Bridge
            Solutions. You may view and share pages from this site, but you
            may not copy, republish, or reuse our content for your own
            business without asking us first.
          </p>

          <h2>No warranties</h2>
          <p>
            We do our best to keep this site accurate and up to date, but we
            make no promises that it is complete, current, or error free.
            The site is provided as is.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent allowed by law, Iron Bridge Solutions is not
            responsible for losses or damages that come from your use of
            this site or reliance on anything it contains. This site is a
            starting point for a conversation, not a substitute for advice
            tailored to your situation.
          </p>

          <h2>Links to other sites</h2>
          <p>
            This site may link to third-party websites. We do not control
            those sites and are not responsible for their content or
            practices.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Utah.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continuing to use
            the site after a change means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can go to{" "}
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
