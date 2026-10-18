import Link from "next/link";
import styles from "./homeowners.module.css";
import { HOMEOWNER_QUOTE_HREF } from "@/lib/links";

const JOBS = [
  { name: "Electrical faults", body: "Tripping switches, dead sockets, flickering lights or anything that feels unsafe." },
  { name: "New sockets and circuits", body: "Kitchens, extensions, garden rooms, garages and outbuildings." },
  { name: "Full and partial rewires", body: "Replacing old wiring, plus consumer unit upgrades." },
  { name: "EV chargers", body: "A home charge point, quoted and booked like any other job." },
  { name: "Safety inspections", body: "Condition reports (EICRs) for landlords, sales and peace of mind." },
  { name: "Something else", body: "Lighting, outdoor power or anything else, described in your own words." },
];

export function JobTypes() {
  return (
    <section className={styles.jobs}>
      <div className="container">
        <header className={styles.head}>
          <h2 className={styles.h2}>Whatever the job, start it the same way.</h2>
          <p className={styles.lead}>
            Big or small, every request goes through your account, so nothing gets lost in texts
            and voicemails.
          </p>
        </header>
        <ul className={styles.jobGrid}>
          {JOBS.map((j) => (
            <li key={j.name}>
              <h3>{j.name}</h3>
              <p>{j.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PROMISES = [
  { title: "Free for homeowners", body: "Your electrician pays for Ai4Trade. You never will." },
  { title: "Only you and your electrician", body: "Your jobs, photos and documents are private to your account and the business you book." },
  { title: "Yours to keep", body: "Download your certificates and invoices whenever you need them." },
];

export function Promises() {
  return (
    <section className={styles.promises}>
      <div className="container">
        <h2 className={`${styles.h2} ${styles.onDark}`}>Free, private and yours to keep.</h2>
        <ul className={styles.promiseGrid}>
          {PROMISES.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GuidesTeaser() {
  return (
    <section className={styles.guides}>
      <div className="container">
        <div className={styles.guidesCard}>
          <div>
            <h2 className={styles.guidesTitle}>New to booking online?</h2>
            <p className={styles.guidesText}>
              Short guides show you how to send a request, draw a floor plan and find your
              certificates.
            </p>
          </div>
          <Link href="/tutorials/homeowners" className="btn btn--ghost">
            Homeowner guides
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeownerClosing({ id }) {
  return (
    <section className={styles.closing} id={id}>
      <div className="container">
        <h2 className={styles.closingTitle}>Get the job done. Skip the chasing.</h2>
        <p className={styles.closingLead}>Free quotes, and a free account to keep it all in.</p>
        <a href={HOMEOWNER_QUOTE_HREF} className="btn btn--copper">
          Get a free quote
        </a>
      </div>
    </section>
  );
}
