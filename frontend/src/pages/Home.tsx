import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {useCookies} from "react-cookie";
import ChatInterface from "../model/ChatInterface";
import chatInterface from "../model/ChatInterface";

function Home(): JSX.Element{
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies();
    const [chats, setChats] = useState<chatInterface[]>([]);
    const [messages, setMessages] = useState<string[]>([]);

    let socket = new SockJS("http://localhost:8080/stomp");
    let client = Stomp.over(socket);

    //handle connection
    client.connect({"JWT_TOKEN": cookies.JWT_TOKEN}, frame => {
        //subscribe to the /topi/messages endpoint (all messages here are beeing received)
        client.subscribe("/topic/messages", payload => {
            console.log("payload: ")
            let msg = JSON.parse(payload.body)
            console.log(msg.message)
            //setMessages([...messages, ]);
        })

        client.subscribe("/user/topic/private-messages", payload => {
            console.log("RESPONSE - " + payload.body)
        })
    });

    function sendMessage(){
        client.send("/app/chat", {}, JSON.stringify("hello"));
    }

    function sendPrivate(){
        let data = {
            message: "hi private"
        }
        client.send("/app/private/chat", {}, JSON.stringify(data));
    }

    function sidebarHandler(){
        setSidebar(!sidebar);
        console.log(sidebar);
    }

    useEffect(() => {
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

    return(
        <div>
            <nav className="bg-black text-white text-center font-bold flex flex-row items-center justify-between pt-4 pb-4">
                <div className="w-6 ml-4 hover:cursor-pointer" onClick={sidebarHandler}>
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
                                return <h1 className="text-white m-2" key={chat.id}>{chat.name}</h1>
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

            <button onClick={() => sendMessage()}>SEND MESSAGE</button>
            <br/>
            <button onClick={() => sendPrivate()}>SEND PRIVATE MESSAGE</button>
            {
                messages.map(m => {
                    return <p key={Math.random()}>{m}</p>
                })
            }
        </div>
    );
}

export default Home;