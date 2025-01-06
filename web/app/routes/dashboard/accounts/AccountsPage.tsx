import { Link } from "react-router";
import { formatCost } from "~/util";

export default function AccountsPage() {
  const accounts = [
    {
      id: "123",
      title: "Paypal",
      balance: 120.1,
      nickname: "My Paypal",
    },
  ];

  return (
    <div>
      <header>
        <h3>Accounts</h3>
      </header>

      <div className="flex flex-col flex-nowrap gap-4">
        {accounts.map((acct) => (
          <Link
            className="rounded-lg shadow-lg px-4 py-2"
            key={`accounts-${acct.id}`}
            to={`/dashboard/accounts/${acct.id}`}
          >
            <div className="flex flex-row flex-nowrap justify-between">
              <div className="">
                <h3 className="font-semibold text-xl pb-2">
                  {acct.nickname || acct.title}
                </h3>
                <div className="text-sm text-slate-700">
                  {acct.nickname ? acct.title : ""}
                </div>
              </div>

              <div className="">{formatCost(acct.balance)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
