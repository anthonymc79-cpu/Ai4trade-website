import { Suspense } from "react";
import CustomerSignupForm from "./CustomerSignupForm";

export const metadata = {
  title: "Register — Voltro",
};

export default function CustomerSignupPage() {
  return (
    <Suspense fallback={null}>
      <CustomerSignupForm />
    </Suspense>
  );
}
