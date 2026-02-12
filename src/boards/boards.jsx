import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import '../vars.css';
import '../app.css';
import './boards.css';

export function Boards() {
  return (
    <main>
            <div className="board">
                <h2>Boards</h2>
                <div>
                    <menu className="board-items">
                        <li><NavLink to="board">Anime</NavLink></li>
                        <li><NavLink to="board">Technology</NavLink></li>
                        <li><NavLink to="board">Video Games</NavLink></li>
                        <li><NavLink to="board">Culture</NavLink></li>
                        <li><NavLink to="board">Health & Fitness</NavLink></li>
                    </menu>
                </div>
            </div>
            <svg width="200" height="200" viewBox="0 0 200 200" id="logo">
                <defs>
                    <mask id="cutout">
                    <rect width="200" height="200" fill="white"/>
                    <circle cx="130" cy="80" r="40" fill="black"/>
                    </mask>
                </defs>
                <circle cx="100" cy="100" r="80" id="circle" mask="url(#cutout)"/>
            </svg>
        </main>
  );
}