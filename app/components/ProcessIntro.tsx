"use client";

import ScrollSplitMask from "./ScrollSplitMask";
import SplitMask from "./SplitMask";

/**
 * Full-viewport intro for the Process section. The eyebrow uses a quick
 * SplitMask reveal on viewport entry; the headline types in word-by-word
 * tied to scroll position via ScrollSplitMask; the lede arrives last on
 * a regular split-mask delay.
 */
export default function ProcessIntro() {
  return (
    <div className="pi-stage">
      <div className="container pi-stage-inner">
        <SplitMask className="pi-eyebrow" stagger={40} delay={120}>
          The Iron Bridge method
        </SplitMask>

        <h2 className="pi-title">
          <ScrollSplitMask startVH={0.95} endVH={0.35} overlap={0.18}>
            Three steps. <em className="serif">Six months</em> of leverage.
          </ScrollSplitMask>
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
