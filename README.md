# Contact Manager — Laravel 13 + Inertia.js + React (SQLite)

Une application **de gestion de contacts (CRUD)** simple et entièrement fonctionnelle,
réalisée dans le cadre du **Test Développeur Seomaniak 2026**.

Elle permet de créer, lister, rechercher, consulter, modifier et supprimer des contacts.
Le back-end est en Laravel 13, le front-end en React affiché via Inertia.js (sans couche
API séparée), et les données sont stockées dans un fichier SQLite sans configuration.

---

## 🧱 Stack technique

| Couche          | Technologie                |
| --------------- | -------------------------- |
| Back-end        | Laravel 13 (PHP 8.3+)      |
| Front-end       | React 18 via Inertia.js 2  |
| Bundler         | Vite 6                     |
| Styles          | Tailwind CSS v4            |
| Base de données | SQLite                     |
| Tests           | PHPUnit 12                 |

Inertia.js relie Laravel et React : les contrôleurs renvoient `Inertia::render()`
au lieu de vues Blade ou de JSON, et chaque composant de page React reçoit ses données
sous forme de props. Aucune route REST, aucune configuration de routage côté client.

---

## ✅ Prérequis

- PHP **8.3+** avec l'extension `pdo_sqlite` activée
- Composer 2
- Node.js **18+** et npm

---

## 🚀 Installation

```bash
# 1. Installer les dépendances PHP
composer install

# 2. Installer les dépendances JavaScript
npm install

# 3. Créer le fichier d'environnement et la clé d'application
cp .env.example .env
php artisan key:generate

# 4. Créer le fichier SQLite (s'il n'existe pas) puis lancer les migrations + les données de démo
touch database/database.sqlite
php artisan migrate --seed

# 5a. Compiler le front-end une fois...
npm run build

# 5b. ...ou lancer Vite en mode surveillance pendant le développement (dans un 2e terminal)
npm run dev

# 6. Démarrer l'application
php artisan serve
```

Ouvre ensuite **http://localhost:8000** — l'URL racine redirige vers `/contacts`.

> Astuce : `composer run dev` démarre le serveur PHP, l'écouteur de file d'attente et Vite en même temps.

---

## 🗺️ Routes

L'application utilise une seule route de ressource Laravel (`Route::resource('contacts', ...)`),
qui se déploie en 7 routes RESTful standard :

| Verbe       | URI                        | Action  | Rôle                                   |
| ----------- | -------------------------- | ------- | -------------------------------------- |
| GET         | `/contacts`                | index   | Lister + rechercher + paginer          |
| GET         | `/contacts/create`         | create  | Afficher le formulaire de création     |
| POST        | `/contacts`                | store   | Enregistrer un nouveau contact         |
| GET         | `/contacts/{contact}`      | show    | Afficher un contact                    |
| GET         | `/contacts/{contact}/edit` | edit    | Afficher le formulaire de modification |
| PUT/PATCH   | `/contacts/{contact}`      | update  | Mettre à jour un contact               |
| DELETE      | `/contacts/{contact}`      | destroy | Supprimer un contact                   |

`GET /` redirige vers `/contacts`.

---

## 🗂️ Structure du projet

```
contact-manager/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ContactController.php     # Logique CRUD (index/create/store/show/edit/update/destroy)
│   │   ├── Requests/
│   │   │   ├── StoreContactRequest.php   # Validation à la création
│   │   │   └── UpdateContactRequest.php  # Validation à la modification (email unique, s'ignore lui-même)
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php # Partage les messages flash + le nom de l'app avec React
│   ├── Models/
│   │   └── Contact.php                   # Modèle Eloquent
│   └── Providers/AppServiceProvider.php
├── bootstrap/
│   └── app.php                           # Configuration de l'app Laravel 13 + middleware
├── config/
│   ├── app.php
│   └── database.php                      # SQLite défini comme connexion par défaut
├── database/
│   ├── migrations/…create_contacts_table.php
│   ├── factories/ContactFactory.php      # Fausses données (numéros de téléphone marocains)
│   ├── seeders/DatabaseSeeder.php        # Insère 12 contacts de démonstration
│   └── database.sqlite                   # Le fichier de base de données SQLite
├── resources/
│   ├── css/app.css                       # Tailwind v4 + variables de marque
│   ├── js/
│   │   ├── app.jsx                       # Amorçage Inertia + React
│   │   ├── Layouts/AppLayout.jsx         # En-tête, navigation, notifications flash (toast)
│   │   ├── Components/ContactForm.jsx    # Formulaire réutilisable (partagé par Create & Edit)
│   │   └── Pages/Contacts/
│   │       ├── Index.jsx                 # Tableau, recherche, pagination, suppression
│   │       ├── Create.jsx
│   │       ├── Edit.jsx
│   │       └── Show.jsx
│   └── views/app.blade.php               # HTML racine qui monte Inertia
├── routes/
│   ├── web.php                           # Route::resource('contacts', ...)
│   └── console.php
├── tests/Feature/ContactTest.php         # Tests CRUD + validation
├── composer.json
├── package.json
└── vite.config.js
```

---

## 🧪 Lancer les tests

```bash
php artisan test
```

Couvre : le chargement de la liste, la création d'un contact, la validation email
obligatoire/unique, la mise à jour et la suppression.

---

## ✨ Fonctionnalités

- CRUD complet avec un routage RESTful propre
- Validation côté serveur via les Form Requests, erreurs affichées directement dans le formulaire
- Recherche instantanée sur nom / email / société
- Pagination (8 par page)
- Notifications « toast » après chaque action
- Composant de formulaire réutilisable, partagé entre la création et la modification
- Interface responsive avec Tailwind

