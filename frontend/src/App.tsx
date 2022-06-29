import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import UserInterface from "./model/UserInterface";
import {useState} from "react";

function App() {

    const [client, setClient] = useState<UserInterface>();

    useEffect(() => {
        //check if authenticated
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
