<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_application_redirects_root_to_contacts(): void
    {
        $this->get('/')->assertRedirect('/contacts');
    }
}
