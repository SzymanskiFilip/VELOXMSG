import ChatMessageData from "../../model/ChatMessageData";

function ChatRow(data: ChatMessageData) : JSX.Element{

    return (
        <div className="ml-4 mr-4 mb-4">
            <div className={data.me ? "flex flex-row justify-end" : "flex flex-row"}>
                <p>{data.message}</p>
            </div>
            <div className={data.me ? "flex flex-row justify-end" : "flex flex-row"}>
                <p className="bg-blue-200 message font-light">{data.sender_name}</p>
            </div>
        </div>
    )
}

export default ChatRow;