# Recipe Manager Web Application - Project Specification

## Project Overview

**Duration:** 4-5 weeks (80-100 hours total)
**Work Schedule:** 4 hours/day, 5 days/week
**Team Size:** Individual work (preparing for future team projects)

This self-directed learning project will build your competency in modern full-stack web development using React 19, Next.js 16+ (App Router), PostgreSQL, and authentication. You'll create a recipe sharing platform where users can browse recipes publicly and create their own recipes after authentication.

**Priority:** Functionality over aesthetics. Focus on clean architecture, proper conventions, and working features rather than visual polish.

---

## Learning Objectives

By completing this project, you will demonstrate competency in:

1. **React 19 Fundamentals**
   - Functional components and JSX
   - State management with `useState` and `useReducer`
   - Side effects with `useEffect`
   - Form handling and validation
   - Dynamic list rendering and keys
   - Conditional rendering

2. **Next.js App Router**
   - File-based routing conventions
   - Server Components vs Client Components
   - Server Actions for data mutations
   - Route handlers for API endpoints
   - Loading and error states

3. **Database & ORM**
   - Schema design with relationships
   - CRUD operations
   - Query optimization basics
   - Migrations
   - One-to-many and many-to-many relationships

4. **Authentication**
   - User registration and login flows
   - Session management
   - Protected routes
   - Authorization patterns

5. **Professional Practices**
   - RESTful API conventions
   - Project structure and organization
   - Naming conventions
   - Environment variable management
   - Basic error handling

---

## Technology Stack

### Required
- **Frontend Framework:** React 19
- **Meta-framework:** Next.js 16+ (App Router)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM or Prisma (research and choose)
- **Authentication:** NextAuth.js (Auth.js v5) or BetterAuth  - Recommended for learning fundamentals

### Supporting Tools
- **Package Manager:** npm or pnpm
- **Version Control:** Git
- **Hosting (optional stretch):** Vercel or similar

---

## Database Schema

### Required Tables:
- users (you figure out what fields)
- recipes (connected to users)
- categories
- recipe_categories (junction table - why do we need this?)
- ingredients (connected to recipes, needs ordering)
- directions (connected to recipes, needs ordering)

### Relationships you need:
- One user can create many recipes
- One recipe has many ingredients
- One recipe has many directions
- Recipes and categories have a many-to-many relationship (think about why)

---

### Naming Conventions

