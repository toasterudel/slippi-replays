import { useRef, useState } from "react";
import { useRouter } from "next/router";

import MyNavbar from "../components/MyNavbar";
import { signup, useAuth } from "../firebase/firebaseConfig";
import { Button, Spinner } from "react-bootstrap";

export default function Signup() {
    const router = useRouter();

    const emailRef = useRef();
    const passRef = useRef();

    const [signUpErr, setSignUpErr] = useState("");
    const [loading, setLoading] = useState(false);

    const currentUser = useAuth();

    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passRef.current.value);
            //  If the above line throws an error it will never redirect to home 
            router.push("./");
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

    if (currentUser) {
        router.push("./user")
    }

    return (<>
        <MyNavbar />
        <h1>Registration page</h1>
        <h6 style={{ color: "red" }}>{signUpErr}</h6>
        <br />

        <div>
            <form>
                <input ref={emailRef} placeholder="Email" />
                <br />
                <input ref={passRef} placeholder="Password" type="password" />
                <br />
                <Button disabled={loading} variant="secondary" type="submit" onClick={handleSignup}>Sign up
                    {loading && <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                    />
                    }
                </Button>
            </form>
        </div>
    </>)
}