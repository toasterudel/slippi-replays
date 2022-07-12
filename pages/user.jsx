import { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import { Button } from "react-bootstrap";
import { UserAuth } from "../firebase/userAuthContext";

export default function User() {
    const [userInfo, setUserInfo] = useState();

    const { user, signin, signout, sendEmailVer } = UserAuth();

    const handleUserInfo = () => userInfo ? setUserInfo("") : setUserInfo(JSON.stringify(user, null, 4));
    const sendEmail = async () => {
        if (user) {
            try {
                let msg = await sendEmailVer(user);
                alert(`success: ${JSON.stringify(msg)}`);
            } catch (e) {
                alert(`error: ${JSON.stringify(e)}`);
            }
        }
    }

    return (
        <>
            <MyNavbar />
            <h1>Hello {user?.email}</h1>
            <br />
            {!user?.emailVerified && <>
                <p style={{ color: "red" }}>Please verify your email address</p>
                <Button onClick={sendEmail}>Resend verification email</Button><br />

            </>}

            <button onClick={handleUserInfo}>Toggle User info</button>
            <br />
            <p style={{ overflowWrap: "break-word" }}>{userInfo}</p>
        </>
    )
}