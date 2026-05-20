import Link from "next/link";
//
import { Category } from "@/lib/schema";

/**
 * Component for the small tags at the top of recipes that show what categories a recipe belongs to.
 * @param categories - The categories that are belong to the recipe.
 */
export default function CategoryTags({categories}: {categories: Category[]}) {
    const categoryTags: React.JSX.Element[] = []

    categories.forEach((category: Category) => {
        categoryTags.push(
        <span key={`${category.id}`}>
            <Link href={`/categories/${category.slug}`} 
            className="inline-flex self-start bg-orange-400 text-white px-2 py-1 items-center gap-1 rounded">
                <svg width="8" height="8" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" fill="#FFFFFF"/>
                </svg>
                <span className="text-sm">{category.name}</span>
            </Link>
        </span>)
    })

    return(
        <div className="flex flex-wrap gap-2 justify-center w-full">
            {categoryTags}
        </div>
    )
}