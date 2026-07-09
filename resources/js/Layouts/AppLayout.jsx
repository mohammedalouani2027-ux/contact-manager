import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AppLayout({ title, children }) {
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success });
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error });
        }
        const timer = setTimeout(() => setToast(null), 3500);
        return () => clearTimeout(timer);
    }, [flash]);

    return (
        <div className="min-h-full">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link
                        href="/contacts"
                        className="flex items-center gap-2 text-lg font-bold text-slate-900"
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                            CM
                        </span>
                        Contact Manager
                    </Link>
                    <Link
                        href="/contacts/create"
                        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                        + New contact
                    </Link>
                </div>
            </header>

            {toast && (
                <div className="mx-auto max-w-5xl px-6 pt-4">
                    <div
                        className={
                            'rounded-lg px-4 py-3 text-sm font-medium ' +
                            (toast.type === 'success'
                                ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200'
                                : 'bg-rose-50 text-rose-800 ring-1 ring-rose-200')
                        }
                    >
                        {toast.message}
                    </div>
                </div>
            )}

            <main className="mx-auto max-w-5xl px-6 py-8">
                {title && (
                    <h1 className="mb-6 text-2xl font-bold text-slate-900">
                        {title}
                    </h1>
                )}
                {children}
            </main>
        </div>
    );
}
