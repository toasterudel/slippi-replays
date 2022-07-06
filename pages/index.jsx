import MyNavbar from "../components/MyNavbar";
import SidebarMenu from "react-bootstrap-sidebar-menu";


export default function Home() {

  return (
    <>
      <MyNavbar />
      <SidebarMenu>
        <SidebarMenu.Text>Hello</SidebarMenu.Text>
      </SidebarMenu>
      <h1>Hello World</h1>
    </>
  );
}
