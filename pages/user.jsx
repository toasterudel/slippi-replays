import { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import { Button } from "react-bootstrap";

import { useAuth, sendEmailVer } from "../firebase/firebaseConfig";


export default function User() {
    const [userInfo, setUserInfo] = useState();

    let currentUser = useAuth();

    const handleUserInfo = () => userInfo ? setUserInfo("") : setUserInfo(JSON.stringify(currentUser, null, 4));
    const sendEmail = async () => {
        if (currentUser) {
            try {
                let msg = await sendEmailVer(currentUser);
                alert(`success: ${JSON.stringify(msg)}`);
            } catch (e) {
                alert(`error: ${JSON.stringify(e)}`);
            }
        }
    }

    return (
        <>
            <MyNavbar />
            <h1>Hello {currentUser?.email}</h1>
            <br />
            {!currentUser?.emailVerified && <>
                <p style={{ color: "red" }}>Please verify your email address</p>
                <Button onClick={sendEmail}>Send verification email</Button><br />

            </>}

            <button onClick={handleUserInfo}>Toggle User info</button>
            <br />
            <p style={{ overflowWrap: "break-word" }}>{userInfo}</p>
        </>
    )
}