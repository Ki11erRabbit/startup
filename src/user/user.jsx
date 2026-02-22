import React from 'react';
import '../vars.css';
import '../app.css';
import './user.css';

export function User() {
    const userNameRef = React.useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value.trim();
        if (!userName) return;
        localStorage.setItem("userName", userName);
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
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    />
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
                            onClick={handleLogin}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}