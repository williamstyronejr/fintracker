import type { Route } from "./+types/HomePage";

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
        <li>Features</li>

        <li>Demo</li>

        <li></li>
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
        <div>
          <div>Signin</div>
        </div>
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

            <div className="">About</div>
            <div className="">Support</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
