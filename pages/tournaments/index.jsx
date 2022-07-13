import { doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import MyNavbar from "../../components/MyNavbar";
import { UserAuth } from "../../firebase/userAuthContext";

export default function Tournaments() {
  const { listTourneys, getTourneys, } = UserAuth();

  const [tourneyList, setTourneyList] = useState([]);

  const getTenTourneys = async () => {
    try {
      const data = await getTourneys(10);
      const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      alert(`${JSON.stringify(parsedData)}`);
    } catch (e) {
      alert(`ERROR: ${e}`);
    }
  }

  useEffect(() => {
    const getTenTourneys = async () => {
      try {
        const data = await getTourneys(10);
        const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTourneyList(parsedData);
        // alert(`SUCCESS`);
      } catch (e) {
        alert(`ERROR: ${e}`);
      }
    }

    getTenTourneys().catch(console.error);

  }, [])

  return (
    <>
      <MyNavbar />
      <h1>Tournaments</h1>
      <br />
      <button onClick={async () => { await getTenTourneys() }}>Get Tournaments</button>
      {tourneyList.map((tourney, index) => {
        const { id, createdBy, date, setups } = tourney;
        const { seconds, nanoseconds } = date;
        const formattedDate = new Timestamp(seconds, nanoseconds);
        //if (index == 0) alert(JSON.stringify(formattedDate.toDate()))
        return <Accordion flush={false}>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{id}, created by: {createdBy} Date: {formattedDate.toDate().toString()}</Accordion.Header>
            <Accordion.Body>
              {JSON.stringify(setups)}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      })}
    </>
  );
}
