import MyNavbar from "../components/MyNavbar";
import { useAuth, upload } from "../firebase/firebaseConfig"
import { UserAuth } from "../firebase/userAuthContext";

import { useState } from "react";


export default function Upload() {
    const { user, upload } = UserAuth();

    const [fileUpload, setFileUpload] = useState(null);

    const uploadFile = async () => {
        if (!fileUpload) return;
        await upload(fileUpload);
        setFileUpload(null);
    };

    if (user) {

        //  TODO: only allow upload if email verified
        // if(user?.emailVerified){
        //     return (
        //         <>
        //             <MyNavbar />
        //             <h1>Upload Page</h1>
        //             <br />
        //             <input type="file" accept=".slp" onChange={(event) => { setFileUpload(event.target.files) }} />
        //             <button onClick={uploadFile}>Upload</button>
        //         </>
        //     )
        // } else 
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