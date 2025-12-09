import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, LogOut, Download, ShoppingBag, User } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get user's purchases
  const { data: purchases } = await supabase
    .from('purchases')
    .select(`
      *,
      paper:papers(
        *,
        subject:subjects(name),
        exam_type:exam_types(name)
      )
    `)
    .eq('user_id', user.id)
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-theme font-mono">
      {/* Navigation */}
      <nav className="bg-panel border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-extrabold text-theme-primary tracking-[0.2em] group-hover:text-brand-orange transition-colors">TRI AXIS</span>
            </Link>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/subjects/o-level" className="text-theme-muted hover:text-brand-orange transition-colors uppercase tracking-wider">
                Browse Papers
              </Link>
              {profile?.is_admin && (
                <Link href="/admin" className="text-theme-muted hover:text-brand-orange transition-colors uppercase tracking-wider">
                  Admin Panel
                </Link>
              )}
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-theme-muted hover:text-red-500 flex items-center uppercase tracking-wider transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-panel border border-theme p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-theme border border-theme rounded-full p-3 mr-4">
              <User className="h-8 w-8 text-brand-orange" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">
                Welcome back, {profile?.full_name || 'Student'}!
              </h1>
              <p className="text-theme-muted text-sm mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-panel border border-theme p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Total Purchases</p>
                <p className="text-3xl font-bold text-theme-primary">{purchases?.length || 0}</p>
              </div>
              <div className="bg-theme border border-theme rounded-full p-3">
                <ShoppingBag className="h-6 w-6 text-brand-teal" />
              </div>
            </div>
          </div>

          <div className="bg-panel border border-theme p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Available Downloads</p>
                <p className="text-3xl font-bold text-theme-primary">{purchases?.length || 0}</p>
              </div>
              <div className="bg-theme border border-theme rounded-full p-3">
                <Download className="h-6 w-6 text-brand-orange" />
              </div>
            </div>
          </div>

          <div className="bg-panel border border-theme p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-theme-muted uppercase tracking-wider mb-1">Account Type</p>
                <p className="text-xl font-bold text-theme-primary uppercase">
                  {profile?.is_admin ? 'Admin' : 'Student'}
                </p>
              </div>
              <div className="bg-theme border border-theme rounded-full p-3">
                <User className="h-6 w-6 text-theme-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* My Purchases */}
        <div className="bg-panel border border-theme">
          <div className="px-6 py-4 border-b border-theme">
            <h2 className="text-xl font-bold text-theme-primary uppercase tracking-wide">My Purchased Papers</h2>
          </div>

          {purchases && purchases.length > 0 ? (
            <div className="divide-y divide-theme">
              {purchases.map((purchase) => {
                const paper = purchase.paper as any;
                return (
                  <div key={purchase.id} className="p-6 hover:bg-theme/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-theme-primary mb-1 uppercase tracking-wide">
                          {paper.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs text-theme-muted uppercase tracking-wider">
                          <span>{paper.exam_type?.name}</span>
                          <span>•</span>
                          <span>{paper.subject?.name}</span>
                          <span>•</span>
                          <span>{paper.year}</span>
                        </div>
                        <p className="text-xs text-theme-muted mt-2">
                          Purchased on {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-lg font-bold text-brand-teal">
                          ৳{purchase.amount}
                        </span>
                        <a
                          href={paper.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-brand-orange hover:text-white border border-brand-orange hover:bg-brand-orange px-4 py-2 transition-all uppercase tracking-wider"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-theme-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-theme-primary mb-2 uppercase tracking-wide">
                No purchases yet
              </h3>
              <p className="text-theme-muted mb-6 text-sm">
                Browse our collection to find the papers you need
              </p>
              <Link href="/subjects/o-level" className="inline-block border border-brand-orange text-brand-orange px-6 py-3 uppercase tracking-[0.2em] text-sm hover:bg-brand-orange hover:text-white transition-all">
                Browse Papers
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
