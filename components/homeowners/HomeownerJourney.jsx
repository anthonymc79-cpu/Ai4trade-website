"use client";

import StoryScroller from "../home/StoryScroller";
import {
  ChooseJobScreen,
  PlanAndPhotosScreen,
  PriceScreen,
  TrackScreen,
  AccountScreen,
} from "./screens";

const STEPS = [
  {
    title: "Tell your electrician what you need",
    body: "Pick the type of job, from a fault or new sockets to a full rewire or an EV charger, and add a few words about it.",
    Screen: ChooseJobScreen,
  },
  {
    title: "Show them, don’t just describe it",
    body: "Draw a simple floor plan of the room on a tablet or computer and mark where you want sockets and lights. Add photos too. Your electrician sees exactly what you mean.",
    Screen: PlanAndPhotosScreen,
  },
  {
    title: "Get a price sooner",
    body: "Some jobs show an estimate as soon as you finish your floor plan. Your electrician’s quote arrives in the app, and you can accept it or ask for changes there and then.",
    Screen: PriceScreen,
  },
  {
    title: "Always know where your job is up to",
    body: "Every stage shows up in your account as it happens: quote sent, booked in, job complete, certificates sent. No ringing round for updates.",
    Screen: TrackScreen,
  },
  {
    title: "Keep everything for your home in one place",
    body: "Quotes, invoices, certificates, floor plans and photos stay in your account, ready when you sell the house, rent it out or need more work done.",
    Screen: AccountScreen,
  },
];

export default function HomeownerJourney() {
  return (
    <StoryScroller
      id="how-it-works"
      title="How it works for you."
      lead="From the first message to the last certificate, all in one free account."
      steps={STEPS}
    />
  );
}
