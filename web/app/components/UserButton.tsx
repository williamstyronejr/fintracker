import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "./ui/dropdown-menu";

export default function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full px-2 group  py-2 ">
        <div className="flex flex-row flex-nowrap items-center ">
          <img
            src="/public/imgs/defaultProfile.jpg"
            alt="User Profile"
            className="rounded-md w-6 h-6 shrink-0"
          />

          <div className="md:block hidden px-2 grow text-left">Username</div>

          <svg
            className="md:block hidden w-4 h-4 shrink-0"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z" />
          </svg>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={"right"}
        className="py-2 bg-white shadow-lg rounded-md md:ml-2"
      >
        <div className="px-4">
          <DropdownMenuItem>Dark Mode</DropdownMenuItem>
        </div>

        <hr className="my-2" />

        <div className="px-4">
          <DropdownMenuItem className="py-2 text-red-500 w-full">
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
