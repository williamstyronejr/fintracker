import { useEffect, useState, type ReactNode } from "react";
import { DialogTrigger, Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useFetcher } from "react-router";
import Add from "./icons/Add";

export default function ConfirmationButton({
  action,
  method = "post",
  children,
  confirmText = "Please confirm this request.",
}: {
  action: string;
  method?: "post" | "get";
  children: ReactNode;
  confirmText: string;
}) {
  const [visible, setVisible] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) setVisible(false);
  }, [fetcher.data]);

  return (
    <Dialog open={visible} onOpenChange={() => setVisible((old) => !old)}>
      <button type="button" onClick={() => setVisible((old) => !old)}>
        {children}
      </button>

      <DialogContent>
        <DialogTitle>Confirmation</DialogTitle>
        <fetcher.Form action={action} method={method}>
          <div className="py-4">{confirmText}</div>

          <div className="flex flex-row flex-nowrap justify-between">
            <button
              className="px-2 py-1 border border-slate-500 rounded-md hover:border-black"
              type="submit"
            >
              Confirm
            </button>

            <button
              className="px-2 py-1 border border-slate-500 rounded-md hover:border-black"
              type="button"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
          </div>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
