import React from 'react';
import '../vars.css';
import '../app.css';
import './user.css';

export function User() {
    const userNameRef = React.useRef();
    const passwordRef = React.useRef();
    const [loginError, setLoginError] = React.useState("");
    const [signupError, setSignupError] = React.useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        if (!userName) return;

        setLoginError("");

        let res = await fetch('/api/login', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: userName, password: password })
        });

        if (!res.ok) {
            if (res.status === 401) {
                setLoginError("Invalid email or password");
            } else {
                setLoginError("Login failed. Please try again.");
            }
            return;
        }

        const body = await res.json();
        console.log(body);

        localStorage.setItem("userName", body.email);
        window.location.href = "/";
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        if (!userName) return;

        setSignupError("");

        let res = await fetch('/api/create', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: userName, password: password })
        });

        if (!res.ok) {
            if (res.status === 409) {
                setSignupError("An account with this email already exists");
            } else {
                setSignupError("Signup failed. Please try again.");
            }
            return;
        }

        const body = await res.json();
        console.log(body);

        localStorage.setItem("userName", body.email);
        window.location.href = "/";
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">User Information</h1>
                <form method="post" className="space-y-4">
                    <input
                        ref={userNameRef}
                        type="text"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                        onChange={() => {
                            setLoginError("");
                            setSignupError("");
                        }}
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                        onChange={() => {
                            setLoginError("");
                            setSignupError("");
                        }}
                    />
                    {loginError && (
                        <div className="text-red-600 text-sm text-center">{loginError}</div>
                    )}
                    {signupError && (
                        <div className="text-red-600 text-sm text-center">{signupError}</div>
                    )}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors font-medium"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors font-medium"
                            onClick={handleSignup}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}