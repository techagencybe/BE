import { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard | BE. Agency",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {children}
    </div>
  );
}
