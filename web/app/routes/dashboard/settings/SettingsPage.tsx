export default function SettingsPage() {
  return (
    <div>
      <div className="border border-slate-300 rounded-md shadow-lg">
        <div className="px-4 py-4">
          <h3 className="font-bold text-2xl py-2 text-black">Delete Account</h3>
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
  );
}
