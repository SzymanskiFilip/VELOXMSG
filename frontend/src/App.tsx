import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import UserInterface from "./model/UserInterface";
import {useState} from "react";
import checkAuthentication from "./service/checkAuthentication";

function App() {

    const [client, setClient] = useState<UserInterface>();

    useEffect(() => {
        console.log(checkAuthentication());
        setClient(checkAuthentication());
    },[]);

  return (
    <Routes>
        <Route path="/" element={
            <div>hello</div>
        }/>
    </Routes>
  );
}

export default App;
