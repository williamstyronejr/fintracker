import { useFetcher } from "react-router";
import { Dialog, DialogContent } from "./ui/dialog";
import Input from "./Input";

export default function EditTransaction({
  visible,
  onClose,
  transaction,
}: {
  visible: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    amount: string;
    title: string;
  };
}) {
  const fetcher = useFetcher();

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <h3>Edit Transaction</h3>
          <fetcher.Form
            action={`/api/transactions/${transaction.id}/edit`}
            method="post"
          >
            <Input
              type="text"
              name="title"
              label="Title"
              initialValue={transaction.title}
            />

            <Input
              type="text"
              name="amount"
              label="Amount"
              initialValue={transaction.amount}
            />

            <div>
              <button type="submit" disabled={fetcher.state !== "idle"}>
                Save
              </button>
            </div>
          </fetcher.Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
