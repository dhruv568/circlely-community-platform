'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, UserCheck, ShieldAlert, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
  profile?: { username?: string; city?: string } | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: nextStatus }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u)));
      }
    } catch {
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u)));
    }
  };

  const handleToggleVerify = async (userId: string, currentVerified: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isVerified: !currentVerified }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, isVerified: !currentVerified } : u)));
      }
    } catch {
      setUsers(users.map((u) => (u.id === userId ? { ...u, isVerified: !currentVerified } : u)));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-lg">
            C
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">User Management</h1>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>
        <Link href="/admin" className="text-xs font-semibold text-gray-300 hover:text-white">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
        
        {/* Search */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-3 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user by name or email..."
            className="w-full text-xs focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase text-gray-400 font-bold tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Verified</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{u.name}</p>
                    <p className="text-gray-400 text-[11px]">{u.email}</p>
                  </td>
                  <td className="p-4 font-bold text-purple-700">{u.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        u.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.isVerified ? (
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-gray-400">Unverified</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleVerify(u.id, u.isVerified)}
                      className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold hover:bg-purple-100"
                    >
                      {u.isVerified ? 'Unverify' : 'Verify'}
                    </button>
                    <button
                      onClick={() => handleToggleStatus(u.id, u.status)}
                      className={`px-3 py-1 rounded-lg font-bold ${
                        u.status === 'ACTIVE' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
