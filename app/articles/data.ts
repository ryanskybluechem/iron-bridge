/**
 * Article content for /articles/[slug]. Body is a structured block list
 * so the renderer doesn't need MDX or a markdown parser. Inline italics
 * via the &lt;em class="serif"&gt; convention used elsewhere in the brand.
 */

export type Block =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export interface Article {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string; // ISO date
  body: Block[];
}

export const ARTICLES: Article[] = [
  {
    slug: "june-1st-projection",
    tag: "Tax strategy",
    title: "The June 1st projection: why timing beats tactics",
    excerpt:
      "Most owner-operators meet their tax bill in April. We meet ours in June — of the prior year. Six months changes what's possible.",
    readTime: "6 min read",
    publishedAt: "2026-04-15",
    body: [
      {
        type: "p",
        html: 'The first conversation we have with a new client almost always lands in the same place: <em class="serif">why didn\'t we know this in April?</em>',
      },
      {
        type: "p",
        html: "It's a fair question, but it points at the wrong problem. The reason your last tax return surprised you wasn't a missed deduction or a sloppy CPA. The reason was timing. By the time most business owners sit down with a return, the year is already locked. The entity is the entity. The owner comp is what it was. The depreciation schedule has already played out. There's nothing left to engineer.",
      },
      {
        type: "p",
        html: "That's not a tax problem. That's a calendar problem.",
      },
      { type: "h2", text: "What changes when you know in June" },
      {
        type: "p",
        html: "Iron Bridge runs a single sequence with every client: a CFO-grade tax projection delivered by June 1st of the current tax year. Six months before anyone is filing anything, you know — within a tight margin — what your federal liability will look like under your current trajectory.",
      },
      {
        type: "p",
        html: "That date is not arbitrary. By June, half your year is in the books and the second half is still negotiable. Bonus depreciation timing, Section 179 sequencing, R&amp;D credit qualifying activity, retirement plan funding, owner comp restructuring, real-estate cost-segregation studies, multi-state apportionment cleanup — every one of those moves has a lead time. Some of them are 30 days. Some are nine months. None of them can happen in March of the following year.",
      },
      { type: "h2", text: "The tactics owners reach for in April" },
      {
        type: "p",
        html: 'The reason "tax tactics" feels unsatisfying is that the only tactics left when April hits are the small ones. SEP-IRA contributions. A few last-minute charitable bunches. Maybe an extension that buys you eighteen extra weeks of compounding interest on a payment you already owe.',
      },
      {
        type: "p",
        html: "Real planning happens in Q2 and Q3 of the same year, not Q1 of the next.",
      },
      { type: "h2", text: "What it looks like in practice" },
      {
        type: "p",
        html: "A manufacturing client we modeled last year was on track for $340K in federal liability. That projection landed in their inbox the first week of June. Over the next seven months we executed five sequenced moves — an entity restructure that shifted the comp profile, a cost-segregation study on a new facility purchase, accelerating depreciation on $1.2M of new equipment, an R&amp;D credit study, and a defined-benefit plan layered on top of the existing 401(k). Final liability: $182K.",
      },
      {
        type: "quote",
        text: "The savings weren't in any single move. They were in the lead time.",
      },
      { type: "h2", text: "What it doesn't look like" },
      {
        type: "p",
        html: 'Aggressive shelters. Offshore structures. The sort of "strategies" that look great in a marketing slide and terrible under audit. The CPAs we coordinate with are the ones our clients already have. Our job is to give them a position to file from, not to blow it up.',
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        html: 'If your tax conversations only happen in spring, you\'re not doing tax planning. You\'re doing tax filing. Filing is hygiene. Planning needs <em class="serif">runway.</em> Six months of it.',
      },
    ],
  },
  {
    slug: "distributions-vs-reinvest",
    tag: "Cash flow",
    title: "When to take distributions vs. reinvest: a CFO framework",
    excerpt:
      "The owner-operator's hardest recurring decision. A four-question framework that takes the emotion out.",
    readTime: "9 min read",
    publishedAt: "2026-03-22",
    body: [
      {
        type: "p",
        html: "Every quarter, somewhere on a private partner call or a profit-share sheet, the same question gets asked: how much do we take out, and how much do we leave in?",
      },
      {
        type: "p",
        html: "It's one of those decisions that feels like it should be easy and almost never is. Distributions feel safe — you've already paid tax on them, the cash is liquid, and you control it personally. Reinvestment feels strategic — but only if the business is actually a better place to park capital than your other options.",
      },
      {
        type: "p",
        html: "Most owner-operators we meet have spent years answering the question by feel. Some take everything that's not nailed down. Some leave too much in and starve their personal balance sheet. Both extremes are common, and both leave money on the table.",
      },
      { type: "h2", text: "The four questions" },
      {
        type: "p",
        html: "We use the same framework with every client. Four questions, in this order:",
      },
      {
        type: "list",
        items: [
          "What is the business's incremental return on retained capital, after tax?",
          'What is your alternative — your "patient capital" rate of return outside the business?',
          "What is your personal liquidity floor?",
          "What is the tax friction on either path?",
        ],
      },
      {
        type: "p",
        html: "The order matters. The first two compare two real investments. The second two layer in constraints.",
      },
      { type: "h2", text: "Walk through it" },
      {
        type: "p",
        html: "Suppose your business retains $500K and reinvests it into a new facility that will produce $90K of incremental EBITDA per year. After your effective tax rate, that's roughly a 12–13% after-tax return on the retained capital. That's your business rate.",
      },
      {
        type: "p",
        html: 'Now your "patient capital" alternative — say a diversified taxable portfolio with a 7% expected after-tax real return. That\'s your alt rate.',
      },
      {
        type: "p",
        html: "Business 12% &gt; alt 7%, so reinvest? Not yet.",
      },
      {
        type: "p",
        html: 'Question three: do you have a six-month personal liquidity cushion already? If not, the first dollar comes home regardless of return profile. We\'ve seen brilliant operators get squeezed by a personal cash-flow event because every dollar was working "in the business."',
      },
      {
        type: "p",
        html: "Question four: does the reinvestment qualify for accelerated depreciation, an R&amp;D credit, or a Section 179 election? If yes, the after-tax return on the business side just got better. If not, the comparison is closer than it looks.",
      },
      { type: "h2", text: "What we see most often" },
      {
        type: "p",
        html: "Two patterns repeat. Operators with strong businesses take too little out — they hit their forties and discover their entire net worth is illiquid. Operators with thinner businesses take too much out — and underinvest in the very thing that funds the lifestyle.",
      },
      {
        type: "p",
        html: "The framework is meant to surface where you sit, not to give you a number. The number is downstream of the conversation.",
      },
      { type: "h2", text: "One more thing" },
      {
        type: "p",
        html: 'Don\'t make this decision once a year. Make it every quarter, against a rolling 24-month forecast you trust. The math doesn\'t change much. <em class="serif">The inputs do.</em>',
      },
    ],
  },
  {
    slug: "what-buyers-actually-look-at",
    tag: "M&A",
    title: "What buyers actually look at in your last three years of books",
    excerpt:
      "Not what you think. Three things buyers prioritize, and what to clean up two years before you go to market.",
    readTime: "12 min read",
    publishedAt: "2026-02-10",
    body: [
      {
        type: "p",
        html: "We've sat on both sides of mid-market deal tables for fifteen years. The single most expensive mistake we see sellers make is preparing the wrong things for diligence.",
      },
      {
        type: "p",
        html: 'Owners spend months sharpening their pitch deck, polishing their growth narrative, rehearsing the management roadshow. None of that survives contact with a buyer\'s quality-of-earnings team. By the time the QOE comes back, the price has been re-cut twice and the deal terms have shifted from "8x trailing" to "7x with an earnout."',
      },
      {
        type: "p",
        html: "What buyers actually examine — what survives QOE — is rarely what sellers prepare for.",
      },
      { type: "h2", text: "Three things, in order" },
      {
        type: "p",
        html: 'First: the <em class="serif">quality</em> of the revenue line. Not the size of it. Not the growth rate. The quality.',
      },
      {
        type: "p",
        html: "That means: customer concentration. Recurring vs. one-time. Contract length. Renewal rates. Pricing power evidence. The kind of revenue that justifies a multiple is repeatable, defensible, and not concentrated in a handful of relationships that will leave with you when you do.",
      },
      {
        type: "p",
        html: 'Second: the <em class="serif">legitimacy</em> of EBITDA addbacks. Every seller hands the buyer an "adjusted EBITDA" schedule with a list of one-time and owner-related expenses added back. The sophisticated buyer rejects 30–50% of those addbacks on first pass. The gap between what you claim and what the buyer accepts is the gap between your asking price and your closing price.',
      },
      {
        type: "p",
        html: "Third: how clean the books are versus how clean they look. Cash basis vs. accrual. Revenue recognition consistency. Balance-sheet movements that don't tie. Inventory that's been sitting untouched for two years. Receivables that should have been written off three quarters ago. Buyers don't penalize messy books — they discount them.",
      },
      { type: "h2", text: "What you can actually fix" },
      {
        type: "p",
        html: "Two years before you go to market is when this work matters. Six months before market is too late.",
      },
      {
        type: "list",
        items: [
          "Diversify revenue concentration deliberately, even at slightly lower margins.",
          "Tighten contracts. Move month-to-month customers to annual where you can.",
          "Move from cash-basis to accrual at least 24 months before the trailing-twelve-months window the buyer will examine.",
          "Audit your addback schedule against a buyer's lens, not yours. Get a third party to red-team it.",
          "Get clean financials by an outside firm — not necessarily a Big Four audit, but reviewed financials that establish a baseline.",
        ],
      },
      { type: "h2", text: "What buyers don't care about" },
      {
        type: "p",
        html: "Your origin story. Your team chemistry. Your culture deck. The things you'd talk about at a conference are not the things they'll pay for.",
      },
      {
        type: "p",
        html: "It sounds cynical. It's actually freeing — once you accept that diligence is a financial exercise, you stop trying to win it with a narrative and start winning it with documentation.",
      },
      { type: "h2", text: "The compounding mistake" },
      {
        type: "p",
        html: "The owner who sells at 6.5x what they expected to sell at 8x didn't get unlucky. They got under-prepared. The work that closes the gap is two years of slow, unsexy hygiene. Not a polished deck.",
      },
      {
        type: "quote",
        text: "Start now. Not when the banker is at the door.",
      },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Format an ISO date as e.g. "April 15, 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
