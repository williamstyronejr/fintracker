import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function NewBudgetPlan() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="rounded-full border border-slate-300 hover:bg-slate-300/10 px-2 py-1">
            New Plan
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Savings Plan</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>form</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
