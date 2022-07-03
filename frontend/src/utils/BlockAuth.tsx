import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

function BlockAuth({children}: {children: JSX.Element}): JSX.Element{
    const context = useContext(AuthContext);
    if(context?.client.authenticated){
        return <Navigate to={"/home"}/>
    }
    return children;
}

export default BlockAuth;