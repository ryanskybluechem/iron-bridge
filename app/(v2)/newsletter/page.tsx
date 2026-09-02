import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse } from "../components/Subpage";
import NewsletterForm from "../components/NewsletterForm";

export const metadata: Metadata = {
  title: "Quarterly Briefing | Iron Bridge",
  description:
    "Iron Bridge's Quarterly Briefing: one direct email a quarter on tax-law moves, engagement notes, and patterns across the book we work with. No marketing.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <Subpage
      eyebrow="Newsletter"
      title={
        <>
          The <em className="serif">Quarterly Briefing.</em>
        </>
      }
      lede="One email a quarter. Tax-law moves, engagement notes, and what we see across the book. No marketing."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Newsletter", href: "/newsletter" },
      ]}
    >
      <SpSection>
        <SpProse>
          <h2>What it is</h2>
          <p>
            Four times a year, we send a short, direct email covering what
            actually changed: tax-law moves worth knowing about, notes from
            engagements we are running, and patterns we are seeing across
            the book of clients we work with. It is not a marketing
            newsletter, and it is not padded to look busy. If an issue has
            nothing worth saying, we would rather send a shorter one than
            pad it out.
          </p>

          <h2>Who it is for</h2>
          <p>
            Business owners, current clients, and anyone weighing whether a
            forward tax projection is worth the conversation. If you want
            fewer emails with more signal, this is built for you. It is not
            for people who want frequent updates. Four issues a year is the
            whole cadence.
          </p>
        </SpProse>
      </SpSection>

      <SpSection tone="alt">
        <SpProse>
          <h2>What a typical issue covers</h2>
          <p>
            The briefing draws on the same subject matter we work through in
            engagements, not on a fixed editorial calendar. Depending on
            what is current when we sit down to write it, an issue might
            touch on:
          </p>
        </SpProse>

        <div className="sp-cards" style={{ marginTop: 28 }}>
          <div className="sp-card">
            <div className="sp-card-num">01</div>
            <div className="sp-card-t">Year-end deadlines</div>
            <p className="sp-card-d">
              How much lead time each strategy needs before December 31.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">02</div>
            <div className="sp-card-t">Entity &amp; compensation</div>
            <p className="sp-card-d">
              Structure and compensation decisions that affect what you owe.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">03</div>
            <div className="sp-card-t">Cost segregation</div>
            <p className="sp-card-d">
              Placed-in-service timing on real estate already owned or under
              consideration.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">04</div>
            <div className="sp-card-t">1031 &amp; DST rules</div>
            <p className="sp-card-d">
              Including the identification and closing clocks.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">05</div>
            <div className="sp-card-t">Engagement patterns</div>
            <p className="sp-card-d">
              Patterns we are seeing across current engagements that may be
              worth watching.
            </p>
          </div>
        </div>

        <SpProse>
          <p style={{ marginTop: 28 }}>
            These are the areas the briefing tends to draw from, not a
            preview of a specific upcoming issue.
          </p>
          <h2>What we will not do</h2>
        </SpProse>

        <div className="sp-callout">
          <strong>
            No marketing sequences, no drip campaigns, no upsell emails
            dressed up as updates.
          </strong>{" "}
          We do not sell or rent this list to anyone, and that promise
          applies to every address we hold. You can unsubscribe at any time
          using the link in the email itself. For the full detail on what we
          collect and how it is used, see the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </div>
      </SpSection>

      <SpSection>
        <NewsletterForm />
      </SpSection>
    </Subpage>
  );
}
