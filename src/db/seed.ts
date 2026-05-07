import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg"
import { categories as categoriesTable, recipes, ingredients, recipeCategories } from './schema';

import { categoriesData } from './seedData';

// Seed file made with help from: https://www.youtube.com/watch?v=n9rtLhMN3cc

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL
})

const db = drizzle(pool)

async function main() {
    console.log("seeding started!");
    await db.delete(recipeCategories);
    await db.delete(categoriesTable);
    await db.delete(ingredients);
    await db.delete(recipes);

    await db.insert(categoriesTable).values(categoriesData);

    const categories = await db.select().from(categoriesTable)
    console.log("Seeding complete!", categories)
}

main();