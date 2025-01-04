import Link from "next/link";
import Popup from "../shared/Popup";

export default function UserButton() {
  return (
    <div className="flex flex-row flex-nowrap">
      <img alt="Profile" src="/" className="md:mr-4 rounded-full" />

      <div>username</div>

      <Popup>
        <div className="">
          <Link href="/dashboard/settings/account">Settings</Link>
        </div>
      </Popup>
    </div>
  );
}
