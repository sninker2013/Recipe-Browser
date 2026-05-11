import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg"
import { categoriesTable, recipesTable, ingredientsTable, recipeCategoriesTable, directionsTable } from './schema';

import { categoryData } from './categoryData';
import { recipeData } from './recipeData';
import { ingredientData } from './ingredientData';
import { directionData } from './directionData';

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
    await db.delete(directionsTable);
    await db.delete(recipesTable);
    
    await db.insert(categoriesTable).values(categoryData);
    await db.insert(recipesTable).values(recipeData);
    await db.insert(ingredientsTable).values(ingredientData);
    await db.insert(directionsTable).values(directionData);

    console.log("Seeding complete!")
}

seed()