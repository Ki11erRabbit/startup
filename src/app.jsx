import React from 'react';
import './vars.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Board } from './board/board';
import { Boards } from './boards/boards';
import { User } from './user/user';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
  const userName = localStorage.getItem("userName") || "Anonymous";
  const [hasPosts, setHasPosts] = React.useState(() => {
    return false
  });
  useWebSocket();

  React.useEffect(() => {
    if (userName === "Anonymous") return;

    fetch('/api/replies', {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: userName })
    }).then((res) => res.json())
      .then((body) => {
        const replies = body.replies;
        setHasPosts(replies > 0 ? true : false);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Startup</h1>
          <nav>
            <NavLink to="/">Home</NavLink>
            <UserNav userName={userName} hasPosts={hasPosts} />
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Boards />} exact />
          <Route path='/board/:boardName' element={<Board />} />
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

function UserNav({ userName, hasPosts }) {
    async function handleLogout() {
        localStorage.removeItem("userName");
        await fetch('/api/logout', {
            method: "DELETE",
        });

        window.location.href = "/";
    }

  return (
    <div className="user-nav">
      <NavLink to="user">{hasPosts ? "📬" : "📭"} {userName}</NavLink>
      <button
        type="button"
        className="mt-2 text-sm px-3 py-1 rounded-lg font-medium transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}