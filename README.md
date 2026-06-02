# Recipe-Browser

An attempt at learning nextjs through a recipe browser app

## Plan for how I will approach this

I will be following the recommended build order from the recipe-manager-project-spec.md. That being: starting the foundation first, by setting up next.js, configuring the database (more on that later), and building basic navigation and layout on the frontend. Then, building the public features; implementing recipe and categories and their detail pages. Next, doing the authentication using NextAuth.js or BetterAuth. Finally, doing the creation features for users to create a website of their own.

## Features

### Public Recipe Browsing

- Browse recipe by category /recipes/[id]
- Recipe details page for each recipe, these include the recipes ingredients, directions, prep/cook time, servings, author, description, and category tags

### Category Management

- Categories displayed in a grid

- Display all recipes in a category with /categories/[slug]

### Recipe Creation

- Authenticated recipe creation page
- Displays created recipes in a user-specific page with /recipes/user/[author]

### Authentication

- Sign in page
- Sign up page
- BetterAuth-based route auth integration
- Recipe creation and /dashboard protected by auth
- Redirects to the sign in page on unauthenticated entry

## Technology Choices

### Database ORM

I have decided to try to learn Drizzle for the DB ORM, despite having some experience with Prisma, this is because from what I have seen Drizzle is better for people with a backend or SQL background, which despite not working with SQL very recently I feel fairly confident I can figure it out. It also has instant inference when it comes to type updates, instead of the whole generation step with Prisma.

### Auth Options

It was recommended to use BetterAuth for this project if I am not used to auth integration. I did not do most of the auth integration in previous projects so this is the better choice for me to learn.

## Full Technology Stack

### Frontend

Next.js

React 19

Typescript

### Styling

Tailwind CSS

### Database / ORM

drizzle ORM

PostgreSQL

### Authentication

Better Auth

### Validation

zod

### Runtime

Node.js

eslint

tsx

dotenv
