import ChatRow from "./ChatRow";

function ChatWindow(): JSX.Element {
    return (
        <div className="w-screen sm:w-2/3 chat-window">
            <h1 className="text-center">First Chat Room</h1>
            <div className="bg-green-200 rounded border-2 border-black h-4/5">
                <ChatRow data={{sender: "Dave", body: "Hello!", me: false}}/>
                <ChatRow data={{sender: "Filip", body: "Hi!", me: true}}/>
            </div>
            <div className="flex flex-row items-center justify-between mr-2 ml-2">
                <input type="text" className="outline-none border-2 w-full font-light"/>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatWindow;