import type React from "react";
import { Link } from "react-router";
import type { Route } from "./+types/AccountSettingsPage";
import Input from "~/components/Input";
import { Select } from "~/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export default function AccountSettingsPage({ params }: Route.ComponentProps) {
  const { id } = params;
  return (
    <div>
      <div>
        <Link
          className="text-sm text-slate-500 hover:text-black"
          to={"/dashboard/accounts/${id}"}
        >
          Go Back
        </Link>

        <h3 className="font-bold text-xl pt-1 pb-3">Settings</h3>
      </div>

      <div className="flex flex-col gap-8">
        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black">Edit Name</h3>
            <div>Edit the name and nickname of your account.</div>

            <div className="py-2">
              <Input
                type="text"
                name="name"
                placeholder="Account Name"
                label="Account Name"
              />

              <Input
                type="text"
                name="nickname"
                placeholder="Account Nickname"
                label="Nickname"
              />
            </div>
          </div>

          <div className="bg-slate-100 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
              type="button"
            >
              Save
            </button>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black">
              Export Account Data
            </h3>
            <div>
              Export your account data including all transactions, recurring
              payments, and current balance into you selected format.
            </div>
          </div>

          <div className="flex flex-row flex-nowrap justify-between bg-slate-100 px-4 text-right py-2">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="File Format" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>

            <button
              className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black">
              Shareable Link
            </h3>
            <div>
              Creates a sharable link for this account. Note that all
              transaction on this account and transfers made to this account
              will be visible.
            </div>
          </div>

          <div className="bg-slate-100 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
              type="button"
            >
              Create Link
            </button>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-red-500">
              Delete Transactions
            </h3>
            <div>Delete transactions within a specific range of time.</div>
          </div>

          <div className="flex flex-row flex-nowrap justify-between bg-red-100/40 px-4 text-right py-2">
            <Select>
              <SelectTrigger className="w-[280-px]">
                <SelectValue placeholder="Time From Today" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="csv">24 Hours</SelectItem>
                <SelectItem value="json">30 Days</SelectItem>
                <SelectItem value="pdf">1 Year</SelectItem>
                <SelectItem value="pdf">All</SelectItem>
              </SelectContent>
            </Select>

            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors "
              type="button"
            >
              Delete Transactions
            </button>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-red-500">
              Delete Account
            </h3>
            <div>
              Permanently delete your account and all of its content. As this
              action is not reversible you will be asked to confirm the request.
            </div>
          </div>

          <div className="bg-red-100/40 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors "
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
