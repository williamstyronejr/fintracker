"use client";

import { useState } from "react";
import ResetForm from "./ResetForm";
import DeleteForm from "./DeleteForm";

export default function DataPanel() {
  const [resetForm, setResetForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  return (
    <div>
      <div className="flex flex-row flex-nowrap py-6">
        {resetForm ? <ResetForm onClose={() => setResetForm(false)} /> : null}
        <div className="w-1/3">
          <h3 className="font-semibold pb-2 text-red-500">Reset Data</h3>
          <div className="text-sm">
            Delete all or selected amounts of data locally and/or from our
            servers.
          </div>
          <div className="text-sm text-red-500 pt-1">
            Note that this change is permanent and can not be undone.
          </div>
        </div>

        <div className="grow text-right">
          <button
            className="bg-black text-white rounded-md px-2 py-1 hover:bg-slate-700"
            type="button"
            onClick={() => {
              setResetForm((old) => !old);
            }}
          >
            Reset Data
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap border-t py-6">
        {deleteForm ? (
          <DeleteForm onClose={() => setDeleteForm(false)} />
        ) : null}

        <div className="w-1/3">
          <h3 className="font-semibold pb-2 text-red-500">Delete Account</h3>

          <div className="text-sm">
            This will remove all data locally and/or on our servers associated
            with your accounts. All public links will also cease to work.
          </div>

          <div className="text-sm text-red-500 pt-1">
            Note that this change is permanent and can not be undone.
          </div>
        </div>

        <div className="grow text-right">
          <button
            type="button"
            className="bg-black text-white rounded-md px-2 py-1 bg-red-500 hover:bg-red-700"
            onClick={() => setDeleteForm((old) => !old)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
