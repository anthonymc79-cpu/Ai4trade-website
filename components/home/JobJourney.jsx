"use client";

import StoryScroller from "./StoryScroller";
import {
  BookingScreen,
  QuoteScreen,
  ScheduleScreen,
  CertificateScreen,
  InvoiceScreen,
} from "./screens";

const STEPS = [
  {
    title: "Your customer books online",
    body: "They use your own booking page, pick the job, add photos or draw a floor plan, and send it. Everything arrives in one place, ready for you to price.",
    Screen: BookingScreen,
  },
  {
    title: "You quote from a floor plan",
    body: "Sketch the property on a tablet, mark where the sockets, lights and consumer unit go, and turn it into a priced quote the customer can accept online.",
    Screen: QuoteScreen,
  },
  {
    title: "Deposits and reminders go out on their own",
    body: "When a quote is accepted, Ai4Trade asks for the deposit, chases it if it’s late and confirms the booking. Your customer always knows where their job is up to.",
    Screen: ScheduleScreen,
  },
  {
    title: "The certificate is filled in on site",
    body: "EIC, EICR and Minor Works certificates, laid out like the BS 7671 forms. Import your test results instead of typing them, then sign and send.",
    Screen: CertificateScreen,
  },
  {
    title: "You get paid and the books are done",
    body: "Send the invoice, let overdue reminders do the chasing, and the payment lands in your accounts. Certificates go to the customer with it.",
    Screen: InvoiceScreen,
  },
];

export default function JobJourney() {
  return (
    <StoryScroller
      id="how-it-works"
      title="Follow one job all the way through."
      lead="Here’s what Ai4Trade does at each stage, from the moment a customer gets in touch to the day the money arrives."
      steps={STEPS}
    />
  );
}
