import Link from "next/link";

import { Category } from "@/lib/schema";
import { getRecipesByCategoryId } from "@/lib/services/recipeService";

export default async function CategoryCard({category}: {category: Category}) {
    const recipesInCategory = await getRecipesByCategoryId(category.id);
    return (
        <Link href={`/categories/${category.slug}`} className="hover:">
            <section className="p-4 m-5 bg-gray-200 rounded-xl hover:shadow-md hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-around">
                <h3 className="font-bold col-span-3 text-center">{category.name}</h3>
                <p className="text-center">{recipesInCategory.length} recipes</p>
            </section>
        </Link>
    )
}