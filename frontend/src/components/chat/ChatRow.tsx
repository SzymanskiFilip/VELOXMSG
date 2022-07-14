import {useState} from "react";

interface ChatRowData {
  data: {
      sender: string;
      body: string;
      me: boolean;
  }
};

function ChatRow({data}: ChatRowData) : JSX.Element{

    return (
        <div className="ml-4 mr-4 mb-4">
            <div className={data.me ? "flex flex-row justify-end" : "flex flex-row"}>
                <p>{data.sender}</p>
            </div>
            <div className={data.me ? "flex flex-row justify-end" : "flex flex-row"}>
                <p className="bg-blue-200 message">{data.body}</p>
            </div>
        </div>
    )
}

export default ChatRow;