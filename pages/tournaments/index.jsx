import { doc } from "firebase/firestore";
import MyNavbar from "../../components/MyNavbar";
import { UserAuth } from "../../firebase/userAuthContext";

export default function Tournaments() {
  const { listTourneys, getTourneys, getAllTourneys } = UserAuth();

  const getTenTourneys = async () => {
    try {
      const data = await getTourneys(10);
      const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      alert(`SUCCESS: ${JSON.stringify(parsedData)}`);
    } catch (e) {
      alert(`ERROR: ${e}`);
    }
  }

  const getAll = async () => {
    try {
      const data = await getAllTourneys();
      const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      alert(`SUCCESS: ${JSON.stringify(parsedData)}`);
    } catch (e) {
      alert(`ERROR: ${e}`);
    }
  }

  return (
    <>
      <MyNavbar />
      <h1>Tournaments</h1>
      <br />
      <button onClick={async () => { await getTenTourneys() }}>Get Tournaments</button>
    </>
  );
}
