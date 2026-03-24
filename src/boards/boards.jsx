import React from 'react';
import { NavLink } from 'react-router-dom';
import '../vars.css';
import '../app.css';
import './boards.css';

export function Boards() {
    const [boards, setBoards] = React.useState([]);
    const [newBoard, setNewBoard] = React.useState("");
    React.useEffect(() => {
        fetch('/api/board')
        .then((response) => response.json())
        .then((boards) => {
            setBoards(boards)
        })
    }, []);


    const handleCreate = async () => {
        const name = newBoard.trim();
        if (!name || boards.includes(name)) return;
        const boardPayload = { board: newBoard };
        await fetch('/api/board', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(boardPayload)
        });
    };

    return (
        <main>
            <div className="board">
                <h2>Boards</h2>
                <div>
                    <menu className="board-items">
                        {boards.map((board) => (
                            <li key={board}>
                                <NavLink to={`/board/${encodeURIComponent(board)}`}>{board}</NavLink>
                            </li>
                        ))}
                    </menu>
                </div>
                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        value={newBoard}
                        onChange={(e) => setNewBoard(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                        placeholder="New board name..."
                        className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleCreate}
                        className="px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Create
                    </button>
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