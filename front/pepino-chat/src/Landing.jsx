import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Landing() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")

    const usernameHandler = () => {
        if(username.trim() === ""){
            alert("Escribe un nombre de usuario valido")
            return
        }
        navigate("/chat", { state: { username }})
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl font-bold text-center text-white my-4">Pepino Chat</h1>
            <div className="flex justify-center">
                <textarea placeholder="Escribe tu nombre de usuario" 
                className="bg-white text-4xl overflow-hidden" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex justify-center my-4">
                <button className="text-3xl rounded-xl bg-green-500 px-10 py-4 w-fit h-fit "
                onClick={usernameHandler}
                >
                    Entrar al chat
                </button>
            </div>
            <img src="/joeswag.png" alt="joeswag" className="w-40 h-40"/>
        </div>
    )
}

export default Landing