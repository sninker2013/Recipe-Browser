'use client'

import { useState } from "react";
import { authClient } from "../../lib/utils/auth-client";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await authClient.signUp.email({
            email: email,
            password: password,
            name: username
        }, {
            onRequest: () => setLoading(true),
            onSuccess: () => {router.push("/recipes")},
            onError: (ctx) => {
                const ctxError = ctx.error.message
                if (ctxError.includes("body.email")) {
                    setError("Please enter a valid email address.")
                } else {
                    setError(ctxError)
                };
                setLoading(false)
            },
        })
    }
    return (
        <form onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 border rounded">
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
                <label htmlFor="email" className="block text-left mb-2 font-medium">E-mail</label>
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
    )
}