# Recipe-Browser

An attempt at learning nextjs through a recipe browser app

## Plan for how I will approach this

I will be following the recommended build order from the recipe-manager-project-spec.md. That being: starting the foundation first, by setting up next.js, configuring the database (more on that later), and building basic navigation and layout on the frontend. Then, building the public features; implementing recipe and categories and their detail pages. Next, doing the authentication using NextAuth.js or BetterAuth. Finally, doing the creation features for users to create a website of their own.

## Technology Choices

### Database ORM

I have decided to try to learn Drizzle for the DB ORM, despite having some experience with Prisma, this is because from what I have seen Drizzle is better for people with a backend or SQL background, which despite not working with SQL very recently I feel fairly confident I can figure it out. It also has instant inference when it comes to type updates, instead of the whole generation step with Prisma.

### Auth Options

It was recommended to use BetterAuth for this project if I am not used to auth integration. I did not do most of the auth integration in previous projects so this is the better choice for me to learn.
