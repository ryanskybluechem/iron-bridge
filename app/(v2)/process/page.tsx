import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpCta } from "../components/Subpage";
import Reveal from "../components/Reveal";
import MaskReveal from "../components/MaskReveal";

export const metadata: Metadata = {
  title: "Process | Iron Bridge",
  description:
    "Iron Bridge's four-step process: one forward tax projection, every strategy modeled side by side, the right team chosen, then execution before December 31.",
  alternates: { canonical: "/process" },
};

const steps = [
  {
    num: "01",
    k: "Project",
    t: "One forward tax projection",
    d: (
      <>
        <p>
          Every engagement starts the same way, with one model instead of a
          pile of separate documents. Prior returns, current financials,
          entity structure and projected income are pulled together into a
          single forward tax projection, built while the tax year is still
          open. That timing is the entire point. A projection built in
          January of the following year is a history lesson. A projection
          built in the third quarter, while income, entities and cash are
          still in motion, is a decision tool.
        </p>
        <p>
          The projection produces one number: what you are on track to owe.
          From there, we can start asking a more useful question, which is
          not &quot;what happened&quot; but &quot;what can still change
          before it does.&quot;
        </p>
        <p>
          Want a starting number before a full engagement? Rough out a first
          pass with the{" "}
          <Link href="/tools/tax-projection">tax projection tool</Link>.
        </p>
      </>
    ),
  },
  {
    num: "02",
    k: "Model",
    t: "Every option, side by side",
    d: (
      <>
        <p>
          A single number is not a plan. Once we know what you are on track
          to owe, we quantify the strategies that could reduce it and put
          them next to each other: tax saved, cash required, timing, risk
          and long-term economics for each option, modeled against your
          actual facts rather than presented as generic tactics. Every
          option is pulled from{" "}
          <Link href="/strategies">the strategy areas we model</Link>.
        </p>
        <p>
          This is also where options get ruled out. Some strategies look
          attractive on paper but require more cash than makes sense for
          your situation, or carry timing and risk that does not fit. The
          goal is not to find a reason to do everything. It is to find out
          what is actually worth doing, and let go of the rest before it
          costs you time or capital.
        </p>
      </>
    ),
  },
  {
    num: "03",
    k: "Decide",
    t: "Choose the right team around the plan",
    d: (
      <>
        <p>
          A plan only works if the people responsible for filing understand
          it. If your relationship with your current CPA is working, it
          stays in place. We coordinate the projection and strategy directly
          with them, and there is no forced switch. Many engagements run
          exactly this way, with Iron Bridge bringing the forward-looking
          modeling and the existing CPA handling preparation.
        </p>
        <p>
          If that relationship is not delivering the proactive planning you
          want, transitioning tax preparation and planning to Iron Bridge is
          the other path. Either way, the decision at this stage is about
          who is best positioned to carry the plan through to the return,
          not about starting over. Read more about{" "}
          <Link href="/about">who is on the Iron Bridge team</Link>.
        </p>
      </>
    ),
  },
  {
    num: "04",
    k: "Execute",
    t: "Carry it through to year-end",
    d: (
      <>
        <p>
          A strategy that is decided but not implemented saves nothing. The
          execute step sequences implementation through year-end and tracks
          what has to be funded, closed or placed in service, and by when.
          Some moves require capital to be committed, some require a
          transaction to close, and some require an asset to be in service
          before the calendar turns. We track each one against its own
          deadline rather than treating year-end as a single cutoff.
        </p>
        <p>
          Throughout execution, the strategy stays connected to whoever
          actually signs the return, whether that is your current CPA or
          Iron Bridge&apos;s tax team, so the modeling done earlier in the
          year shows up correctly on the filing.
        </p>
      </>
    ),
  },
];

export default function ProcessPage() {
  return (
    <Subpage
      eyebrow="The Iron Bridge process"
      title={
        <>
          Project. Model. Decide. <em className="serif">Execute.</em>
        </>
      }
      lede="The first objective is clarity: what is the current tax exposure, what is still executable, and what is worth doing economically?"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Process", href: "/process" },
      ]}
    >
      <SpSection>
        <div className="sp-steps">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="sp-step">
                <div>
                  <div className="sp-step-num">{s.num}</div>
                  <div className="sp-step-k">{s.k}</div>
                </div>
                <div>
                  <div className="sp-step-t">{s.t}</div>
                  <div className="sp-step-d">{s.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SpSection>

      <SpSection tone="dark">
        <MaskReveal>
          <div className="sp-band-title">
            Most of the menu closes on{" "}
            <em className="serif">December 31.</em>
          </div>
          <p className="sp-band-note">
            For most strategies, the hard deadline is December 31, and
            several require lead time before that date to fund, close or
            place an asset in service.
          </p>
        </MaskReveal>
      </SpSection>

      <SpSection tone="alt">
        <Reveal>
          <div className="sp-callout">
            <strong>
              The earlier the projection exists, the more of the menu is
              still open.
            </strong>{" "}
            See the full sequence applied in the{" "}
            <Link href="/case-study">case study</Link>.
          </div>
        </Reveal>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
