# Personal Website - Armin Eslamieh

A personal publishing and portfolio platform where engineering, art, writing, sound, and interactive design live in the same system.

This is not meant to be a conventional portfolio made from a hero section and a grid of project cards. It is a personal space on the internet: a place to publish thoughts without feed logic, present technical work without removing its personality, and experiment with interfaces that feel closer to environments than documents.

<p align="center">
  <img src="public/projects/personal-website/home-hero.jpg" alt="Personal website landing experience displayed on a desktop monitor" width="100%" />
</p>

## Why I built it

Most platforms treat creative work as content to be measured.

They optimize around reach, reactions, retention, and frequency. I wanted a place that did not ask every thought to perform and did not force every project into the same card layout.

The site is built around a different idea:

> A personal website can feel like a room rather than a stage.

Each section has its own purpose and emotional role:

- **About** introduces the person behind the work.
- **Projects** presents engineering and art through an interactive 3D brain.
- **Thoughts** provides a database-backed space for long-form writing and conversation.
- **Contact** offers different communication routes for different kinds of messages.
- **Anonymous chat** creates a quieter path for people who want to speak without beginning with their identity.

## Main experiences

### Landing page

The landing experience establishes the tone before explaining the product.

It combines a dark spatial composition, large areas of negative space, subtle particles, sound, restrained typography, and a wireframe human figure. The goal is to make entering the site feel deliberate rather than immediate.

The opening copy also avoids the usual polished portfolio introduction:

> This is not a portfolio. I just think too much.

The homepage is intended to feel personal first and professional second.

### About

The About section is warmer and more direct than the landing experience.

It combines a portrait, social links, short-form personal writing, and a route into the rest of the website. Rather than beginning with credentials or a technology list, it introduces a person.

<p align="center">
  <img src="public/projects/personal-website/about-page.jpg" alt="About page displayed inside a desktop monitor mockup" width="100%" />
</p>

## A brain of projects

The Projects section is organized around the central visual metaphor of the site: one brain containing both engineering and art.

<p align="center">
  <img src="public/projects/personal-website/projects-brain-intro.jpg" alt="Introduction to the brain-based project explorer" width="100%" />
</p>

The entry screen introduces two conceptual hemispheres:

- **Engineering** represents systems, structure, code, and direct problem solving.
- **Art** represents intuition, expression, film, music, photography, and work that communicates indirectly.

This is not presented as a scientific claim. It is an interface metaphor for the two modes of making that the portfolio is designed to hold together.

### Interactive 3D project explorer

Instead of displaying projects as a conventional grid, the site maps them to interactive nodes inside a 3D brain.

<p align="center">
  <img src="public/projects/personal-website/projects-brain-scene.jpg" alt="Interactive 3D brain scene with a selected engineering project" width="100%" />
</p>

The scene supports:

- drag-to-rotate interaction
- scroll-to-zoom
- selectable project nodes
- separate visual identities for art and engineering
- a connector between the selected brain node and its project card
- project metadata loaded from the database
- an optional sound layer
- responsive presentation across viewport sizes

The 3D experience is built with **Three.js**, **React Three Fiber**, and **Drei** inside the Next.js application.

The main challenge was not rendering a 3D object. It was making the object function as understandable navigation. The interface needed to remain exploratory without becoming vague or difficult to use.

## Database-driven project case studies

Each selected brain node leads to a generated project detail page.

<p align="center">
  <img src="public/projects/personal-website/project-detail-page.jpg" alt="Database-driven project detail page displayed on a desktop monitor" width="100%" />
</p>

Project records support:

- a unique slug
- title
- role
- year
- short description
- long-form Markdown description
- cover image
- technology stack
- project type
- external links

Projects are classified as either `ART` or `ENGINEERING`. The detail page changes its accent colors and background treatment according to that classification.

Long descriptions are rendered with custom Markdown components for headings, paragraphs, lists, links, quotations, emphasis, and images. This allows each project to become a complete case study without requiring a separate hard-coded page.

## Thoughts

The Thoughts section is the writing side of the website.

It is intentionally not described as a traditional blog. The goal is not to maintain a publishing schedule or a content niche. It is a place for stories, unfinished ideas, observations, personal writing, project notes, and overthinking.

### The black-hole concept

The visual identity of Thoughts is built around **M87\***, the first black hole ever imaged.

