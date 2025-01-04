"use client";

import Modal from "@/app/components/shared/Modal";
import { useState } from "react";

const InputSelect = ({
  name,
  id,
  label,
  initialValue = false,
}: {
  name: string;
  id: string;
  label: string;
  initialValue?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="py-2">
      <label className="flex flex-row flex-nowrap items-center group hover:cursor-pointer">
        <button
          className={`w-6 h-6 border rounded-md mr-2 ${
            value ? "bg-black" : "bg-white"
          }`}
          type="button"
          onClick={() => setValue((old) => !old)}
        />

        <span className="">{label}</span>

        <input
          name={name}
          id={id}
          type="checkbox"
          checked={value}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default function ResetForm({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="md:w-80 bg-white px-4 py-2 rounded-md">
        <div>
          <h3 className="Font-semibold">Select Which Data to Reset</h3>
        </div>

        <div className="px-2">
          <InputSelect
            id="transactions"
            name="transaction"
            label="Transactions"
          />

          <InputSelect id="budget" name="budget" label="Budgets" />

          <InputSelect id="account" name="account" label="Accounts" />
        </div>

        <div className="flex flex-row flex-nowrap justify-between pt-4">
          <button
            className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white"
            type="button"
            onClick={() => {}}
          >
            Reset
          </button>

          <button
            type="button"
            className="bg-black hover:bg-slate-700 rounded-md px-2 py-1 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
