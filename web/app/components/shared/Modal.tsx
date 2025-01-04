import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row flex-nowrap justify-center items-center absolute top-0 left-0 w-full h-full bg-black/10 z-20">
      {children}
    </div>
  );
}
