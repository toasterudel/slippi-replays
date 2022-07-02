import { Container, Nav, Navbar } from "react-bootstrap";

export default function MyNavbar() {
  return (
    <Navbar
      variant="light"
      style={{ color: "white", backgroundColor: "#21BA45" }}
    >
      <Container>
        <a href="/">
          <img
            alt=""
            src="https://avatars.githubusercontent.com/u/45867030?s=200&v=4"
            width="60"
            height="60"
          />
        </a>
        <Nav.Link href="/tournaments" style={{ color: "white" }}>
          Tournaments
        </Nav.Link>
        <Nav.Link href="" style={{ color: "white" }}>
          Upload
        </Nav.Link>
      </Container>
    </Navbar>
  );
}
