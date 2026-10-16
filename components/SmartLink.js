import Link from "next/link";

// Next.js <Link> for pages on this site; a plain <a> for other websites and email.
export default function SmartLink({ href = "", children, ...props }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
