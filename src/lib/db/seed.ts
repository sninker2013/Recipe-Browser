import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg"
import { categoriesTable, recipesTable, ingredientsTable, recipeCategoriesTable } from './schema';
import { categoryData, recipeData, ingredientData } from './seedData';

// Seed file made with help from: https://www.youtube.com/watch?v=n9rtLhMN3cc

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL
})

const db = drizzle(pool)

async function seed() {
    console.log("seeding started!");
    await db.delete(recipeCategoriesTable);
    await db.delete(categoriesTable);
    await db.delete(ingredientsTable);
    await db.delete(recipesTable);

    await db.insert(categoriesTable).values(categoryData);;
    await db.insert(recipesTable).values(recipeData).returning();
    await db.insert(ingredientsTable).values(ingredientData);;

    console.log("Seeding complete!")
}

seed()