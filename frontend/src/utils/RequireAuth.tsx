import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function RequireAuth({children}: {children: JSX.Element}): JSX.Element{
    const context = useContext(AuthContext);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        console.log(cookies.JWT_TOKEN)
        if(cookies.JWT_TOKEN !== undefined){
            fetch("http://localhost:8080/check", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: cookies.JWT_TOKEN
            })
                .then(res => {
                    if(res.status === 200){
                        context?.setClient({authenticated: true});
                    }
                })
        }
    }, []);

    if(context?.client.authenticated){
        return children;
    }

    return(
        <Navigate to="/"/>
    )
}

export default RequireAuth;