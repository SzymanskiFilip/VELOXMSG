import ChatRow from "./ChatRow";
import {useEffect, useRef, useState} from "react";
import ChatMessageData from "../../model/ChatMessageData";
import {useCookies} from "react-cookie";

interface chatWindowRequirement{
    id: number;
};

function ChatWindow(data: chatWindowRequirement): JSX.Element {

    const bottomRef = useRef<null | HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageData[]>([]);
    const [cookies, setCookies] = useCookies();


    useEffect(() => {
        fetch(`http://localhost:8080/chat/${data.id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.JWT_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setMessages(res)
                console.log(messages)
            })
    },[]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    return (
        <div className="w-screen sm:w-2/3 chat-window">
            <h1 className="text-center">First Chat Room</h1>
            <div className="bg-green-200 rounded border-2 border-black h-4/5 overflow-y-scroll">
                {
                    messages.map(m => {
                        return <ChatRow id={m.id} room_id={m.room_id} sender_id={m.sender_id} sender_name={m.sender_name} message={m.message} me={m.me}/>
                    })
                }
                <div ref={bottomRef}></div>
            </div>
            <div className="flex flex-row items-center justify-between mr-2 ml-2">
                <input type="text" className="outline-none border-2 w-full font-light"/>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatWindow;