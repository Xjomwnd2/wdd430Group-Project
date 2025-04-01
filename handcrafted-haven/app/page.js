import { signIn } from "next-auth/react";

export default function SignIn() {
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
            <button onClick={() => signIn("credentials", { email: "test@example.com", password: "testpass" })}>
                Sign in with Email/Password
            </button>
        </div>
    );
}
