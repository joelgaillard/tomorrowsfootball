# ⚽ Tomorrow's Football

**Tomorrow's Football** is a fictional platform designed to **encourage more women to become football coaches** by showcasing inspiring stories, offering practical resources, and organizing events. One of the project’s key components is a **dedicated streaming series** that highlights the journeys and voices of women in the world of coaching.

> 🎓 This project was developed as part of the **3rd-year Integration Project** in **Media Engineering** at [HEIG-VD](https://heig-vd.ch).

The platform is built using modern web technologies and aims to blend **content, community, and coaching resources** in a single, user-friendly experience.

---

## 🚀 Features

- **Homepage** introducing the initiative and highlighting the streaming series.
- **Streaming Series Page** to explore all episodes and stories.
- **"Become a Coach" Section** with practical information and a signup form for aspiring coaches.
- **Giveaway Form** to allow users to enter contests.
- **Events Page** listing upcoming coaching-related events, filterable by region.
- **Event Detail Page** with full program, map, and registration form.
- **Join the Community** form to sign up for news and resources.
- **Custom Error Page** for improved error handling.

---

## 🧠 Project Objectives

- **Promote female representation in football coaching**
- **Inspire through storytelling**, with an original web series available directly on the platform
- **Support action** through real events, practical resources, and community tools

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3 + Vite)
- **Styling**: Tailwind CSS
- **Image Optimization**: Nuxt Image
- **Component System**: Custom reusable components (e.g., `BaseMap`, `BaseRegistration`, `BaseDropdown`)
- **Server API**: Built-in with Nuxt server API (e.g. `server/api/subscribe.ts`)
- **Mailchimp Integration**: For community, events and giveaway registration forms
- **Google Maps**: Embedded via iframe for event venues

---

## 🧩 Nuxt Server-Side Logic

The application uses Nuxt 3’s server-side features to handle dynamic content and API routes:

- **API endpoints** under `server/api/` (e.g., `subscribe.ts`) handle external services like Mailchimp.
- **Dynamic routes** under `/events/[id]` and `/events/[id]/register` fetch content server-side via `useAsyncData()` and `useFetch()`.
- **Error handling** and validation are done both client-side and server-side using `createError()` and input checks.

---

## 📁 Project Structure Overview

```plaintext
.
├── components/
│   ├── Base/                  # Reusable UI components
│   ├── The/                   # Header, Footer
├── pages/
│   ├── index.vue              # Homepage
│   ├── giveaway.vue           # Giveaway form
│   ├── become-a-coach.vue     # Info page for future coaches
│   ├── series.vue             # Streaming series
│   ├── events/
│   │   ├── index.vue          # Event list with region filters
│   │   ├── [id]/index.vue     # Event detail page
│   │   ├── [id]/register.vue  # Event registration form
├── server/
│   ├── api/                   # API routes
├── assets/                    # Styles, logo
├── public/                    # Public static files
├── nuxt.config.ts             # Nuxt configuration
```

## 💻 Getting Started (Local Setup)

To run this project locally, make sure your development environment includes the following:

- **Node.js** (v18 or higher)
- **npm**

### Step 1: Clone the repository

```bash
git clone https://github.com/joelgaillard/tomorrowsfootball.git
cd tomorrowsfootball
```


### Step 2: Configure the environment

Duplicate the .env.example file and rename it to .env. This file contains environment variables used for configuring services like the Mailchimp API.

```bash
cp .env.example .env
```

Fill in the required values (e.g. Mailchimp API key, list ID, etc.).

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

Once started, the application will be available at:

```
http://localhost:3000
```

> Nuxt uses port **3000** by default in development mode.