**Files:**
- Components: PascalCase (e.g., `RecipeCard.tsx`)
- Pages: lowercase (e.g., `page.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Server Actions: camelCase with descriptive names (e.g., `createRecipe.ts`)

**Folders:**
- Route folders: lowercase with hyphens (e.g., `recipe-details`)
- Component folders: PascalCase (e.g., `RecipeCard/`)

**Code:**
- React Components: PascalCase
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with `I` prefix for interfaces (optional)

---

## Functional Requirements (MVP)

Complete all of these requirements (completing them in order in NOT required or expected) to achieve a fully functional Recipe Manager application:

### 1. Project Setup & Infrastructure
- Initialize Next.js project with TypeScript
- Configure PostgreSQL database connection
- Set up chosen ORM (Drizzle or Prisma) with database schema
- Create and run database migrations
- Seed database with initial categories (minimum 3-5)
- Configure environment variables correctly
- Application runs without errors

### 2. Public Recipe Browsing (Unauthenticated Users)
- **Home Page**: Landing page with project description and navigation
- **Recipe List Page**:
  - Display all recipes in a list or grid format
  - Show recipe title, description, author name, prep time, and cook time
  - Recipes load from database
- **Recipe Detail Page**:
  - Display complete recipe information
  - Show ingredients list in correct order
  - Show cooking directions/steps in sequential order
  - Display associated categories as badges or tags
  - Show recipe creator's name
  - Display prep time, cook time, and servings
- **Category Pages**:
  - List all available categories
  - Filter/display recipes by selected category
  - Show recipe count per category

### 3. User Authentication
- **User Registration**:
  - Registration form with email and password
  - Passwords must be hashed + salted (bcrypt or similar)
  - Form validation (client and server-side)
  - Check for duplicate emails using validations so users cannot sign up twice
- **User Login**:
  - Login form with email and password
  - Authenticate against database
  - Create user session
  - Display authentication status in navigation
- **User Logout**:
  - Clear user session
  - Redirect appropriately
- **Session Management**:
  - Sessions persist across page reloads
  - Session validation on protected routes

### 4. Protected Routes & Authorization
- Implement route protection middleware
- Redirect unauthenticated users to login page when accessing protected routes
- Display different navigation options based on authentication state
- Only authenticated users can access recipe creation pages
- Only recipe owners can edit their own recipes (if editing is implemented)

### 5. User Dashboard (Authenticated Users Only)
- Display user's name and email
- Show count of user's created recipes
- Provide link to create new recipe
- List user's recipes with links to view/edit

### 6. Recipe Creation (Authenticated Users Only)
- **Create Recipe Form**:
  - Basic recipe information: title, description, prep time, cook time, servings
  - Dynamic ingredient fields:
    - Add ingredient button adds new ingredient input
    - Remove ingredient button removes ingredient input
    - Track ingredient order
  - Dynamic direction/step fields:
    - Add step button adds new step input
    - Remove step button removes step input
    - Auto-numbering or manual step ordering
  - Category selection (checkboxes or multi-select)
  - Form validation (required fields, minimum lengths, etc.)
  - Loading state during submission
- **Server Action for Creation**:
  - Verify user is authenticated
  - Validate all form data on server
  - Create recipe record in database
  - Create associated ingredient records
  - Create associated direction/step records
  - Link selected categories (many-to-many relationship)
  - Handle and display errors appropriately
  - Redirect to created recipe page on success

### 7. Data Relationships & Integrity
- Users → Recipes: One-to-Many (properly linked via foreign key)
- Recipes → Ingredients: One-to-Many (ingredients associated with correct recipe)
- Recipes → Directions: One-to-Many (steps associated with correct recipe)
- Recipes ↔ Categories: Many-to-Many (junction table properly implemented)
- Cascade deletes configured appropriately
- All relationships queryable and functional

### 8. Components & Code Organization
- Reusable components created:
  - RecipeCard (for list views)
  - RecipeList (for displaying multiple recipes)
  - IngredientList (for displaying ingredients)
  - DirectionsList (for displaying steps)
  - CategoryBadge (for displaying category tags)
  - RecipeForm (for creation/editing)
  - Navigation (with auth-aware menu)
- Proper Server Component vs Client Component usage
- Server Actions organized in `/lib/actions/`
- Components organized logically in `/components/`

### 9. Error Handling & User Feedback
- Form validation errors displayed to users
- Server errors caught and displayed appropriately
- Loading states shown during async operations
- Success messages after successful operations
- User-friendly error messages (not technical stack traces)

### 10. Professional Practices
- RESTful routing conventions followed
- Proper naming conventions for files and folders
- Environment variables used for configuration
- `.env.local` not committed to Git
- Regular Git commits with meaningful messages
- TypeScript types used appropriately
- Code is readable and reasonably organized

---

## Stretch Goals (Optional Enhancements)

These features are optional enhancements if you complete the MVP ahead of schedule:

### Level 1: Enhanced Features
1. **Recipe Editing**
   - Edit existing recipes (owner only)
   - Pre-populate form with current data
   - Update recipe and relationships

2. **Recipe Deletion**
   - Delete recipes (owner only)
   - Confirmation modal
   - Cascade delete ingredients and directions

3. **Search Functionality**
   - Search recipes by title or description
   - Basic text search implementation

4. **Recipe Images**
   - Upload recipe images
   - Image preview in forms
   - Display images in recipe views
   - Use cloud storage (Cloudinary, Uploadthing) or public folder

### Level 2: User Experience
5. **User Profile**
   - Profile page showing user's recipes
   - Edit profile information
   - View other users' profiles

6. **Recipe Ratings**
   - Star rating system
   - Average rating display
   - User can rate once per recipe

7. **Comments**
   - Users can comment on recipes
   - Display comments on recipe page
   - Edit/delete own comments

8. **Favorites/Bookmarks**
   - Save favorite recipes
   - View saved recipes page

### Level 3: Advanced Features
9. **Recipe Sharing**
   - Generate shareable links
   - Social media preview metadata (Open Graph)

10. **Responsive Design**
    - Mobile-friendly layouts
    - Touch-friendly interactive elements

11. **Recipe Import**
    - Parse recipe from URL (web scraping)
    - Import from structured data formats

12. **Meal Planning**
    - Add recipes to meal plan
    - Calendar view of planned meals

---

## Technical Requirements & Best Practices

### RESTful Routing Conventions
Follow these URL patterns:

```
GET    /recipes              → List all recipes
GET    /recipes/[id]         → View single recipe
GET    /recipes/new          → Show create form (authenticated)
POST   /recipes              → Create recipe (Server Action)
GET    /recipes/[id]/edit    → Show edit form (authenticated, owner)
PUT    /recipes/[id]         → Update recipe (Server Action)
DELETE /recipes/[id]         → Delete recipe (Server Action)

GET    /categories           → List all categories
GET    /categories/[slug]    → Recipes in category

GET    /dashboard            → User dashboard (authenticated)
GET    /login                → Login page
GET    /signup               → Registration page
POST   /api/auth/*           → NextAuth endpoints
```

### Server Components vs Client Components

**Use Server Components (default) for:**
- Pages that fetch data
- Static content
- Layouts and shells
- Push client components down as far as possible

**Use Client Components ('use client') for:**
- Forms with interactivity
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs
- Dynamic user interactions

### Server Actions
- Use Server Actions for data mutations (create, update, delete)
- Place in `src/lib/actions/` directory
- Always validate user authentication
- Always validate and sanitize input
- Return structured responses with success/error states
- Use revalidatePath or revalidateTag after mutations

### Error Handling
- Use try-catch blocks in Server Actions
- Display user-friendly error messages
- Log errors for debugging (console.error in development)
- Validate form data on both client and server

### Environment Variables
Required variables in `.env.local`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/recipe_manager
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000
```

To generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

Never commit `.env.local` to version control.

---

## MVP Completion Checklist

Use this checklist to track your progress toward completing the minimum viable product:

### Infrastructure & Setup
- [/] Project initialized with Next.js and TypeScript
- [/] Database connected and schema created
- [/] Migrations run successfully
- [/] Categories seeded in database
- [/] Environment variables configured
- [/] Development server runs without errors

### Public Recipe Features
- [/] Home page displays
- [/] Recipe list page shows all recipes from database
- [/] Recipe detail page displays complete recipe information
- [/] Ingredients display in correct order
- [/] Directions display in sequential order
- [/] Categories display on recipe pages
- [/] Category filter/list page works
- [/] Can browse recipes by category
- [/] Recipe creator names display

### Authentication System
- [ ] NextAuth.js (or betterAuth) installed and configured
- [ ] User registration form works
- [ ] Passwords are hashed before storage
- [ ] User login form works
- [ ] Users can logout
- [ ] Session persists across page reloads
- [ ] Navigation shows authentication status
- [ ] Protected routes redirect unauthenticated users

### User Dashboard
- [ ] Dashboard accessible only when authenticated
- [ ] Dashboard displays user name and email
- [ ] Dashboard shows count of user's recipes
- [ ] Link to create new recipe present

### Recipe Creation
- [ ] Create recipe page accessible (authenticated only)
- [ ] Form includes all basic recipe fields
- [ ] Can add ingredient fields dynamically
- [ ] Can remove ingredient fields
- [ ] Can add direction/step fields dynamically
- [ ] Can remove direction/step fields
- [ ] Can select multiple categories
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] Loading state displays during submission
- [ ] Recipe creates successfully with all relationships
- [ ] Ingredients save with correct order
- [ ] Directions save with correct numbering
- [ ] Categories link correctly (many-to-many)
- [ ] Redirects to recipe page after creation
- [ ] Error messages display appropriately
- [ ] Created recipe shows creator's name

### Code Quality & Organization
- [ ] Server Components used for data fetching
- [ ] Client Components used only when needed
- [ ] Server Actions in `/lib/actions/`
- [ ] Components organized logically
- [ ] RESTful routing conventions followed
- [ ] Naming conventions consistent
- [ ] TypeScript types used appropriately
- [ ] Regular Git commits with good messages
- [ ] `.env.local` not committed to repository

### Documentation
- [/] README.md created
- [ ] Setup instructions documented
- [ ] Technology stack listed
- [ ] Features documented
- [ ] Known issues noted

---

## Submission Requirements

### Code Requirements
1. **Functionality**
   - All MVP features working
   - No console errors in normal operation
   - Forms validate properly
   - Database relationships work correctly
   - Authentication flow complete

2. **Code Quality**
   - Follows naming conventions
   - Proper file organization
   - Components are reasonably sized
   - No obvious code duplication
   - Comments for complex logic

3. **Version Control**
   - Regular commits with meaningful messages
   - `.env.local` not committed
   - `.gitignore` properly configured

---

## Learning Resources

### Official Documentation
- [React 19 Docs](https://react.dev)
- [Next.js App Router Docs](https://nextjs.org/docs)
- [NextAuth.js v5 Docs](https://authjs.dev)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Key Concepts to Study
1. **React Server Components** - understand the mental model and when to use them
2. **Server Actions** - how they work, when to use them, and security considerations
3. **Database relationships** - foreign keys, junction tables, cascade deletes
4. **Authentication flow** - sessions, cookies, password hashing
5. **Form handling in React** - controlled inputs, validation, submission
6. **TypeScript basics** - types, interfaces, type safety

### Recommended Video Content
- Next.js App Router tutorials
- NextAuth.js or BetterAuth setup guides
- Database design principles
- React form handling patterns

### When You Get Stuck
1. **Read error messages carefully** - they often tell you exactly what's wrong
2. **Check official documentation first** - most questions are answered there
3. **Use console.log() liberally** - debug by logging data at each step
4. **Search for specific error messages** - Google or Stack Overflow
5. **Simplify your code** - comment out sections to isolate the problem
6. **Ask your instructor** - come with specific questions and what you've tried
7. **Review example code** - look at documentation examples

---

## Tips for Success

1. **Start Simple**: Get one feature fully working before moving to the next
2. **Read Documentation**: The official docs answer most questions better than random tutorials
3. **Test Frequently**: Test each feature immediately after building it
4. **Commit Often**: Commit working code regularly (aim for multiple commits per day)
5. **Ask Questions Early**: Don't waste 2 hours stuck when a 5-minute question would help
6. **Focus on Learning**: The goal is understanding concepts, not just completing tasks
7. **Use TypeScript Properly**: Type checking will catch many errors before runtime
8. **Database First**: Make sure your schema is solid before building features on top
9. **Authentication Second**: Get auth working before recipe creation (hard to retrofit)
10. **Console.log is Your Friend**: When debugging, log data at each step to see what's happening
11. **Read Error Messages**: Most errors tell you exactly what's wrong and where
12. **Keep It Simple**: Avoid over-engineering; simple, working code beats clever, broken code

---

## Common Pitfalls to Avoid

1. **Not understanding Server vs Client Components**
   - Study this thoroughly - it's the most common source of confusion
   - When in doubt, start with Server Components (the default)

2. **Forgetting to handle loading and error states**
   - Always implement loading.tsx and error.tsx files
   - Show users what's happening during async operations

3. **Not validating data on the server**
   - Client validation alone is insufficient and insecure
   - Always validate again in Server Actions

4. **Hardcoding values instead of using environment variables**
   - Database URLs, API keys, secrets must be in .env.local
   - Never commit .env.local to Git

5. **Ignoring database constraints**
   - Use foreign keys, NOT NULL, UNIQUE appropriately
   - Let the database help maintain data integrity

6. **Poor error messages**
   - Users need to understand what went wrong
   - "Error" is not helpful - "Email already exists" is

7. **Not testing authentication states**
   - Test both authenticated and unauthenticated user flows
   - Try to access protected routes without logging in

8. **Over-engineering solutions**
   - Keep solutions simple and straightforward
   - Avoid premature optimization

9.  **Not asking for help**
    - This is a learning project - questions are expected and encouraged
    - Come prepared with what you've tried and specific error messages

---

## Getting Started

### Before You Begin
1. **Read This Document Thoroughly**
   - Understand all functional requirements
   - Review the database schema
   - Note questions for your instructor
   - Read the assessment criteria

2. **Research Your Technology Choices**
   - Review NextAuth.js or BetterAuth documentation (or compare auth options)
   - Choose between Drizzle and Prisma - read their docs
   - Understand the trade-offs of each choice

3. **Set Up Development Environment**
   - Install the most recent LTS version of Node.js
   - Install PostgreSQL
   - Install a code editor (VS Code recommended)
   - Install Git

4. **Create Project Repository**
   - Initialize Git repository
   - Create `.gitignore` file
   - Make initial commit
   - Plan your repository structure

5. **Plan Your Approach**
   - Identify which requirements to tackle first
   - Consider dependencies (e.g., need database before recipes)
   - Set personal goals and timeline
   - Identify potential challenges

### Recommended Build Order

While you can approach this in any order that makes sense to you, here's a logical sequence:

1. **Foundation First**
   - Set up Next.js project
   - Configure database and ORM
   - Create schema and run migrations
   - Seed categories
   - Build basic navigation and layout

2. **Public Features Next**
   - Implement recipe browsing (even with test data)
   - Build recipe detail pages
   - Create category filtering
   - Get comfortable with Server Components

3. **Authentication Third**
   - Set up NextAuth.js (or chosen provider)
   - Build registration and login
   - Implement session management
   - Protect routes

4. **Creation Features Last**
   - Build recipe creation form
   - Implement dynamic fields
   - Create Server Actions
   - Test all relationships

This order minimizes dependencies and allows you to test each layer before moving to the next.

### Getting Help
When you need assistance:
1. Review relevant documentation first
2. Search for your specific error message
3. Try to solve it yourself for 20-30 minutes
4. Then ask your instructor with:
   - What you're trying to accomplish
   - What you've tried
   - Specific error messages
   - Relevant code snippets

### Stay Organized
- Use the MVP completion checklist to track progress
- Commit working code frequently (multiple times per day)
---

## Final Thoughts

This project is designed to be challenging but achievable. You will encounter frustration - that's part of learning. Every developer goes through the same struggles.

**Remember:**
- It's okay to not know everything
- Asking questions shows engagement, not weakness
- Making mistakes is how you learn
- Focus on progress, not perfection

The skills you build here will serve as the foundation for your team projects and future career. Take your time, be thorough, and focus on understanding rather than just completing tasks.

Good luck, and enjoy the journey of building something real!

---

## Appendix: Sample Seed Data

Create sample categories to seed your database:

```javascript
// Example categories
const categories = [
  { name: 'Breakfast', slug: 'breakfast', description: 'Morning meals' },
  { name: 'Lunch', slug: 'lunch', description: 'Midday meals' },
  { name: 'Dinner', slug: 'dinner', description: 'Evening meals' },
  { name: 'Dessert', slug: 'dessert', description: 'Sweet treats' },
  { name: 'Vegetarian', slug: 'vegetarian', description: 'Plant-based recipes' },
  { name: 'Quick & Easy', slug: 'quick-easy', description: 'Under 30 minutes' },
]
```

---

**Document Version:** 1.1
**Last Updated:** May 2026
**Instructor:** Johnathan (ACE Project Space)
