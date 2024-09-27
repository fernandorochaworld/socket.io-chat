import { useState } from "react";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = event => setMessage(event.target.value);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                message
            }]);
            setMessage('');
        }
    };


    return (
        <main className="container">
            <ul className="list">
                {messages.map(m => (
                    <li className="list__item list__item--mine" key={m.id}>
                        <span className="message message--mine">
                            {m.message}
                        </span>
                    </li>
                ))}
                <li className="list__item list__item--mine">
                    <span className="message message--mine">
                        Hello
                    </span>
                </li>
                <li className="list__item list__item--other">
                    <span className="message message--other">
                        Hi
                    </span>
                </li>
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