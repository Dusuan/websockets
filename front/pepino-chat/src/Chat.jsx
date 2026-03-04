import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Chat() {
    const location = useLocation();
    const username = location.state.username;
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connected, setConnected] = useState(false);

    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!username) {
            navigate("/");
            return;
        }

        const socket = io("http://localhost:3001", {
            query: { username }
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        

        return () => {
            socket.disconnect();
        };
    }, [username, navigate]);

    const sendMessage = () => {
        if (input.trim() === "" || !socketRef.current) return;

        socketRef.current.emit("send-message", {
            type: "message",
            text: input.trim(),
            username,
        });

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="m-4">
            <h1 className="text-4xl"> Usuario: {username}</h1>
            <p>{connected ? "Conectado al servidor 👀" : "Desconectado del servidor 🥺"}</p>

            <div style={{
                height: 400,
                overflowY: "auto",
                border: "5px solid #ccc",
                padding: 8,
                marginTop: 8,
                backgroundColor: "#9bd872"
            }}>
                {messages.map((msg, i) => {
                    if (msg.type === "log") {
                        return (
                            <p key={i} style={{ color: "black", fontStyle: "italic" }}>
                                {msg.text}
                            </p>
                        );
                    }

                    return (
                        <p key={i}>
                            <strong>{msg.username}:</strong> {msg.text}
                        </p>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    className="border px-2 py-1 flex-1"
                    placeholder="Escribe un mensaje..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="border px-4 py-1" onClick={sendMessage}>
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Chat;