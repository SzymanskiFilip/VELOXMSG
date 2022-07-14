import ChatRow from "./ChatRow";
import {useEffect, useRef} from "react";

function ChatWindow(): JSX.Element {

    const bottomRef = useRef<null | HTMLDivElement>(null);

    const messages = [
        {sender: "Dave", body: "hello", me: false},
        {sender: "Filip", body: "Hi", me: true},
        {sender: "Dave", body: "hello", me: false},
        {sender: "Filip", body: "what's up?", me: true},
        {sender: "Dave", body: "hello", me: false},
        {sender: "Filip", body: "Hi", me: true},
        {sender: "Dave", body: "hello", me: false},
        {sender: "Filip", body: "what's up?", me: true}
    ];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    return (
        <div className="w-screen sm:w-2/3 chat-window">
            <h1 className="text-center">First Chat Room</h1>
            <div className="bg-green-200 rounded border-2 border-black h-4/5 overflow-y-scroll">
                {
                    messages.map(m => {
                        return <ChatRow data={m}/>
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