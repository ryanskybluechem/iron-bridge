import type { Metadata } from "next";
import { Subpage, SpSection, SpProse } from "../components/Subpage";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Iron Bridge",
  description:
    "Reach Iron Bridge Solutions in Ogden, Utah. Call or email either partner directly, or request a free initial tax review and we will reply within two business days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Subpage
      eyebrow="Contact"
      title={
        <>
          Start with a <em className="serif">conversation.</em>
        </>
      }
      lede="Call or email either partner directly, or send the form and we will reply within two business days."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact" },
      ]}
    >
      <SpSection>
        <div className="contact-grid">
          <div className="contact-details">
            <div className="contact-row">
              <div className="contact-row-k">David Young</div>
              <div className="contact-row-v">
                <a href="mailto:dyoung@ironbridgesolution.com">
                  dyoung@ironbridgesolution.com
                </a>
                <a href="tel:8013896558">801-389-6558</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-k">David Edwards</div>
              <div className="contact-row-v">
                <a href="mailto:dedwards@ironbridgesolution.com">
                  dedwards@ironbridgesolution.com
                </a>
                <a href="tel:8014996824">801-499-6824</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-row-k">Office</div>
              <div className="contact-row-v">
                <span>
                  205 26th Street STE 24
                  <br />
                  Ogden, UT 84401
                </span>
              </div>
            </div>

            <SpProse>
              <p>
                Not sure where to start? Send the form with whatever you know
                about this year&apos;s numbers. The first review is free, and
                if there is not a meaningful planning opportunity, we will say
                so plainly.
              </p>
            </SpProse>
          </div>

          <ContactForm />
        </div>
      </SpSection>
    </Subpage>
  );
}
