import React from 'react';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
        <header>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Startup</h1>
            <nav>
                <a href="index.html">Home</a>
                <a href="user.html">📬 UserName</a>
            </nav>
        </header>

        <main>App components go here</main>

        <footer>
            <span class="text-reset">Alec Davis</span>
            <br />
            <a href="https://github.com/Ki11erRabbit/startup">GitHub</a>
        </footer>
    </div>
  );
}