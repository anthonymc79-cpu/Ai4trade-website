import { permanentRedirect } from "next/navigation";

// The homeowners page moved to /homeowners. Old links (menus, emails,
// Google) are sent there automatically.
export default function ServicesPage() {
  permanentRedirect("/homeowners");
}
