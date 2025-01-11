import type React from "react";
import { Link } from "react-router";
import type { Route } from "./+types/AccountSettingsPage";
import Input from "~/components/Input";

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
              Delete Account
            </h3>
            <div>
              Permanently delete your account and all of its content. As this
              action is not reversible you will be asked to confirm the request.
            </div>
          </div>

          <div className="bg-slate-100 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
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
