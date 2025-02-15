import { useEffect } from "react";
import { useFetcher } from "react-router";
import Input from "./Input";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import MoneyInput from "./MoneyInput";

/**
 * If account id is provided, selector will be disabled.
 * @param accountId Id of account default selected account.
 */
function AccountSelector({ accountId }: { accountId?: string }) {
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.submit(null, { method: "GET", action: "/api/account/list" });
  }, []);

  return (
    <Select name="account" disabled={!!accountId} defaultValue={accountId}>
      <SelectTrigger>
        <SelectValue placeholder="Select account" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {fetcher.data ? (
            fetcher.data.accounts.map((account) => (
              <SelectItem
                key={`select-account-${account.id}`}
                value={account.id}
                textValue={account.nickname || account.title}
              >
                {account.nickname || account.title}
              </SelectItem>
            ))
          ) : (
            <div>Nothigin here</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function CreateTransaction({
  accountId,
}: {
  accountId?: string;
}) {
  let fetcher = useFetcher();

  return (
    <Dialog>
      <DialogTrigger className="">Add</DialogTrigger>

      <DialogContent>
        <fetcher.Form action="/api/transactions/create" method="post">
          <Input name="title" label="title" type="text" />

          <MoneyInput name="amount" />

          <input type="hidden" name="account" value={accountId} />

          <AccountSelector accountId={accountId} />

          <button type="submit" disabled={fetcher.state != "idle"}>
            Create
          </button>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
