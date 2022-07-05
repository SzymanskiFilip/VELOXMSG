import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {useCookies} from "react-cookie";;

function Home(): JSX.Element{
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies();
    function sidebarHandler(){
        setSidebar(!sidebar);
        console.log(sidebar);
    }

    let socket = new SockJS("http://localhost:8080/stomp");
    let client = Stomp.over(socket);

    //handle connection
    client.connect({"JWT_TOKEN": cookies.JWT_TOKEN}, frame => {
        //subscribe to the /topi/messages endpoint (all messages here are beeing received)
        client.subscribe("/topic/messages", payload => {
            console.log(payload.body)
        })
    });

    function sendMessage(){
        client.send("/app/chat", {}, JSON.stringify("TEST MSG"));
    }

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
                <h1 className="text-white m-2">Contacts</h1>
                <h1 className="text-white m-2">Active Users</h1>
                <h1 className="text-white m-2">Random Chat</h1>
            </div>

            <button onClick={() => sendMessage()}>SEND MESSAGE</button>
        </div>
    );
}

export default Home;