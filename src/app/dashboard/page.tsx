import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/utils/auth";
import { getRecipesByAuthor } from "@/lib/services/recipeService";

export default async function dashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const recipesLength = (await getRecipesByAuthor(session?.user.username)).length
    return(
        <section className="m-5 text-center">
            <h2 className="p-3">Dashboard</h2>
            <p className="p-2">Welcome to your dashboard: {session?.user.username}</p>
            <p className="p-2">The Email linked to your account is: {session?.user.email}</p>
            <p className="p-2">You have created {recipesLength} {recipesLength === 1 ? "recipe, " : "recipes, "}
                <span>
                    <Link className="text-blue-400 underline" href={`recipes/user/${session?.user.username}`}>View your recipes</Link>
                </span>
            </p>
            <Link className="text-blue-400 underline" href="recipes/new">Create a Recipe</Link>
        </section>
    )
}