import { Category } from "@/lib/db/schema";
import { getAllCategories } from "@/lib/services/categoryService";
import CategoryItem from "./CategoryCard";

export default async function Categories() {
    const categoryItems: React.JSX.Element[] = []
    const categories: Category[] = await getAllCategories(); 

    categories.forEach((category: Category) => {
        categoryItems.push(<CategoryItem
        category={category}
        key={`${category.id}`}/>)
    })
    return(<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categoryItems}
    </div>
    )
}