import styles from "../for-electricians/ForElectricians.module.css";

export const metadata = {
  title: "Get electrical work done — Ai4Trade",
  description:
    "Book a free enquiry with an electrician using Ai4Trade, track your job, and keep every certificate in one place.",
};

const SERVICES = [
  {
    code: "SVC-01",
    title: "EICR — Electrical Installation Condition Report",
    body: "A full safety check of your property's wiring, required when selling, renting, or simply due for a check-up.",
  },
  {
    code: "SVC-02",
    title: "Fault finding and repairs",
    body: "Flickering lights, tripping circuits, or a socket that's stopped working — book a diagnosis with a local electrician.",
  },
  {
    code: "SVC-03",
    title: "Rewires and consumer unit upgrades",
    body: "Full or partial rewiring, and replacing an old fuse box with a modern consumer unit.",
  },
  {
    code: "SVC-04",
    title: "EV charger installation",
    body: "Home charge point installation, quoted and scheduled through the same portal as any other job.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">For homeowners</span>
          <h1 className={styles.heroTitle}>
            Book electrical work, and actually know what's happening with it.
          </h1>
          <p className={styles.heroLead}>
            Ai4Trade is free for you to use — your electrician's the one
            paying for the tools. Register, describe the job, and track it
            through to a signed certificate.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {SERVICES.map((s) => (
              <div className="tag" key={s.code}>
                <span className="tag__code">{s.code}</span>
                <h3 className="tag__title">{s.title}</h3>
                <p className="tag__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight" id="eicr">
        <div className="container">
          <span className="eyebrow">EICR explained</span>
          <h2 style={{ fontSize: 26, margin: "14px 0 12px" }}>
            What actually happens during an inspection
          </h2>
          <p style={{ color: "var(--paper-dim)", maxWidth: 640, fontSize: 15 }}>
            An electrician checks your wiring, consumer unit, sockets, and
            earthing against current safety standards, notes anything that
            needs attention using standard observation codes, and issues a
            certificate confirming the result. Landlords typically need one
            every five years; homeowners often get one done when buying a
            property or after major work.
          </p>
        </div>
      </section>
    </>
  );
}
