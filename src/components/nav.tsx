import Link from "next/link"

export function Nav() {
    return (
        <nav className="flex justify-evenly">
            <div className="hover:text-blue-400 hover:underline"><Link href="/">Home</Link></div>
            <div className="hover:text-blue-400 hover:underline"><Link href="/recipes">Recipes</Link></div>
            <div className="hover:text-blue-400 hover:underline"><Link href="/categories">Categories</Link></div>
        </nav>
    )
}