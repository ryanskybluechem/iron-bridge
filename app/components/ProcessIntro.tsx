"use client";

import SplitMask from "./SplitMask";

/**
 * Full-viewport intro for the Process section. Eyebrow + headline + lede
 * animate in word-by-word with a mask reveal — and that's it. Stripped
 * back to the editorial moment.
 */
export default function ProcessIntro() {
  return (
    <div className="pi-stage">
      <div className="container pi-stage-inner">
        <SplitMask className="pi-eyebrow" stagger={40} delay={120}>
          The Iron Bridge method
        </SplitMask>

        <h2 className="pi-title">
          <SplitMask stagger={70} delay={240}>
            Three steps. <em className="serif">Six months</em> of leverage.
          </SplitMask>
        </h2>

        <SplitMask
          className="pi-lede"
          stagger={20}
          delay={1300}
          rootMargin="0px"
        >
          A single sequenced engagement that turns reactive year-end tax prep
          into proactive multi-quarter strategy.
        </SplitMask>
      </div>
    </div>
  );
}
