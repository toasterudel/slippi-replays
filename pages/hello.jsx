import { UserAuth } from "../firebase/userAuthContext";

export default function Home() {

  const { user } = UserAuth();
  return <>
    <h1>Hello World!</h1>
    {user && <p>{JSON.stringify(user)}</p>}
  </>;
}
