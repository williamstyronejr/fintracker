import { useState } from "react";

function formatMoney(amount: string, currency = "USD") {
  return amount;
}

function isValidInput(amount: string, currency = "USD") {
  if (isNaN(amount)) return false;
  if (amount.includes(" ")) return false;

  if (amount.includes(".")) {
    if (amount.split(".")[1].length > 2) return false;
  }

  return true;
}

export default function MoneyInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue?.toString() || "");

  return (
    <div>
      <input type="hidden" value={value} />

      <div className="flex flex-row flex-nowrap items-center">
        <div className="text-lg mr-2">$</div>
        <input
          className="text-3xl outline-none"
          type="text"
          placeholder="0"
          name={name}
          value={formatMoney(value)}
          onChange={(evt) => {
            if (isValidInput(evt.target.value))
              setValue(evt.target.value.trim());
          }}
        />
      </div>
    </div>
  );
}
