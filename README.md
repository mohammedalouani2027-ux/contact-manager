# Contact Manager — Laravel 13 + Inertia.js + React (SQLite)

A simple, fully functional **Contact Management (CRUD)** application built for the
**Seomaniak 2026 Developer Test**.

It lets you create, list, search, view, edit and delete contacts. The backend is
Laravel 13, the frontend is React rendered through Inertia.js (no separate API layer),
and data is stored in a zero-config SQLite file.

---

## 🧱 Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Backend   | Laravel 13 (PHP 8.3+)                        |
| Frontend  | React 18 via Inertia.js 2                    |
| Bundler   | Vite 6                                       |
| Styling   | Tailwind CSS v4                              |
| Database  | SQLite                                       |
| Testing   | PHPUnit 11                                   |

Inertia.js glues Laravel and React together: controllers return `Inertia::render()`
instead of Blade views or JSON, and each React page component receives its data as props.
No REST endpoints, no client-side routing setup.

---

## ✅ Requirements

- PHP **8.3+** with the `pdo_sqlite` extension enabled
- Composer 2
- Node.js **18+** and npm

---

## 🚀 Setup

```bash
# 1. Install PHP dependencies
composer install

# 2. Install JS dependencies
npm install

# 3. Create your environment file & app key
cp .env.example .env
php artisan key:generate

# 4. Create the SQLite database file (if it doesn't exist) and run migrations + demo data
touch database/database.sqlite
php artisan migrate --seed

# 5a. Build the frontend once...
npm run build

# 5b. ...or run Vite in watch mode during development (in a second terminal)
npm run dev

# 6. Serve the app
php artisan serve
```

Then open **http://localhost:8000** — the root URL redirects to `/contacts`.

> Tip: `composer run dev` starts the PHP server, queue listener and Vite together.

---

## 🗺️ Routes

The app uses a single Laravel resource route (`Route::resource('contacts', ...)`),
which expands to the standard 7 RESTful routes:

| Verb        | URI                      | Action  | Purpose                         |
| ----------- | ------------------------ | ------- | ------------------------------- |
| GET         | `/contacts`              | index   | List + search + paginate        |
| GET         | `/contacts/create`       | create  | Show the "new contact" form     |
| POST        | `/contacts`              | store   | Persist a new contact           |
| GET         | `/contacts/{contact}`    | show    | Show one contact                |
| GET         | `/contacts/{contact}/edit` | edit  | Show the edit form              |
| PUT/PATCH   | `/contacts/{contact}`    | update  | Update a contact                |
| DELETE      | `/contacts/{contact}`    | destroy | Delete a contact                |

`GET /` redirects to `/contacts`.

---

## 🗂️ Project structure

```
contact-manager/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ContactController.php     # CRUD logic (index/create/store/show/edit/update/destroy)
│   │   ├── Requests/
│   │   │   ├── StoreContactRequest.php   # Validation for creating
│   │   │   └── UpdateContactRequest.php  # Validation for updating (unique email ignores self)
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php # Shares flash messages + app name with React
│   ├── Models/
│   │   └── Contact.php                   # Eloquent model
│   └── Providers/AppServiceProvider.php
├── bootstrap/
│   └── app.php                           # Laravel 13 app config + middleware registration
├── config/
│   ├── app.php
│   └── database.php                      # SQLite set as default connection
├── database/
│   ├── migrations/…create_contacts_table.php
│   ├── factories/ContactFactory.php      # Fake data (Moroccan-style phone numbers)
│   ├── seeders/DatabaseSeeder.php        # Seeds 12 demo contacts
│   └── database.sqlite                   # The SQLite database file
├── resources/
│   ├── css/app.css                       # Tailwind v4 + brand tokens
│   ├── js/
│   │   ├── app.jsx                       # Inertia + React bootstrap
│   │   ├── Layouts/AppLayout.jsx         # Header, nav, toast flash messages
│   │   ├── Components/ContactForm.jsx    # Reusable form (shared by Create & Edit)
│   │   └── Pages/Contacts/
│   │       ├── Index.jsx                 # Table, search, pagination, delete
│   │       ├── Create.jsx
│   │       ├── Edit.jsx
│   │       └── Show.jsx
│   └── views/app.blade.php               # Root HTML that mounts Inertia
├── routes/
│   ├── web.php                           # Route::resource('contacts', ...)
│   └── console.php
├── tests/Feature/ContactTest.php         # CRUD + validation tests
├── composer.json
├── package.json
└── vite.config.js
```

---

## 🧪 Running tests

```bash
php artisan test
```

Covers: index loads, contact creation, required/unique email validation, update, and delete.

---

## ✨ Features

- Full CRUD with clean, RESTful routing
- Server-side validation via Form Requests, errors shown inline in the form
- Live search across name / email / company
- Pagination (8 per page)
- Flash "toast" confirmations after each action
- Reusable form component shared between Create and Edit
- Responsive Tailwind UI

---

## 📼 Test deliverables reminder (Seomaniak)

- [ ] Push this repository to **GitHub**
- [ ] Record `App_Demo.mp4` (app in action)
- [ ] Take **5 screenshots** (list, create form, validation error, edit, delete confirmation)
- [ ] Record `Pitch_Dev_PrénomNom.mp4` (1 min: what you did / learned / would improve)
- [ ] Upload everything to `Test_Seomaniak_PrénomNom_2025` and share with **info@seomaniak.ma**
