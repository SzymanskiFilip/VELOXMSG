import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import UserInterface from "./model/UserInterface";
import {useState} from "react";
import RequireAuth from "./utils/RequireAuth";
import {AuthContext} from "./context/AuthContext";
import BlockAuth from "./utils/BlockAuth";
import Index from "./pages/Index";
import StateInterface from "./model/StateInterface";
import {useCookies} from "react-cookie";
import Home from "./pages/Home";

function App() {

    const [client, setClient] = useState<UserInterface>({
        authenticated: false
    });
    const [cookies, setCookie] = useCookies();
    const state: StateInterface = {
      client, setClient
    };



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
                        setClient({authenticated: true});
                    }
                })
        }
    }, []);

    return (
    <Routes>
        <Route path="/" element={
            <AuthContext.Provider value={state}>
                <BlockAuth>
                    <Index/>
                </BlockAuth>
            </AuthContext.Provider>
        }/>

        <Route path="/home" element={
            <AuthContext.Provider value={state}>
                <RequireAuth>
                    <Home />
                </RequireAuth>
            </AuthContext.Provider>
        }/>
    </Routes>
  );
}

export default App;
