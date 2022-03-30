import ClientOnly from "../../components/ClientOnly";
import Countries from "./components/Countries";

export default function ClientSide() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">
        GraphQL Client-Side
      </h1>
      <ClientOnly>
        <Countries />
      </ClientOnly>
    </>
  );
}
