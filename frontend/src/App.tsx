import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import UserInterface from "./model/UserInterface";
import {useState} from "react";
import checkAuthentication from "./service/checkAuthentication";
import RequireAuth from "./utils/RequireAuth";
import {AuthContext} from "./context/AuthContext";
import BlockAuth from "./utils/BlockAuth";
import Index from "./pages/Index";

function App() {

    const [client, setClient] = useState<UserInterface>({
        username: '',
        authenticated: false
    });

    useEffect(() => {
        console.log(checkAuthentication());
        setClient(checkAuthentication());
    },[]);

    return (
    <Routes>
        <Route path="/" element={
            <AuthContext.Provider value={client}>
                <BlockAuth>
                    <Index/>
                </BlockAuth>
            </AuthContext.Provider>
        }/>

        <Route path="/home" element={
            <AuthContext.Provider value={client}>
                <RequireAuth>
                    <div>hello</div>
                </RequireAuth>
            </AuthContext.Provider>
        }/>


    </Routes>
  );
}

export default App;
