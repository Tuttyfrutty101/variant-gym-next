import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Admin",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
