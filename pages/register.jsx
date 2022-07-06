import { useRef, useState } from "react";

import MyNavbar from "../components/MyNavbar";
import { signup, useAuth } from "../firebase/firebaseConfig";
import { Button } from "react-bootstrap";

export default function Signup() {
    const emailRef = useRef();
    const passRef = useRef();

    const [signUpErr, setSignUpErr] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passRef.current.value);
        } catch (e) {
            if (e.code.includes("auth/weak-password")) {
                setSignUpErr("Password must be at least 6 characters")
            }
            if (e.code.includes("email-already-in-use")) {
                setSignUpErr("Email already in use")
            }
        }
        setLoading(false);
    }

    return (<>
        <MyNavbar />
        <h1>Registration page</h1>
        <h6 style={{ color: "red" }}>{signUpErr}</h6>
        <br />

        <div>
            <input ref={emailRef} placeholder="Email" />
            <br />
            <input ref={passRef} placeholder="Password" type="password" />
            <br />
            <Button disabled={loading} variant="secondary" onClick={handleSignup}>Sign up</Button>
        </div>
    </>)
}