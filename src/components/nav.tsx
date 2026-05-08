import Link from "next/link"

export function Nav() {
    return (
        <nav className="flex justify-evenly">
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipes</Link>
        </nav>
    )
}