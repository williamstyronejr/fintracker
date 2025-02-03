import { useEffect, useState, type ReactNode } from "react";
import { DialogTrigger, Dialog, DialogContent } from "./ui/dialog";
import { useFetcher } from "react-router";
import Add from "./icons/Add";

export default function FormModal({
  action,
  method = "post",
  children,
}: {
  action: string;
  method?: "post" | "get";
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) setVisible(false);
  }, [fetcher.data]);

  return (
    <Dialog open={visible} onOpenChange={() => setVisible((old) => !old)}>
      <button type="button" onClick={() => setVisible((old) => !old)}>
        <Add />
      </button>

      <DialogContent>
        <fetcher.Form action={action} method={method}>
          {children}
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
