import { Link } from '@inertiajs/react';

function Field({ label, name, type = 'text', value, onChange, error, required, textarea }) {
    const base =
        'mt-1 block w-full rounded-lg border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 focus:outline-none';

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            {textarea ? (
                <textarea
                    id={name}
                    name={name}
                    rows={4}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className={base}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className={base}
                />
            )}
            {error && <p className="mt-1 text-sm text-rose-600">{error}</p>}
        </div>
    );
}

export default function ContactForm({ data, setData, errors, processing, onSubmit, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" value={data.name} onChange={setData} error={errors.name} required />
                <Field label="Email" name="email" type="email" value={data.email} onChange={setData} error={errors.email} required />
                <Field label="Phone" name="phone" value={data.phone} onChange={setData} error={errors.phone} />
                <Field label="Company" name="company" value={data.company} onChange={setData} error={errors.company} />
            </div>
            <Field label="Notes" name="notes" value={data.notes} onChange={setData} error={errors.notes} textarea />

            <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                    href="/contacts"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
                >
                    {processing ? 'Saving…' : submitLabel}
                </button>
            </div>
        </form>
    );
}
