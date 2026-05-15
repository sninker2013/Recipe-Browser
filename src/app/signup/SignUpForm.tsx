'use client'

import { useState } from "react";
import { authClient } from "@/lib/utils/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm() {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Shows an error when the username is shorter than 3 characters
        if (username.length < 3) {
            setError("Username must be at least 3 characters")
        }

        // Checks if the username is available
        const { data: response, error: userError } = await authClient.isUsernameAvailable({
            username: username,
        });
        if (!response?.available) {
            setError("Username is already taken. Please choose another one.");
            return;
        }

        // Main sign-up logic using better-auth client
        const {} = await authClient.signUp.email({
            email: email,
            password: password,
            name: username,
            username: username
        }, {
            onRequest: () => setLoading(true),
            onSuccess: () => {router.push("/dashboard")},
            onError: (ctx) => {
                const ctxError = ctx.error.message
                if (ctx.error.status === 500) {
                    setError("Could not connect to the database. Make sure Docker is running.");
                    setLoading(false)
                    return;
                }
                if (ctxError.includes("body.email")) {
                    setError("Please enter a valid email address.")
                    setLoading(false)
                    return;
                } else {
                    setError(ctxError)
                };
                setLoading(false)
            },
        })
    }
    return (<section className="max-w-md mx-auto mt-10 p-6 border rounded">
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-6 text-center">Create an Account</h3>
            <div className="mb-4">
                <label htmlFor="username" className="block text-left mb-2 font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                ></input>
            </div>
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
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <p className="pt-3">Already have an account? <Link href="/login" className="text-blue-400 underline">Sign In</Link></p>
    </section>
    )
}