import Head from "next/head";
import Image from "next/image";
import { Navbar } from "react-bootstrap";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ color: "white", padding: "10px" }}
      >
        Navigation
      </Navbar>
      <h1>Hello World</h1>
    </>
  );
}
