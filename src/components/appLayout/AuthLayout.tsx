import React from "react";

interface Props {
  children: any;
}
export default function AuthLayout({ children }: Props) {
  console.log("Auth Layout Rendered!");
  return <>{children}</>;
}
