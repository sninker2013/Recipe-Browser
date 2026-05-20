'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/utils/auth-client";


export function Nav() {
    const router = useRouter();
    const {data: session, isPending} = authClient.useSession();
    if (isPending) {
        return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-500">Loading...</p>
        </div>
        );
    }
    if (session) {
        return(
            <nav className="p-4 flex justify-evenly border-b-3 border-t-3 border-black">
                <div className="hover:text-blue-400 hover:underline"><Link href="/">Home</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/recipes">Recipes</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/categories">Categories</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/dashboard">Dashboard</Link></div>
                <button className="hover:text-blue-400 hover:underline"
                onClick={async () => {
                    await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/");
                            },
                        },
                    });
                }}>Sign Out</button>
            </nav>
        )
    } else {
        return(
            <nav className="p-4 flex justify-evenly border-b-3 border-t-3 border-black">
                <div className="hover:text-blue-400 hover:underline"><Link href="/">Home</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/recipes">Recipes</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/categories">Categories</Link></div>
                <div className="hover:text-blue-400 hover:underline"><Link href="/login">Log In</Link></div>
            </nav>
        )
    }
}