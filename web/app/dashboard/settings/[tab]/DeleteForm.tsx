"use client";

import Modal from "@/app/components/shared/Modal";

export default function DeleteForm({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="md:w-80 bg-white px-4 py-2 rounded-md">
        <div>
          <h3>Delete Account</h3>
        </div>

        <div>
          Are you sure you want to delete your account and all associated data?
          This will remove all publically available link you have created (if
          any) and will delete all local delete as well.
        </div>

        <div className="flex flex-row flex-nowrap justify-between pt-4">
          <button
            className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white"
            type="button"
            onClick={() => {}}
          >
            Confirm
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
