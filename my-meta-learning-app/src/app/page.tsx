"use client";

import { useState, FormEvent } from 'react';

export default function MainPage() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
            });

            if (!res.ok) {
                if (res.status === 404) {
                    setResponse('404');
                } else {
                    setResponse(`Error: ${res.status}`);
                }
                return;
            }

            const data = await res.json();
            setResponse(data.result);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setResponse(`Error: ${errorMessage}`);
        }
    };

    return (
        <div>
            <h1>Meta Learning Map Builder</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Describe your project..."
                    style={{ color: 'black' }}
                />
                <button type="submit">Generate Map</button>
            </form>
            {response && (
                <div>
                    <h2>Generated Map:</h2>
                    <p style={{ color: 'white' }}>{response}</p>
                </div>
            )}
            {response === '404' && (
                <div>
                    <h2>Error:</h2>
                    <p style={{ color: 'white' }}>The requested resource was not found (404).</p>
                </div>
            )}
        </div>
    );
}