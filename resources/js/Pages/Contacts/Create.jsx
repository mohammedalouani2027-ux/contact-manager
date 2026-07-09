import ContactForm from '@/Components/ContactForm';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/contacts');
    }

    return (
        <AppLayout title="New contact">
            <Head title="New contact" />
            <ContactForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Create contact"
            />
        </AppLayout>
    );
}
