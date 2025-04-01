import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    if (!session) {
        return <p>You must be signed in to view this page</p>;
    }

    return (
        <div>
            <h1>Welcome, {session.user.email}</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}
