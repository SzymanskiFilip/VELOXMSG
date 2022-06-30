import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

function RequireAuth({children}: {children: JSX.Element}): JSX.Element{
    const context = useContext(AuthContext);

    if(context?.authenticated){
        return children;
    }

    return(
        <Navigate to="/"/>
    )
}

export default RequireAuth;