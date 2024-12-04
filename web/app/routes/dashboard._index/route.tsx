export default function Dashboard() {
  return (
    <div className="grow px-4 py-6 bg-slate-500">
      <div className="flex flex-row gap-2">
        <div className="p-4 bg-white rounded-md">
          <div>Balance</div>

          <div>
            <span>$</span>1000
          </div>

          <div>
            <span className="">+20</span> compared to last month
          </div>
        </div>
      </div>
    </div>
  );
}
