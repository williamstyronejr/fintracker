import { SignedIn, SignedOut } from "@clerk/react-router";
import { getAuth } from "@clerk/react-router/ssr.server";
import { Navigate, NavLink, Outlet, redirect } from "react-router";
import { UserButton } from "@clerk/react-router";
import type { Route } from "./+types/layout";

export async function loader(args: Route.LoaderArgs) {
  const user = await getAuth(args);

  if (!user.userId) return redirect("/signin");

  return;
}

export default function DashboardLayout() {
  return (
    <main className="flex flex-row flex-nowrap h-full">
      <header className="flex flex-col flex-nowrap w-44 border-r py-4 bg-white">
        <div className="text-center py-2">
          <div>FinTracker</div>
        </div>

        <nav className="grow  text-center ">
          <ul className="flex flex-col flex-nowrap gap-4">
            <li>
              <NavLink
                className="flex flex-row flex-nowrap items-center justify-center"
                to="/dashboard"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                    stroke="#323232"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 9L3 9"
                    stroke="#323232"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21L9 9"
                    stroke="#323232"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Overview
              </NavLink>
            </li>

            <li>
              <NavLink
                className="flex flex-row flex-nowrap items-center  justify-center"
                to="/dashboard/accounts"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.6092 8.34165L12.0001 3.64575L3.39093 8.34165L3.75007 9.75007H5.25007V15.7501H4.50007V17.2501H19.5001V15.7501H18.7501V9.75007H20.2501L20.6092 8.34165ZM6.75007 15.7501V9.75007H9.00007V15.7501H6.75007ZM10.5001 15.7501V9.75007H13.5001V15.7501H10.5001ZM15.0001 15.7501V9.75007H17.2501V15.7501H15.0001ZM12.0001 5.35438L17.3088 8.25007H6.69131L12.0001 5.35438ZM3 19.5001H21V18.0001H3V19.5001Z"
                    fill="#080341"
                  />
                </svg>
                Account
              </NavLink>
            </li>

            <li>
              <NavLink
                className="flex flex-row flex-nowrap items-center justify-center"
                to="/dashboard/transactions"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289L22.3657 8.95147C23.1216 9.70743 22.5862 11 21.5172 11H2C1.44772 11 1 10.5523 1 10C1 9.44772 1.44772 9 2 9H19.5858L15.2929 4.70711C14.9024 4.31658 14.9024 3.68342 15.2929 3.29289ZM4.41421 15H22C22.5523 15 23 14.5523 23 14C23 13.4477 22.5523 13 22 13H2.48284C1.41376 13 0.878355 14.2926 1.63431 15.0485L7.29289 20.7071C7.68342 21.0976 8.31658 21.0976 8.70711 20.7071C9.09763 20.3166 9.09763 19.6834 8.70711 19.2929L4.41421 15Z"
                    fill="#0F0F0F"
                  ></path>
                </svg>
                Transactions
              </NavLink>
            </li>

            <li>
              <NavLink
                className="flex flex-row flex-nowrap items-center justify-center"
                to="/dashboard/budget"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                    stroke="#323232"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 9L3 9"
                    stroke="#323232"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21L9 9"
                    stroke="#323232"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Budget
              </NavLink>
            </li>

            <li>
              <NavLink
                className="flex flex-row flex-nowrap items-center justify-center"
                to="/dashboard/investing"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="#000000"
                  viewBox="0 0 24 24"
                  data-name="Line Color"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    id="primary"
                    points="21 6 14 13 11 10 3 18"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <polyline
                    id="secondary"
                    points="21 10 21 6 17 6"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Investing
              </NavLink>
            </li>
          </ul>
        </nav>

        <div>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </div>

        <div className="w-full px-1">
          <UserButton
            showName
            appearance={{
              elements: {
                button: {
                  base: {
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "between",
                    width: "100%",
                    backgroundColor: "black",
                  },
                },
              },
            }}
          />
        </div>
      </header>

      <div className="grow px-4 py-6">
        <Outlet />
      </div>
    </main>
  );
}
