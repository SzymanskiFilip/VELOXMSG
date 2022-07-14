import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {useCookies} from "react-cookie";
import ChatInterface from "../model/ChatInterface";
import chatInterface from "../model/ChatInterface";
import MessageInterface from "../model/MessageInterface";
import ChatRow from "../components/chat/ChatRow";
import ChatWindow from "../components/chat/ChatWindow";

function Home(): JSX.Element{
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies();
    const [chats, setChats] = useState<chatInterface[]>([]);
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    let socket = new SockJS("http://localhost:8080/stomp");
    let client = Stomp.over(socket);


    function sendMessage(){
        client.send("/app/send/333", {}, "Hiii");
    }

    function sendPrivate(){
        let data = {
            message: "hi private"
        }
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

    useEffect(() => {
        //handle connection
        client.connect({"JWT_TOKEN": cookies.JWT_TOKEN}, frame => {
            //subscribe to the /topi/messages endpoint (all messages here are beeing received)
            client.subscribe("/topic/333", payload => {

            })
        });
    }, []);
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

            <div className="w-screen flex flex-col items-center justify-center mt-8">
                <ChatWindow/>
            </div>


        </div>
    );
}

export default Home;