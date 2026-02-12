import React from 'react';

import '../vars.css';
import '../app.css';
import './board.css';

export function Board() {
  return (
    <main>
            <div className="submittion max-w-2xl mx-auto px-4">
                <form method="post" className="post shadow-md rounded-lg p-6 mb-6 space-y-4">
                    <input type="text" placeholder="Write something..." className="w-full px-4 py-2 border rounded-lg"/>
                    <div className="flex gap-4">
                        <input type="file" accept="image/*" className="flex-1"/>
                        <button type="submit" className="px-6 py-2 rounded-lg font-medium transition-colors">Submit</button>
                    </div>
                </form>
            </div>
            <div className="max-w-2xl mx-auto px-4">
                <menu className="space-y-4 list-none p-0">
                    <li className="post shadow-md rounded-lg p-6">
                        <div>
                            <div className="flex items-start gap-4 mb-4">
                                <svg width="60" height="60" viewBox="0 0 200 200" className="flex-shrink-0">
                                    <defs>
                                        <mask id="cutout">
                                        <rect width="200" height="200" fill="white"/>
                                        <circle cx="130" cy="80" r="40" fill="black"/>
                                        </mask>
                                    </defs>
                                    <circle cx="100" cy="100" r="80" id="circle" mask="url(#cutout)"/>
                                </svg>
                                <div className="flex-1">
                                    <span className="font-semibold text-lg">UserName</span>
                                    <p className="mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                            <menu className="reply-border ml-16 space-y-4 list-none p-0 border-l-2 pl-4">
                                <li className="post rounded-lg p-4">
                                    <div>
                                        <div className="flex items-start gap-4">
                                            <svg width="50" height="50" viewBox="0 0 200 200" className="flex-shrink-0">
                                                <defs>
                                                    <mask id="cutout2">
                                                    <rect width="200" height="200" fill="white"/>
                                                    <circle cx="130" cy="80" r="40" fill="black"/>
                                                    </mask>
                                                </defs>
                                                <circle cx="100" cy="100" r="80" id="circle" mask="url(#cutout2)"/>
                                            </svg>
                                            <div className="flex-1">
                                                <span className="font-semibold">Other UserName</span>
                                                <p className="mt-2 text-sm">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="post rounded-lg p-4">
                                    <div>
                                        <div className="flex items-start gap-4">
                                            <svg width="50" height="50" viewBox="0 0 200 200" className="flex-shrink-0">
                                                <defs>
                                                    <mask id="cutout3">
                                                    <rect width="200" height="200" fill="white"/>
                                                    <circle cx="130" cy="80" r="40" fill="black"/>
                                                    </mask>
                                                </defs>
                                                <circle cx="100" cy="100" r="80" id="circle" mask="url(#cutout3)"/>
                                            </svg>
                                            <div className="flex-1">
                                                <span className="font-semibold">Other UserName</span>
                                                <p className="mt-2 text-sm">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </menu>
                        </div>
                    </li>
                    <li className="post shadow-md rounded-lg p-6">
                        <div>
                            <div className="flex items-start gap-4 mb-4">
                                <svg width="60" height="60" viewBox="0 0 200 200" className="flex-shrink-0">
                                    <defs>
                                        <mask id="cutout4">
                                        <rect width="200" height="200" fill="white"/>
                                        <circle cx="130" cy="80" r="40" fill="black"/>
                                        </mask>
                                    </defs>
                                    <circle cx="100" cy="100" r="80" id="circle" mask="url(#cutout4)"/>
                                </svg>
                                <div className="flex-1">
                                    <span className="font-semibold text-lg">Another UserName</span>
                                    <p className="mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                            <menu className="reply-border ml-16 space-y-4 list-none p-0 border-l-2 pl-4">
                                
                            </menu>
                        </div>
                    </li>
                </menu>
            </div>
        </main>
  );
}