import { createClient } from '@/lib/supabase/server';

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">Users</h1>
      </div>

      <div className="bg-panel border border-theme overflow-hidden">
        <table className="min-w-full divide-y divide-theme">
          <thead className="bg-theme">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider font-mono">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-panel divide-y divide-theme">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-primary font-mono">
                  {user.full_name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {(user as any).email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {user.is_admin ? 'Admin' : 'User'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-muted font-mono">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!users || users.length === 0) && (
          <div className="text-center py-12">
            <p className="text-theme-muted font-mono">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
