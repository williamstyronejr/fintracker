import { useEffect, useState, type ReactNode } from "react";
import { DialogTrigger, Dialog, DialogContent } from "./ui/dialog";
import { useFetcher } from "react-router";
import { useNotificationContext } from "~/hooks/NotificationContext";

export default function FormModal({
  action,
  method = "post",
  children,
  button,
  className = "",
  successMessage,
}: {
  action: string;
  method?: "post" | "get";
  children: ReactNode;
  button: string;
  className?: string;
  successMessage: string;
}) {
  const { addNotification } = useNotificationContext();
  const [visible, setVisible] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    // data === undefined by default, but server can return null
    if (fetcher.data !== undefined) {
      setVisible(false);
      addNotification(successMessage);
    }
  }, [fetcher.data]);

  return (
    <Dialog open={visible} onOpenChange={() => setVisible((old) => !old)}>
      <button
        className={className}
        type="button"
        onClick={() => setVisible((old) => !old)}
      >
        {button}
      </button>

      <DialogContent>
        <fetcher.Form action={action} method={method}>
          {children}
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
