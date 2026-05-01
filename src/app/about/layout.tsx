import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about BE. Tech Agency, our philosophy, and our experienced team of founders and engineers.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
