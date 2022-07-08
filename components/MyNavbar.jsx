import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

import { useAuth } from "../firebase/firebaseConfig";
import Login from "./Login";

export default function MyNavbar() {
  let currentUser = useAuth();

  return (
    <Navbar
      variant="light"
      style={{ color: "white", backgroundColor: "#21BA45" }}
    >
      <Container>
        <Link href="/">
          <a>
            <img
              alt=""
              src="https://avatars.githubusercontent.com/u/45867030?s=200&v=4"
              width="60"
              height="60"
            />
          </a>
        </Link>
        <Link href="/tournaments" >
          <a style={{ color: "white", textDecoration: "none" }}>Tournaments</a>
        </Link>
        {currentUser && <Link href="/upload" style={{ color: "white" }}>
          <a style={{ color: "white", textDecoration: "none" }}>Upload</a>
        </Link>}

        <Nav.Link>
          <Login />
        </Nav.Link>
      </Container>
    </Navbar>
  );
}
