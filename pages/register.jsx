import { useRef, useState } from "react";
import { useRouter } from "next/router";

import MyNavbar from "../components/MyNavbar";
import { UserAuth } from "../firebase/userAuthContext";
import { Button, Spinner } from "react-bootstrap";

export default function Signup() {
    const router = useRouter();

    const emailRef = useRef();
    const passRef = useRef();

    const [signUpErr, setSignUpErr] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, signup, sendEmailVer } = UserAuth();
    const sendEmail = async (newUser) => {
        if (newUser) {
            try {
                let msg = await sendEmailVer(newUser);
                alert(`Sent email verification to: ${newUser.email} `);
            } catch (e) {
                alert(`Error sending validation email: ${JSON.stringify(e)}`);
            }
        }
    }

    const handleSignup = async () => {
        setLoading(true);
        try {
            const newUser = await signup(emailRef.current.value, passRef.current.value);
            //  signup returns an object: { user: {uuid, email,etc}, providerId, tokenResponse}
            //  the sendEmailVerification method only uses the user portion, destructuring below
            const { user } = newUser;
            await sendEmail(user);

            router.push("./user");
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

    if (user) {
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