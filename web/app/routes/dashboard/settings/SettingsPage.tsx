import Input from "~/components/Input";

export default function SettingsPage() {
  return (
    <div>
      <header className="py-4 pb-8 ">
        <h3 className="font-bold text-3xl">User Settings</h3>
      </header>

      <div className="flex flex-col flex-nowrap gap-8">
        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black">Edit Account</h3>
            <div>Edit your account details</div>

            <div></div>
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

        <div></div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black text-red-500">
              Delete Data
            </h3>
            <div>
              Permanently delete selected account data. As this action is not
              reversible you will be asked to confirm the request.
            </div>
          </div>

          <div className="bg-red-100/40 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors"
              type="button"
            >
              Delete Data
            </button>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black text-red-500">
              Delete Account
            </h3>
            <div>
              Permanently delete your account and all of its content. As this
              action is not reversible you will be asked to confirm the request.
            </div>
          </div>

          <div className="bg-red-100/40 px-4 text-right py-2">
            <button
              className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors"
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
