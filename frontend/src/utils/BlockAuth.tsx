import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function BlockAuth({children}: {children: JSX.Element}, navigationDestination: string){
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    if(context?.authenticated){
        navigate(navigationDestination);
    } else {
        return children;
    }
}

export default BlockAuth;