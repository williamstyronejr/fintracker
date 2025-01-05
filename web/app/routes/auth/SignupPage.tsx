import { useState } from "react";
import { Link } from "react-router";
import Input from "~/components/Input";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-white rounded-md px-4 py-2 shadow-md max-w-80 mx-auto">
        <div>
          <h2 className="text-center text-2xl font-semibold py-6">Signup</h2>
        </div>

        <form>
          <div>
            <Input
              name="email"
              type="text"
              label=""
              placeholder="Email Address"
              error={undefined}
            />

            <div className="flex flex-row flex-nowrap items-center">
              <Input
                name="password"
                type={showPass ? "text" : "password"}
                label=""
                placeholder="Password"
                error={undefined}
              />

              <label className="block h-full hover:cursor-pointer shrink-0 px-2 bg-slate-100">
                <input
                  type="checkbox"
                  checked={showPass}
                  onChange={(evt) => setShowPass(evt.target.checked)}
                />
                <span className="ml-1 text-sm select-none " unselectable="on">
                  Show
                </span>
              </label>
            </div>
          </div>

          <button
            className="w-full text-center bg-slate-300 hover:bg-slate-500 rounded-md py-1 mt-4"
            type="submit"
          >
            Signup
          </button>
        </form>

        <div className="text-xs text-slate-500 pt-4">
          By creating an account, you agree to our Privacy Policy and Terms Of
          Services.
        </div>

        <div className="flex flex-row flex-nowrap items-center py-6">
          <hr className="grow fill-black" />
          <span className="mx-2">or</span>
          <hr className="grow fill-black" />
        </div>

        <div>
          <button
            className="flex flex-row flex-nowrap justify-center w-full items-center border border-slate-300 rounded-md hover:border-slate-500 transition-colors py-2"
            type="button"
          >
            <div className="inline w-5 h-5 mr-2">
              <svg viewBox="0 0 128 128">
                <path
                  fill="#fff"
                  d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
                ></path>
                <path
                  fill="#e33629"
                  d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
                ></path>
                <path
                  fill="#f8bd00"
                  d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"
                ></path>
                <path
                  fill="#587dbd"
                  d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
                ></path>
                <path
                  fill="#319f43"
                  d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
                ></path>
              </svg>
            </div>

            <div className="inline">Continue with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
}
