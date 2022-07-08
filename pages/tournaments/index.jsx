import MyNavbar from "../../components/MyNavbar";

import { listTourneys } from "../../firebase/firebaseConfig";

export default function Tournaments() {
  return (
    <>
      <MyNavbar />
      <h1>Tournaments</h1>
      <br />
      <button onClick={async () => { await listTourneys() }}>Get Tournaments</button>
    </>
  );
}
