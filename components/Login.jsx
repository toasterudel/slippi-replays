import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

export default function Login(props) {
    const { auth } = props;
    const [showModal, setModal] = useState(false);


    const handleShowModal = () => { setModal(true) }
    const handleHideModal = () => { setModal(false) }

    if (!auth || !auth.currentUser) {
        return (
            <>
                <Button variant="dark" onClick={handleShowModal}>Login / Register</Button>
                <Modal show={showModal} onHide={handleHideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Email</p>
                        <p>Password</p>
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
                <a href="/user">
                    <text style={{ color: "white" }}>{auth.currentUser}</text>
                </a>
            </>
        )
    }
}