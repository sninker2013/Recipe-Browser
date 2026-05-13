import { Category } from "@/lib/db/schema/schema";
import Link from "next/link";

export default function CategoryTags({categories}: {categories: Category[]}) {
    const categoryTags: React.JSX.Element[] = []

    categories.forEach((category: Category) => {
        categoryTags.push(<CategoryTag category={category} key={`${category.id}`}/>)
    })

    return(
        <div className="flex flex-wrap gap-2 justify-center w-full">
            {categoryTags}
        </div>
    )
}

function CategoryTag({category}: {category: Category}) {
    return(
        <span>
            <Link href={`/categories/${category.slug}`} 
            className="inline-flex self-start bg-orange-500 text-white px-2 py-1 items-center gap-1 rounded">
                <svg width="8" height="8" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" fill="#FFFFFF"/>
                </svg>
                <span className="text-sm">{category.name}</span>
            </Link>
        </span>
    )
}