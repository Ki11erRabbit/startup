import React from 'react';
import { useParams } from 'react-router-dom';
import '../vars.css';
import '../app.css';
import './board.css';

const ENABLE_RANDOM_TEXT = true;


export function Board() {
    const { boardName } = useParams();

    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        fetch(`/api/board/${boardName}`)
        .then((response) => response.json())
        .then((posts) => {
            setPosts(posts)
        })
    }, [boardName]);
    const [replyingTo, setReplyingTo] = React.useState(null);
    const textRef = React.useRef();
    const fileRef = React.useRef();
    const replyTextRef = React.useRef();
    const replyFileRef = React.useRef();


    async function createPost(userName, imageBase64, postText) {
        const newPost = { userName, imageBase64, postText, replies: [] };
        await fetch(`/api/board/${boardName}`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        window.location.href = `/board/${encodeURIComponent(boardName)}`;
    }

    async function createReply(postIndex, userName, postText, imageBase64) {
        const newPost = { userName, imageBase64, postText, replies: [], replyId: postIndex };
        await fetch(`/api/board/${boardName}`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        window.location.href = `/board/${encodeURIComponent(boardName)}`;
    }

    const compressImage = (file, maxWidth = 800, quality = 0.2) => {
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const scale = Math.min(1, maxWidth / img.width);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };
            img.src = url;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("userName") || "Anonymous";
        const image = fileRef.current.files[0];

        if (image) {
            const base64 = await compressImage(image);
            createPost(userName, base64.split(",")[1], textRef.current.value);
        } else {
            createPost(userName, "", textRef.current.value);
        }

        textRef.current.value = "";
        fileRef.current.value = "";
    };

    const handleRandomSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("userName") || "Anonymous";

        const res = await fetch('https://quote.cs260.click');
        const randomText = await res.json();

        const image = fileRef.current.files[0];

        if (image) {
            const base64 = await compressImage(image);
            createPost(userName, base64.split(",")[1], randomText.quote);
        } else {
            createPost(userName, "", randomText);
        }

        fileRef.current.value = "";
    };

    const handleReplySubmit = async (index) => {
        const userName = localStorage.getItem("userName") || "Anonymous";
        const image = replyFileRef.current.files[0];

        if (image) {
            const base64 = await compressImage(image);
            createReply(index, userName, replyTextRef.current.value, base64.split(",")[1]);
        } else {
            createReply(index, userName, replyTextRef.current.value, "");
        }

        replyTextRef.current.value = "";
        replyFileRef.current.value = "";
        setReplyingTo(null);
    };

    return (
        <main>
            <h2 className="text-2xl font-semibold text-center my-4">{boardName}</h2>
            <div className="submittion max-w-2xl mx-auto px-4">
                <form className="post shadow-md rounded-lg p-6 mb-6 space-y-4">
                    <input ref={textRef} type="text" placeholder="Write something..." className="w-full px-4 py-2 border rounded-lg"/>
                    <div className="flex gap-4">
                        <input ref={fileRef} type="file" accept="image/*" className="flex-1"/>
                        <button type="button" className="px-6 py-2 rounded-lg font-medium transition-colors" onClick={handleSubmit}>
                            Submit
                        </button>
                        {ENABLE_RANDOM_TEXT && (
                            <button type="button" className="px-6 py-2 rounded-lg font-medium transition-colors" onClick={handleRandomSubmit}>
                                Submit with random text
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="max-w-2xl mx-auto px-4">
                <menu className="space-y-4 list-none p-0">
                    {posts.map((post, index) => (
                        <li key={index} className="post shadow-md rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                {post.imageBase64 ? (
                                    <img
                                        src={`data:image/jpeg;base64,${post.imageBase64}`}
                                        alt="Post"
                                        className="max-w-xs max-h-48 rounded-lg object-contain flex-shrink-0"
                                    />
                                ) : (
                                    <svg width="60" height="60" viewBox="0 0 200 200" className="flex-shrink-0">
                                        <defs>
                                            <mask id={`cutout-${index}`}>
                                                <rect width="200" height="200" fill="white"/>
                                                <circle cx="130" cy="80" r="40" fill="black"/>
                                            </mask>
                                        </defs>
                                        <circle cx="100" cy="100" r="80" id={`circle-${index}`} mask={`url(#cutout-${index})`}/>
                                    </svg>
                                )}
                                <div className="flex-1">
                                    <span className="font-semibold text-lg">{post.userName}</span>
                                    <p className="mt-2">{post.postText}</p>
                                    <button
                                        type="button"
                                        className="mt-2 text-sm px-3 py-1 rounded-lg font-medium transition-colors"
                                        onClick={() => setReplyingTo(replyingTo === index ? null : index)}
                                    >
                                        {replyingTo === index ? "Cancel" : "Reply"}
                                    </button>
                                </div>
                            </div>

                            {replyingTo === index && (
                                <div className="mt-4 ml-16 space-y-2">
                                    <input ref={replyTextRef} type="text" placeholder="Write a reply..." className="w-full px-4 py-2 border rounded-lg"/>
                                    <div className="flex gap-2">
                                        <input ref={replyFileRef} type="file" accept="image/*" className="flex-1"/>
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg font-medium transition-colors"
                                            onClick={() => handleReplySubmit(index)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}

                            {post.replies.length > 0 && (
                                <menu className="reply-border ml-16 space-y-4 list-none p-0 border-l-2 pl-4 mt-4">
                                    {post.replies.map((reply, replyIndex) => (
                                        <li key={replyIndex} className="post rounded-lg p-4">
                                            <div className="flex items-start gap-4">
                                                {reply.imageBase64 ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${reply.imageBase64}`}
                                                        alt="Reply"
                                                        className="max-w-xs max-h-32 rounded-lg object-contain flex-shrink-0"
                                                    />
                                                ) : (
                                                    <svg width="50" height="50" viewBox="0 0 200 200" className="flex-shrink-0">
                                                        <defs>
                                                            <mask id={`cutout-${index}-${replyIndex}`}>
                                                                <rect width="200" height="200" fill="white"/>
                                                                <circle cx="130" cy="80" r="40" fill="black"/>
                                                            </mask>
                                                        </defs>
                                                        <circle cx="100" cy="100" r="80" mask={`url(#cutout-${index}-${replyIndex})`}/>
                                                    </svg>
                                                )}
                                                <div className="flex-1">
                                                    <span className="font-semibold">{reply.userName}</span>
                                                    <p className="mt-2 text-sm">{reply.postText}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </menu>
                            )}
                        </li>
                    ))}
                </menu>
            </div>
        </main>
    );
}