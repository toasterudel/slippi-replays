import MyNavbar from "../components/MyNavbar";
import SidebarMenu from "react-bootstrap-sidebar-menu";

//  Firebase setup
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {

  return (
    <>
      <MyNavbar auth={auth} />
      <SidebarMenu>
        <SidebarMenu.Text>Hello</SidebarMenu.Text>
      </SidebarMenu>
      <h1>Hello World</h1>
    </>
  );
}
