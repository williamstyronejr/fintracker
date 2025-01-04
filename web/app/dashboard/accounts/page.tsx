import AccountsList from "@/app/components/shared/AccountsList";

export default function AccountsPage() {
  const accounts = [
    {
      id: 123,
      title: "test",
    },
    { id: 124, title: "test2" },
    { id: 125, title: "test3" },
  ];
  return (
    <section className="bg-white rounded-md shadow-md h-full px-2 py-4">
      <header className="flex flex-row flex-nowrap space-between">
        <h3 className="">Accounts</h3>
      </header>

      <div className="">
        <AccountsList accounts={accounts} />
      </div>
    </section>
  );
}
