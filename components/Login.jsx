import { useState, useRef } from "react"
import { Button, Dropdown, Modal } from "react-bootstrap"
import { signin, signout, useAuth } from "../firebase/firebaseConfig";

export default function Login() {
    const [showModal, setModal] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();

    let currentUser = useAuth();

    async function handleSignin() {
        await signin(emailRef.current.value, passRef.current.value);
    }

    const handleShowModal = () => { setModal(true) }
    const handleHideModal = () => { setModal(false) }

    if (!currentUser) {
        return (
            <>
                <Button variant="dark" onClick={handleShowModal}>Login / Register</Button>
                <Modal show={showModal} onHide={handleHideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <input ref={emailRef} placeholder="Email" />
                            <br />
                            <input ref={passRef} placeholder="Password" type="password" />
                            <br />
                            <Button variant="secondary" onClick={handleSignin}>Login</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button varaint="dark" onClick={() => {
                            //  Not sure why I have to do this instead of a simple href
                            handleHideModal();
                            window.location.replace("./register");
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
                        {currentUser?.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            window.location.replace("./user");
                        }}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={async () => {
                            try {
                                await signout();
                                window.location.replace("./");
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