import { useState } from "react";
import MyNavbar from "../components/MyNavbar";

import { useAuth } from "../firebase/firebaseConfig";

export default function User() {
    const [userInfo, setUserInfo] = useState();

    let currentUser = useAuth();

    let handleUserInfo = () => userInfo ? setUserInfo("") : setUserInfo(JSON.stringify(currentUser, null, 4));

    return (
        <>
            <MyNavbar />
            <h1>Hello {currentUser?.email}</h1>
            <br />
            <button onClick={handleUserInfo}>Toggle User info</button>
            <br />
            <p style={{ overflowWrap: "break-word" }}>{userInfo}</p>
        </>
    )
}