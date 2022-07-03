import {useState} from "react";
import LoginCredentials from "../../model/LoginCredentials";
import Spinner from "./Spinner";
import {useCookies} from "react-cookie";

function LoginForm(): JSX.Element{

    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies();

    async function requestLogin(): Promise<void>{
        let JWT: string;
        if(credentials.username.length > 2 && credentials.username.length > 2){
            setAnimationPlaying(true);

            fetch("http://localhost:8080/authenticate", {
               method: "POST",
               headers:{
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(credentials)
            }).then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(res => {
                console.log(res)
                //TODO: Save JWT as cookie and set context user etc.
                JWT = res.jwt;
                setCookie("test", "test", {
                    path: "/"
                });
            })
        }

        //get jwt token from input
        //save in cookies
        //set context to authenticated

        setTimeout(() => {
            setAnimationPlaying(false);
        }, 3000);
    }

    return(
        <>
            {
                animationPlaying
                ? <div className="flex flex-row items-center justify-center mt-8">
                   <Spinner />
                </div>
                :
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-white">Username</h1>
                    <input type="text" className="rounded-full p-2 outline-none" onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    <h1 className="text-white">Password</h1>
                    <input type="password" className="rounded-full p-2 outline-none" onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    <button className="bg-white rounded-full p-2 mt-2 px-4" onClick={requestLogin}>Sign in</button>
                </div>
            }
        </>
    );
}

export default LoginForm;