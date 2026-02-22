import React from 'react';

import '../vars.css';
import '../app.css';
import './board.css';

export function Board() {
    
    const [posts, setPosts] = React.useState([]);
    const textRef = React.useRef();
    const fileRef = React.useRef();

    function createPost(userName, imageBase64, postText) {
        const newPost = {
            userName: userName,
            imageBase64: imageBase64,
            postText: postText
        };
        setPosts([...posts, newPost]);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = localStorage.getItem("userName") || "Anonymous";
        let image = fileRef.current.files[0];

        if (image) {
            const base64 = await convertToBase64(image);
            createPost(userName, base64.split(",")[1], textRef.current.value);
        } else {
            createPost(userName, "", textRef.current.value);
        }

        textRef.current.value = "";
        fileRef.current.value = "";
    };

    return (
        <main>
            <div className="submittion max-w-2xl mx-auto px-4">
                <form method="post" className="post shadow-md rounded-lg p-6 mb-6 space-y-4">
                    <input ref={textRef} type="text" placeholder="Write something..." className="w-full px-4 py-2 border rounded-lg"/>
                    <div className="flex gap-4">
                        <input ref={fileRef} type="file" accept="image/*" className="flex-1"/>
                        <button type="submit" className="px-6 py-2 rounded-lg font-medium transition-colors" onClick={handleSubmit}>
                            Submit
                        </button>
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
                                </div>
                            </div>
                        </li>
                    ))}
                </menu>
            </div>
        </main>
    );
}