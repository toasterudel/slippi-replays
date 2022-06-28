import { useRouter } from "next/router";

export default function Tournament() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Hello {id}</h1>;
}

export async function getServerSideProps() {
  return { props: {} };
}
