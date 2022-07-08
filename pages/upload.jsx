import MyNavbar from "../components/MyNavbar";
import { useAuth, upload } from "../firebase/firebaseConfig"

import { useState } from "react";


export default function Upload() {
    const currentUser = useAuth();

    const [fileUpload, setFileUpload] = useState(null);

    const uploadFile = async () => {
        if (!fileUpload) return;
        await upload(fileUpload);
        setFileUpload(null);
    };

    if (currentUser) {
        return (
            <>
                <MyNavbar />
                <h1>Upload Page</h1>
                <br />
                <input type="file" accept=".slp" onChange={(event) => { setFileUpload(event.target.files) }} />
                <button onClick={uploadFile}>Upload</button>
            </>
        )
    } else return (
        <>
            <MyNavbar />
            <h1>Must be logged in to upload</h1>
        </>
    )
}