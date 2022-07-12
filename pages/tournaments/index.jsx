import MyNavbar from "../../components/MyNavbar";
import { UserAuth } from "../../firebase/userAuthContext";

export default function Tournaments() {
  const { listTourneys } = UserAuth();
  return (
    <>
      <MyNavbar />
      <h1>Tournaments</h1>
      <br />
      <button onClick={async () => { await listTourneys() }}>Get Tournaments</button>
    </>
  );
}
