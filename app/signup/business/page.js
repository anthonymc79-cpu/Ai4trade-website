import { Suspense } from "react";
import BusinessSignupForm from "./BusinessSignupForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start your subscription — Ai4Trade",
  description:
    "Create your Ai4Trade account — start a free 7-day trial or subscribe to Starter or Pro.",
  path: "/signup/business",
});

export default function BusinessSignupPage() {
  return (
    <Suspense fallback={null}>
      <BusinessSignupForm />
    </Suspense>
  );
}
