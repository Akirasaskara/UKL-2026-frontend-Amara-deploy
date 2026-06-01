import { ProtectedRoute } from "@/features/auth/guards/ProtectedRoute";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute role="ADMIN">
      <div className="min-h-screen bg-paper">
        <AdminSidebar />
        <div className="md:pl-64">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
