import type { Route } from "./+types/AccountPage";

export async function loader({ params }: Route.LoaderArgs) {
  const account = {
    id: params.id,
    name: "paypal",
    balance: 1200,
  };

  return account;
}

export default function AccountPage({ loaderData }: Route.ComponentProps) {
  const { id, name, balance } = loaderData;

  return (
    <div>
      <div>hello {name}</div>
    </div>
  );
}
