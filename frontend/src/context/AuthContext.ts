import {createContext} from "react";
import UserInterface from "../model/UserInterface";
import StateInterface from "../model/StateInterface";

export const AuthContext = createContext<StateInterface | null>(null);