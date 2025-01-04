import Link from "next/link";
import AccountPanel from "./AccountPanel";
import DataPanel from "./DataPanel";

export default function SettingsPage({
  params: { tab },
}: {
  params: { tab: string };
}) {
  return (
    <section>
      <header className="border-b px-2">
        <h3>Settings</h3>

        <div>
          <div>
            <Link href="/dashboard/settings/account">Account</Link>

            <Link href="/dashboard/settings/data">Data</Link>
          </div>
        </div>
      </header>

      <div className="px-2">
        {tab === "account" ? <AccountPanel /> : null}
        {tab === "data" ? <DataPanel /> : null}
      </div>
    </section>
  );
}
