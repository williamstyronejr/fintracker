"use client";

import Input from "@/app/components/shared/Input";
import Modal from "@/app/components/shared/Modal";
import { FormEvent } from "react";

export default function AddAccount({ onClose }: { onClose: () => void }) {
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  return (
    <Modal>
      <div className="bg-white shadow-md  rounded-md px-2 py-4 z">
        <h3>Add Account</h3>

        <form action="POST" onSubmit={onSubmit}>
          <div>
            <Input label="Account Name" name="name" type="text" />

            <Input label="Bank/Provider" name="provider" type="text" />
          </div>

          <div className="flex flex-row flex-nowrap space-between">
            <button type="submit" className="">
              Create
            </button>

            <button type="button" className="" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
