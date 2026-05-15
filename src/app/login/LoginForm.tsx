'use client'

import { authClient } from "@/lib/utils/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {} = await authClient.signIn.email({
            email,
            password,
        }, {
            onRequest: () => setLoading(true),
            onSuccess: () => {router.push("/dashboard")},
            onError: (ctx) => {
                if (ctx.error.status === 500) {
                    setError("Could not connect to the database. Make sure Docker is running.");
                    setLoading(false);
                    return
                }
                setError(ctx.error.message);
                setLoading(false);
            },
        })
    }
    return(<section className="max-w-md mx-auto mt-10 p-6 border rounded">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-6 text-center">Enter your Email and Password</h3>
            <div className="mb-4">
                <label htmlFor="email" className="block text-left mb-2 font-medium">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                ></input>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-left mb-2 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                ></input>
            </div>
            <button type="submit" disabled={loading} className="rounded bg-blue-400 p-3 pl-7 pr-7">
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <p className="pt-3">Don't have an account? <Link href="/signup" className="text-blue-400 underline">Sign Up</Link></p>
    </section>
    )
}