import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function RequireAuth({children}: {children: JSX.Element}): JSX.Element{
    const context = useContext(AuthContext);

    if(context?.authenticated){
        return children;
    }

    return(
        <div>
            <h1>No Access to this page</h1>
            <a href="http://localhost:3000">Go back</a>
        </div>
    )
}

export default RequireAuth;