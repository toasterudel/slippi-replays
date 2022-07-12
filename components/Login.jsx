import { useState, useRef } from "react"
import { Button, Dropdown, Modal, Spinner } from "react-bootstrap"
import { useRouter } from "next/router";
import { UserAuth } from "../firebase/userAuthContext";

export default function Login() {
    const [showModal, setModal] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();
    const router = useRouter();

    const { user, signin, signout } = UserAuth();


    const handleSignin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        try {
            await signin(emailRef.current.value, passRef.current.value);
            router.reload();
        } catch (e) {
            let errorStr = JSON.stringify(e);
            if (errorStr.includes("wrong-password")) {
                alert("Incorrect Password")
            } else {
                alert(e);
            }
        }
        setLoginLoading(false);
    }

    const handleShowModal = () => { setModal(true) }
    const handleHideModal = () => { setModal(false) }

    if (!user) {
        return (
            <>
                <Button variant="dark" onClick={handleShowModal}>Login / Register</Button>
                <Modal show={showModal} onHide={handleHideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <input ref={emailRef} placeholder="Email" />
                                <br />
                                <input ref={passRef} placeholder="Password" type="password" />
                                <br />
                                <Button variant="secondary"
                                    onClick={handleSignin}
                                    type="submit"
                                    disabled={loginLoading}
                                >Login
                                    {loginLoading && <Spinner
                                        animation="border"
                                        role="status"
                                        size="sm"
                                    />}
                                </Button>

                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button varaint="dark" onClick={() => {
                            handleHideModal();
                            router.push("./register");
                        }}>Create an Account</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    } else {
        return (
            <>
                <Dropdown>
                    <Dropdown.Toggle variant="success" >
                        {user?.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            router.push("./user");
                        }}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={async () => {
                            try {
                                await signout();
                                router.push("./");
                                handleHideModal();
                            } catch (e) {
                                alert(e);
                            }
                        }}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }
}