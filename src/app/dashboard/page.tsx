'use client'

import { authClient } from "@/lib/utils/auth-client"

export default function dashboardPage() {
    const {data: session } = authClient.useSession();

    return(
        <section className="m-5 text-center">
            <h2 className="p-3">Dashboard</h2>
            <p className="p-2">Welcome to your dashboard {session?.user.username}</p>
            <p className="p-2">The Email linked to your account is: {session?.user.email}</p>
        </section>
    )
}