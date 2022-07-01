import {useState} from "react";
import LoginCredentials from "../../model/LoginCredentials";
import Spinner from "./Spinner";

function LoginForm(): JSX.Element{

    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false);

    function requestLogin(): void{

        console.log("hello")
        console.log(credentials)
        //if not empty
        setAnimationPlaying(true);
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