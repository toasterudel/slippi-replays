import Head from "next/head";
import Image from "next/image";
import MyNavbar from "../components/MyNavbar";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import styles from "../styles/Home.module.css";

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
