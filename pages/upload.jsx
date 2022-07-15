import MyNavbar from "../components/MyNavbar";
import { UserAuth } from "../firebase/userAuthContext";

import { useState } from "react";


export default function Upload() {
    const { user, upload } = UserAuth();

    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async () => {
        if (!fileUpload) return;
        setUploading(true);
        try {
            await upload(fileUpload);
        } catch (e) {
            alert(e);
        }
        setFileUpload(null);
        setUploading(false);
    };

    if (user) {

        //  TODO: only allow upload if email verified
        if (user?.emailVerified) {
            return (
                <>
                    <MyNavbar />
                    <h1>Upload Page</h1>
                    <br />
                    {/* <Accordion flush={false} style={{ borderWidth: "2px" }}>
                            <Accordion.Item eventKey="0">
                                 <Accordion.Header>Header</Accordion.Header>
                                     <Accordion.Body>Accordian Body:{"\t"} */}
                    <input type="file" accept=".slp" onChange={(event) => { setFileUpload(event.target.files) }} />
                    <button disabled={uploading} onClick={uploadFile}>Upload</button>
                    {/*             </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> */}
                </>
            )
        } else return (
            <>
                <MyNavbar />
                <h1>Must be email verified to upload</h1>
            </>
        )
    } else return (
        <>
            <MyNavbar />
            <h1>Must be logged in and email verified to upload</h1>
        </>
    )
}