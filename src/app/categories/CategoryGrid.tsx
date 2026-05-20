import { Category } from "@/lib/schema";
import { getAllCategories } from "@/lib/services/categoryService";

import CategoryCard from "./CategoryCard";

/**
 * Displays the category cards in a grid
 * @see {@link CategoryCard}
 * @returns 
 */
export default async function Categories() {
    const categoryItems: React.JSX.Element[] = []
    const categories: Category[] = await getAllCategories(); 

    categories.forEach((category: Category) => {
        categoryItems.push(<CategoryCard
        category={category}
        key={`${category.id}`}/>)
    })
    return(<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categoryItems}
    </div>
    )
}