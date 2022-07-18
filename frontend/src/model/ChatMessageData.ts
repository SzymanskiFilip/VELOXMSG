interface ChatMessageData{
    id: number;
    room_id: number;
    sender_id: number;
    sender_name: string;
    message: string;
    me: boolean;
};

export default ChatMessageData;