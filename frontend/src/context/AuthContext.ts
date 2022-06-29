import {createContext} from "react";
import UserInterface from "../model/UserInterface";

export const AuthContext = createContext<UserInterface | null>(null);