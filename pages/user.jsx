import MyNavbar from "../components/MyNavbar";

import { useAuth } from "../firebase/firebaseConfig";

export default function User() {

    let currentUser = useAuth();

    return (
        <>
            <MyNavbar />
            <h1>Hello</h1>
        </>
    )
}