"use client";

import { useState } from "react";
import {
  TableBody,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./Table";
import AddAccount from "@/app/dashboard/accounts/AddAccount";

function Account({ account }: { account: any }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="py-2">
      <div className="relative flex flex-row flex-nowrap">
        <div>
          <img className="rounded-md" src="" alt="Provider" />
        </div>

        <div className="grow">{account.title || "Account Name"}</div>

        <button
          className="hover:bg-slate-100 rounded-md"
          type="button"
          onClick={() => setMenuVisible((old) => !old)}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 256 256"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M72,128a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,72,128Zm120-8a8,8,0,1,0,8,8A8.00917,8.00917,0,0,0,192,120Zm-64,0a8,8,0,1,0,8,8A8.00917,8.00917,0,0,0,128,120Z" />{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AccountsList({ accounts }: { accounts: any[] }) {
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);

  return (
    <div>
      <div className="flex flex-row flex-nowrap justify-between">
        <div className="grow flex flex-row flex-nowrap rounded-md px-2 py-1 border border-slate-500 max-w-96 rounded-md">
          <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.989 15.4905L19.5 19.0015"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <input
            className="grow w-0 outline-none"
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />

          <button
            className="w-8 disabled:invisible"
            disabled={search === ""}
            onClick={() => {
              setSearch("");
            }}
          >
            X
          </button>
        </div>

        <div className="shrink-0">
          {addModal ? <AddAccount onClose={() => setAddModal(false)} /> : null}
          <button
            className="px-2 py-2 rounded-md bg-black text-white"
            onClick={() => setAddModal((old) => !old)}
            type="button"
          >
            New +
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Title2</TableHead>
            <TableHead>Title3</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Test title</TableCell>
            <TableCell>Test title2</TableCell>
            <TableCell>Test title3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Test title</TableCell>
            <TableCell>Test title2</TableCell>
            <TableCell>Test title3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Test title</TableCell>
            <TableCell>Test title2</TableCell>
            <TableCell>Test title3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
