import {useContext, useEffect, useState} from "react";
import LoginCredentials from "../../model/LoginCredentials";
import Spinner from "./Spinner";
import {useCookies} from "react-cookie";
import {AuthContext} from "../../context/AuthContext";

function LoginForm(): JSX.Element{

    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies();
    const [error, setError] = useState<string|null>(null);
    const context = useContext(AuthContext);
    let controller: AbortController = new AbortController();
    let signal: AbortSignal = controller.signal;


    async function requestLogin(): Promise<void>{
        let JWT: string;

        setAnimationPlaying(true);

        setTimeout(() => {
            setAnimationPlaying(false);
            controller.abort();
        }, 15000);

        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            signal: signal,
            body: JSON.stringify(credentials)
        }).then(res => {
            if(res.ok){
                return res.json();
            } else if(res.status === 403){
                setAnimationPlaying(false);
                setError("Wrong Username or Password");
            } else {
                setError("An error ocured, please try later");
                throw new Error(res.statusText);
            }
        }).then(res => {
            JWT = res.jwt;
            setCookie("JWT_TOKEN", `${JWT}`, {
                path: "/"
            });
            context?.setClient({authenticated: true});
        })
    }

    return(
        <>
            {
                animationPlaying
                ? <div className="flex flex-col items-center justify-center mt-8">
                   <Spinner />
                   <h1 className="text-white">Logging in, please wait...</h1>
                </div>
                :
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-white">Username</h1>
                    <input type="text" className="rounded-full p-2 outline-none" onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    <h1 className="text-white">Password</h1>
                    <input type="password" className="rounded-full p-2 outline-none" onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    {
                        <h1 className="text-red-600">{error}</h1>
                    }
                    <button className="bg-white rounded-full p-2 mt-2 px-4" onClick={requestLogin}>Sign in</button>
                </div>
            }
        </>
    );
}

export default LoginForm;