<p align="center">
  <img src="public/projects/personal-website/thoughts-concept.jpg" alt="Thoughts introduction with a glowing black-hole visual" width="100%" />
</p>

Within the site, the black hole works as a metaphor for:

- the distance between people
- the invisible inner world of another person
- the weight of things left unsaid
- fear created by what cannot be seen
- the pull of an idea that refuses to disappear

The image is not used as an isolated decoration. It reappears as part of the visual language of the website and helps connect writing, atmosphere, and the wider theme of interior thought.

### Stacked-card archive

The Thoughts index avoids a standard grid.

<p align="center">
  <img src="public/projects/personal-website/thoughts-stack.jpg" alt="Scroll-driven stacked-card Thoughts archive" width="100%" />
</p>

Posts are presented as overlapping editorial cards. As the visitor moves through the section, each card becomes part of a visual stack.

The archive can be filtered by four personal modes of writing:

- `STORY`
- `OVERTHINK`
- `PROJECT`
- `VENTING`

These categories describe the state or intention behind a piece rather than a conventional subject taxonomy.

### Thought details and comments

Individual Thought pages combine long-form reading, supporting images, metadata, tags, publication information, and reader comments.

<p align="center">
  <img src="public/projects/personal-website/thought-detail-comments.jpg" alt="Thought detail page with persistent metadata and reader comments" width="100%" />
</p>

The comment system is intentionally simple. There are no likes, rankings, follower counts, or engagement scores. A reader can add a thought beneath another thought.

Thoughts and comments are persisted in PostgreSQL through Prisma.

## Contact

The Contact section is based on the idea that different messages deserve different channels.

<p align="center">
  <img src="public/projects/personal-website/contact-options.jpg" alt="Contact page with email, LinkedIn, and WhatsApp routes" width="100%" />
</p>

The interface offers:

- **Email** for messages that need a paragraph
- **LinkedIn** for work, collaboration, and professional introductions
- **WhatsApp** for faster and more informal conversation

Each contact card explains what the channel is suited for instead of presenting a row of unexplained social icons.

## Anonymous Telegram chat

The quieter contact option is an entry point to an anonymous Telegram conversation.

<p align="center">
  <img src="public/projects/personal-website/anonymous-telegram-chat.jpg" alt="Anonymous Telegram chat section displayed inside a desktop monitor" width="100%" />
</p>

The feature is introduced with the line:

> Talk to me, without telling me who you are.

It exists because identity can create friction. A name, profile, job, history, or social relationship can change what someone feels able to say.

The site links into an anonymous Telegram bot flow and explains the intended contract before the visitor opens it:

- no names
- no expectations
- just words
- messages are read
- replies happen when possible

The feature is treated as a different form of conversation, not as a generic support widget.

## Sound and motion

Sound is part of the experience, especially around the project explorer.

The interface can recommend headphones and expose sound controls without making playback mandatory. Audio is used to support atmosphere, but the core navigation and content remain accessible without it.

Motion is used to communicate:

- entry into a new part of the website
- relationships between stacked cards
- project-node selection
- the connection between the 3D brain and project information
- page and section transitions
- changes in tone between writing and engineering content

**Framer Motion** handles interface and page animation, while the brain scene uses real-time 3D rendering and interaction.

## Design principles

The website is guided by a small set of principles.

### A room, not a stage

The visitor should be allowed to pause, explore, read selectively, and leave without being pushed through a conversion path.

### Personality without sacrificing usability

The site uses unconventional navigation and visual metaphors, but each experiment still needs clear interaction cues, readable layouts, and predictable routes.

### Motion with purpose

Animation should explain hierarchy, direction, selection, or transition. It should not exist only to keep the screen moving.

### Optional atmosphere

Sound and immersive effects can deepen an experience, but they should not block access to the underlying content.

### Content should be maintainable

Projects, Thoughts, and comments are stored as structured data. Adding a new entry should not require rebuilding the entire interface.

### Design decisions shape behavior

Every interface choice communicates an expectation.

A feed says: keep moving.  
A counter says: compare.  
A notification says: return.  
A form says: explain yourself in these fields.

This project aims to communicate something else:

> Take your time. Explore. Read what interests you. Say something when you have something to say.

## Technology

### Application

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

### 3D and interaction

- Three.js
- React Three Fiber
- Drei
- Framer Motion

### Content and data

