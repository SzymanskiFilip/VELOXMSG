import UserInterface from "./UserInterface";
import {Dispatch, SetStateAction} from "react";

interface StateInterface{
    client: UserInterface;
    setClient: Dispatch<SetStateAction<UserInterface>>;
}

export default StateInterface;