<?php

namespace Tests\Feature;

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_page_loads(): void
    {
        Contact::factory()->count(3)->create();

        $this->get('/contacts')->assertOk();
    }

    public function test_a_contact_can_be_created(): void
    {
        $response = $this->post('/contacts', [
            'name' => 'Amina Zahra',
            'email' => 'amina@example.com',
            'phone' => '+212 600 000 000',
            'company' => 'Seomaniak',
            'notes' => 'Lead from Oujda expo.',
        ]);

        $response->assertRedirect('/contacts');
        $this->assertDatabaseHas('contacts', ['email' => 'amina@example.com']);
    }

    public function test_email_is_required_and_unique(): void
    {
        Contact::factory()->create(['email' => 'taken@example.com']);

        $this->post('/contacts', [
            'name' => 'Test',
            'email' => 'taken@example.com',
        ])->assertSessionHasErrors('email');

        $this->post('/contacts', ['name' => 'No Email'])
            ->assertSessionHasErrors('email');
    }

    public function test_a_contact_can_be_updated(): void
    {
        $contact = Contact::factory()->create(['name' => 'Old Name']);

        $this->put("/contacts/{$contact->id}", [
            'name' => 'New Name',
            'email' => $contact->email,
        ])->assertRedirect('/contacts');

        $this->assertDatabaseHas('contacts', ['id' => $contact->id, 'name' => 'New Name']);
    }

    public function test_a_contact_can_be_deleted(): void
    {
        $contact = Contact::factory()->create();

        $this->delete("/contacts/{$contact->id}")->assertRedirect('/contacts');

        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }
}
