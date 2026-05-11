import { Category } from "@/lib/db/schema";
import Link from "next/link";
import { getRecipesByCategory } from "@/lib/services/recipeService";

export default async function CategoryCard({category}: {category: Category}) {
    const recipesInCategory = await getRecipesByCategory(category.id);
    return (
        <Link href={`/recipes/${category.slug}`} className="hover:">
            <section className="p-6 m-5 bg-gray-200 rounded-xl hover:shadow-md hover:-translate-y-1 grid grid-cols-3 cursor-pointer h-full">
                <h3 className="font-bold col-span-3 text-center">{category.name}</h3>
                <p>{recipesInCategory.length} recipes</p>
            </section>
        </Link>
    )
}