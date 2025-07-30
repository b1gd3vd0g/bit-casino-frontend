export default function HomePage() {
  const token: string = sessionStorage.token;
  return (
    <>
      <h1>{token}</h1>
    </>
  );
}
