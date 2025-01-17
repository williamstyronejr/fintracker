import { Link } from "react-router";
import type { Route } from "./+types/HomePage";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function NavBar() {
  return (
    <nav className="">
      <ul>
        <SignedOut>
          <li>Features</li>

          <li>Demo</li>

          <li></li>
        </SignedOut>

        <SignedIn>
          <li>Dashboard</li>
        </SignedIn>
      </ul>
    </nav>
  );
}

export default function Home() {
  return (
    <main className="w-full">
      <header className="flex flex-row flex-nowrap py-4">
        <div>
          <h2 className="">FinTracker</h2>
        </div>

        <NavBar />

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <div></div>

      <footer className="md:flex flex-row flex-nowrap justify-between">
        <div className="md:max-w-60">
          <h2>FinTracker</h2>
          <div>A finacle tracker that works for you.</div>
        </div>

        <div className="flex flex-row flex-nowrap">
          <div className="">
            <h3 className="pb-4 font-bold">Company</h3>

            <div className="flex flex-col flex-nowrap gap-2">
              <Link to="/about">About</Link>
              <Link to="/support">Support</Link>
              <Link className="" to="/terms">
                Terms Of Services
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
