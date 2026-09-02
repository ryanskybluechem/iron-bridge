const ArrowLg = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/** The free-review form, shared by the homepage contact section and /contact. */
export default function ContactForm() {
  return (
            <form className="cta-form">
              <div className="cta-form-head">
                <span className="cta-form-tag">Free initial review</span>
                <span className="cta-form-meta">We reply within two business days</span>
              </div>
              <div className="form-row">
                <label>Name</label>
                <input type="text" placeholder="Jane Doe" />
              </div>
              <div className="form-row">
                <label>Business email</label>
                <input type="email" placeholder="jane@business.com" />
              </div>
              <div className="form-row">
                <label>Projected income this year</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $500K</option>
                  <option>$500K to $1M</option>
                  <option>$1M to $5M</option>
                  <option>$5M+</option>
                </select>
              </div>
              <div className="form-row">
                <label>What is driving the tax bill</label>
                <textarea rows={3} placeholder="Entities, property, a sale, or you are not sure yet" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Request your free review
                <ArrowLg />
              </button>
              <div className="form-fineprint">
                By submitting, you agree to be contacted about your inquiry. We
                do not sell contact data.
              </div>
            </form>
  );
}
