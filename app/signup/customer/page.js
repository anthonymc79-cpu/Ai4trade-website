import { Suspense } from "react";
import CustomerSignupForm from "./CustomerSignupForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Register — Ai4Trade",
  description:
    "Register for free with your electrician's Ai4Trade portal to book and track a job through to a signed certificate.",
  path: "/signup/customer",
});

export default function CustomerSignupPage() {
  return (
    <Suspense fallback={null}>
      <CustomerSignupForm />
    </Suspense>
  );
}
