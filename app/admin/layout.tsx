import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, FileText, BookOpen, Users, Settings } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  // Check for Master Admin override
  const masterEmail = process.env.MASTER_ADMIN_EMAIL;
  const isMasterUser = masterEmail && user.email === masterEmail;

  // If user is master admin but not marked as admin in DB, update it
  if (isMasterUser && !profile?.is_admin) {
    const adminSupabase = createAdminClient();
    await adminSupabase
      .from('user_profiles')
      .update({ is_admin: true })
      .eq('id', user.id);
  } else if (!profile?.is_admin) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-theme font-mono">
      {/* Top Navigation */}
      <nav className="bg-panel border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <GraduationCap className="h-8 w-8 text-brand-orange" />
              <span className="ml-2 text-xl font-extrabold text-theme-primary tracking-[0.2em] group-hover:text-brand-orange transition-colors">Admin Panel</span>
            </Link>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/browse" className="text-theme-muted hover:text-brand-orange transition-colors uppercase tracking-wider">
                View Site
              </Link>
              <Link href="/dashboard" className="text-theme-muted hover:text-brand-orange transition-colors uppercase tracking-wider">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="bg-panel border border-theme p-4 space-y-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <FileText className="h-4 w-4 mr-3" />
                Papers
              </Link>
              <Link
                href="/admin/booklets"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <BookOpen className="h-4 w-4 mr-3" />
                Booklets
              </Link>
              <Link
                href="/admin/subjects"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <BookOpen className="h-4 w-4 mr-3" />
                Subjects
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <FileText className="h-4 w-4 mr-3" />
                Orders & Invoices
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <Users className="h-4 w-4 mr-3" />
                Users
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center px-4 py-2 text-theme-muted hover:bg-theme hover:text-brand-orange transition-colors uppercase tracking-wider text-xs"
              >
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
