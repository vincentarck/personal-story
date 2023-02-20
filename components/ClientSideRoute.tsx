import React from "react";
import Link from "next/link";

export default function ClientSideRoute({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return <Link href={href}>{children}</Link>;
}
