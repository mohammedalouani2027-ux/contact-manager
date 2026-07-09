import ContactForm from '@/Components/ContactForm';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ contact }) {
    const { data, setData, put, processing, errors } = useForm({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        notes: contact.notes || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/contacts/${contact.id}`);
    }

    return (
        <AppLayout title={`Edit ${contact.name}`}>
            <Head title={`Edit ${contact.name}`} />
            <ContactForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Save changes"
            />
        </AppLayout>
    );
}
