import React from 'react';
import './vars.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Board } from './board/board';
import { Boards } from './boards/boards';
import { User } from './user/user';

export default function App() {
  return (
    <BrowserRouter>
    <div className="body bg-dark text-light">
        <header>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Startup</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="user">📬 UserName</NavLink>
            </nav>
        </header>

        
        <Routes>
            <Route path='/' element={<Boards />} exact />
            <Route path='/board' element={<Board />} />
            <Route path='/user' element={<User />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <span className="text-reset">Alec Davis</span>
            <br />
            <a href="https://github.com/Ki11erRabbit/startup">GitHub</a>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}