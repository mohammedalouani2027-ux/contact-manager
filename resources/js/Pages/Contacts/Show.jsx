import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

function Row({ label, value }) {
    return (
        <div className="flex flex-col gap-1 border-b border-slate-100 py-4 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 text-sm font-medium text-slate-500">{label}</dt>
            <dd className="text-sm text-slate-900">{value || '—'}</dd>
        </div>
    );
}

export default function Show({ contact }) {
    return (
        <AppLayout title={contact.name}>
            <Head title={contact.name} />

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <dl>
                    <Row label="Name" value={contact.name} />
                    <Row label="Email" value={contact.email} />
                    <Row label="Phone" value={contact.phone} />
                    <Row label="Company" value={contact.company} />
                    <Row label="Notes" value={contact.notes} />
                </dl>

                <div className="mt-6 flex items-center gap-3">
                    <Link
                        href={`/contacts/${contact.id}/edit`}
                        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                        Edit
                    </Link>
                    <Link
                        href="/contacts"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
