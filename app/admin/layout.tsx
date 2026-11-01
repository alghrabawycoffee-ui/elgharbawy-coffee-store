import AdminSidebar from "@/components/AdminSidebar";

// السطر ده بيمنع Next.js من محاولة عمل Prerender لأي صفحة تحت /admin
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}