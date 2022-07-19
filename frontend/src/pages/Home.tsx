import {MouseEventHandler, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {useCookies} from "react-cookie";
import ChatInterface from "../model/ChatInterface";
import chatInterface from "../model/ChatInterface";
import MessageInterface from "../model/MessageInterface";
import ChatRow from "../components/chat/ChatRow";
import ChatWindow from "../components/chat/ChatWindow";
import ChatMessageData from "../model/ChatMessageData";

function Home(): JSX.Element{
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies();
    const [chats, setChats] = useState<chatInterface[]>([]);
    const [chat, setChat] = useState<number>();
    const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([]);
    let socket = new SockJS("http://localhost:8080/stomp");
    let client = Stomp.over(socket);

    useEffect(() => {
        //Getting chat list
        fetch("http://localhost:8080/get-chats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.JWT_TOKEN
            }
        })
            .then(res => res.json())
            .then(res => {
                setChats(res)
            })
    },[]);

    useEffect(() => {
        setChat(cookies.last_chat_open);
    },[]);


    useEffect(() => {
        //handle connection
        client.connect({"JWT_TOKEN": cookies.JWT_TOKEN}, frame => {
            //subscribe to the /topi/messages endpoint (all messages here are beeing received)
            client.subscribe("/topic/1/1", payload => {

            })
        });
    }, []);

    function chatHandler(id: number){
        setCookies("last_chat_open", id);
        setChat(id);
        console.log("getting messages from: " + id)

        fetch(`http://localhost:8080/chat/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.JWT_TOKEN}`
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                setChatMessages(res)
       });

    }

    function sendMessageToCurrentChat(){

        const message = {
            sender_id: 1,
            message: "hello testing the app!"
        }

        client.send(`/topic/1/1`, {}, JSON.stringify(message));
    }

    return(
        <div>
            <nav className="bg-black text-white text-center font-bold flex flex-row items-center justify-between pt-4 pb-4">
                <div className="w-6 ml-4 hover:cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                    <div className="bg-white w-6 mb-1 height"></div>
                    <div className="bg-white w-6 mb-1 height"></div>
                    <div className="bg-white w-6 mb-1 height"></div>
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2">VELOXMSG</h1>
            </nav>

            <div className={sidebar ? "slide slide-pos " : "slide"}>
                <h1 className="text-white m-2">Chats</h1>
                <div className="sidebar-divider height"></div>
                    <div className="h-1/3">
                        {
                            chats.map(chat => {
                                return <h1 onClick={() => chatHandler(chat.id)} className="text-white m-2 hover:cursor-pointer unselectable" key={chat.id}>{chat.name}</h1>
                            })
                        }
                    </div>
                <h1 className="text-white m-2">Active Users</h1>
                <div className="sidebar-divider height"></div>
                <h1 className="text-white m-2">Random Chat</h1>
                <div className="sidebar-divider height"></div>
                <h1 className="text-white m-2">Contacts</h1>
                <div className="sidebar-divider height"></div>
            </div>

            <div className="w-screen flex flex-col items-center justify-center mt-8">
                {
                    chat
                    ?
                    <ChatWindow messages={chatMessages} sendFunction={sendMessageToCurrentChat}/>
                    :
                    <></>
                }
            </div>


        </div>
    );
}

export default Home;