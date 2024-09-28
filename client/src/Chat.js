import { useEffect, useState } from "react";

import io from "socket.io-client";
import { v4 as uuid } from 'uuid';

const myId = uuid();
const socket = io('http://localhost:8080');

socket.on('connect', () => console.log('[IO]A new connection has been established'));
socket.on('message', (message) => console.log('[IO]New message received: ', message));
socket.on('disconnect', () => console.log('[IO]Connection closed'));

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleNewMessage = newMessage => setMessages([...messages, newMessage]);
        socket.on('chat.message', handleNewMessage);
        return () => socket.off('chat.message', handleNewMessage);
    }, [messages]);

    const handleInputChange = event => setMessage(event.target.value);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            // setMessages([...messages, {
            //     id: messages.length + 1,
            //     message
            // }]);
            socket.emit('chat.message', {
                id: myId,
                message
            });
            setMessage('');
        }
    };


    return (
        <main className="container">
            <ul className="list">
                {messages.map((m, index) => (
                    <li className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`} key={index}>
                        <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                            {m.message}
                        </span>
                    </li>
                ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className="form__field"
                    placeholder="Type a new message here..."
                    value={message}
                    onChange={handleInputChange}
                    type="text"
                />
            </form>
        </main>
    );
};

export default Chat;