- PostgreSQL
- Prisma ORM
- Prisma PostgreSQL adapter
- React Markdown

### Interface utilities

- React Icons
- Lineicons React

## Data model

The Prisma schema contains three main content models.

### `Project`

Stores database-generated portfolio case studies.

```prisma
model Project {
  id               Int         @id @default(autoincrement())
  slug             String      @unique
  title            String
  role             String?
  year             Int?
  shortDescription String
  description      String
  coverImage       String
  techStack        String[]
  type             ProjectType
  links            String[]
}
```

### `Thought`

Stores long-form writing, metadata, images, tags, reading time, and associated comments.

```prisma
model Thought {
  id          Int       @id @default(autoincrement())
  title       String
  body        String
  coverImage  String?
  tags        Tags[]
  readMinutes Int       @default(1)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  comments    Comment[]
}
```

### `Comment`

Stores reader responses connected to a Thought.

```prisma
model Comment {
  id        Int      @id @default(autoincrement())
  author    String
  body      String
  createdAt DateTime @default(now())
  thought   Thought  @relation(fields: [thoughtId], references: [id], onDelete: Cascade)
  thoughtId Int
}
```

## Project structure

```text
personal-website/
├── app/
│   ├── about/
│   ├── components/
│   ├── contact/
│   ├── projects/
│   │   ├── [slug]/
│   │   ├── ProjectsClient.tsx
│   │   └── page.tsx
│   ├── thoughts/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
│   ├── models/
│   ├── sounds/
│   └── projects/
│       └── personal-website/
├── next.config.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/armineslamieh/personal-website.git
cd personal-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Runtime connection used by the application
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Direct connection used by Prisma migrations
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Use separate pooled and direct URLs when your PostgreSQL provider requires them.

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Apply the database schema

For local development:

```bash
npx prisma migrate dev
```

For an existing production database:

```bash
npx prisma migrate deploy
```

The project requires `Project` and `Thought` records in the database for its database-backed pages to display content.

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Production notes

Before deploying:

- configure `DATABASE_URL` and `DIRECT_URL`
- run Prisma migrations
- confirm that project and Thought records exist
- include the required files under `public/models` and `public/sounds`
- confirm remote image hosts in `next.config.ts` when database content uses external images
- verify that the anonymous Telegram link points to the intended bot flow
- test sound controls and the 3D scene on touch devices and reduced-performance devices

## Screenshots

<p align="center">
  <img src="public/projects/personal-website/home-hero.jpg" alt="Landing page" width="49%" />
  <img src="public/projects/personal-website/about-page.jpg" alt="About page" width="49%" />
</p>

<p align="center">
  <img src="public/projects/personal-website/projects-brain-intro.jpg" alt="Projects introduction" width="49%" />
  <img src="public/projects/personal-website/projects-brain-scene.jpg" alt="3D project brain" width="49%" />
</p>

<p align="center">
  <img src="public/projects/personal-website/thoughts-concept.jpg" alt="Thoughts concept" width="49%" />
  <img src="public/projects/personal-website/thoughts-stack.jpg" alt="Thoughts stacked cards" width="49%" />
</p>

<p align="center">
  <img src="public/projects/personal-website/thought-detail-comments.jpg" alt="Thought page and comments" width="49%" />
  <img src="public/projects/personal-website/project-detail-page.jpg" alt="Project detail page" width="49%" />
</p>

<p align="center">
  <img src="public/projects/personal-website/contact-options.jpg" alt="Contact methods" width="49%" />
  <img src="public/projects/personal-website/anonymous-telegram-chat.jpg" alt="Anonymous Telegram chat" width="49%" />
</p>

## What I learned

This project required product design, visual direction, copywriting, 3D interaction, motion, sound, backend data modeling, server-rendered routes, Markdown rendering, and database-backed user participation to function as one coherent system.

The main lesson was that expressive design and engineering cannot be separated cleanly.

The brain scene is not a decorative layer added after development. The project data model, category system, navigation, 3D interaction, sound design, and project detail routes all support the same idea.

The Thoughts section follows the same principle. Its black-hole imagery, writing categories, card behavior, page structure, and comments are parts of one concept rather than isolated features.

The site remains an ongoing project because it is intended to change with the person it represents.

## Author

**Armin Eslamieh**

- GitHub: [@armineslamieh](https://github.com/armineslamieh)