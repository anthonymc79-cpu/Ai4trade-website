import { Suspense } from "react";
import BusinessSignupForm from "./BusinessSignupForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start your free trial — Ai4Trade",
  description:
    "Create your Ai4Trade account. Everything in Pro, free for 30 days, no card needed.",
  path: "/signup/business",
});

export default function BusinessSignupPage() {
  return (
    <Suspense fallback={null}>
      <BusinessSignupForm />
    </Suspense>
  );
}
