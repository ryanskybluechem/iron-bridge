"use client";

import ScrollDarkenWords from "./ScrollDarkenWords";
import SplitMask from "./SplitMask";

/**
 * Full-viewport intro for the Process section. The eyebrow uses a quick
 * SplitMask reveal on viewport entry; the headline darkens word-by-word
 * tied to scroll position via ScrollDarkenWords; the lede arrives last.
 */
export default function ProcessIntro() {
  return (
    <div className="pi-stage">
      <div className="container pi-stage-inner">
        <SplitMask className="pi-eyebrow" stagger={40} delay={120}>
          The Iron Bridge method
        </SplitMask>

        <h2 className="pi-title">
          <ScrollDarkenWords startVH={0.95} endVH={0.35} overlap={0.18}>
            Three steps. <em className="serif">Six months</em> of leverage.
          </ScrollDarkenWords>
        </h2>

        <SplitMask
          className="pi-lede"
          stagger={20}
          delay={1000}
          rootMargin="0px"
        >
          A single sequenced engagement that turns reactive year-end tax prep
          into proactive multi-quarter strategy.
        </SplitMask>
      </div>
    </div>
  );
}
