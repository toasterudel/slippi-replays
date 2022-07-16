import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { UserAuth } from "../firebase/userAuthContext";
import Login from "./Login";

export default function MyNavbar() {
  const { user } = UserAuth();

  return (
    <Navbar
      variant="light"
      style={{ color: "white", backgroundColor: "#21BA45" }}
    >
      <Container style={{ color: "white", backgroundColor: "#21BA45" }}>
        <Link href="/" >
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
          <a style={{ color: "white", textDecoration: "none", backgroundColor: "#21BA45" }}>Tournaments</a>
        </Link>
        {user && <Link href="/upload" style={{ color: "white",  }}>
          <a style={{ color: "white", textDecoration: "none", }}>Upload</a>
        </Link>}

        <Nav.Link>
          <Login />
        </Nav.Link>
      </Container>
    </Navbar>
  );
}
