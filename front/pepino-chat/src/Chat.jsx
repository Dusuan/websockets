import { useLocation } from "react-router-dom"

function Chat() {
    const location = useLocation();
    const username = location.state.username;

    return (
        <div className="m-1">
            <h1 className="text-4xl"> Usuario: {username}</h1>
            
        </div>
    )
}

export default Chat