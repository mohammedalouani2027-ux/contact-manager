import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ contacts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    function submitSearch(e) {
        e.preventDefault();
        router.get('/contacts', { search }, { preserveState: true, replace: true });
    }

    function destroy(contact) {
        if (confirm(`Delete "${contact.name}"? This cannot be undone.`)) {
            router.delete(`/contacts/${contact.id}`, { preserveScroll: true });
        }
    }

    return (
        <AppLayout title="Contacts">
            <Head title="Contacts" />

            <form onSubmit={submitSearch} className="mb-5 flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email or company…"
                    className="w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
                <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
                    Search
                </button>
            </form>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {contacts.data.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                                    No contacts found.
                                </td>
                            </tr>
                        )}
                        {contacts.data.map((contact) => (
                            <tr key={contact.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/contacts/${contact.id}`}
                                        className="font-semibold text-slate-900 hover:text-brand-600"
                                    >
                                        {contact.name}
                                    </Link>
                                    {contact.phone && (
                                        <div className="text-xs text-slate-400">{contact.phone}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-slate-600">{contact.email}</td>
                                <td className="px-6 py-4 text-slate-600">{contact.company || '—'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3 text-sm font-medium">
                                        <Link
                                            href={`/contacts/${contact.id}/edit`}
                                            className="text-brand-600 hover:text-brand-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => destroy(contact)}
                                            className="text-rose-600 hover:text-rose-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {contacts.links.length > 3 && (
                <div className="mt-5 flex flex-wrap gap-1">
                    {contacts.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            preserveScroll
                            className={
                                'rounded-md px-3 py-1.5 text-sm ' +
                                (link.active
                                    ? 'bg-brand-600 text-white'
                                    : link.url
                                      ? 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                                      : 'cursor-default text-slate-300')
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
