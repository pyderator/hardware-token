import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

export const Updates = () => {
  return (
    <div className="w-full pt-16">
      <div className="w-full max-w-[800px] p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Latest Updates</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  static
                  className="px-4 pt-4 pb-2 text-sm text-gray-500 grid grid-cols-1 gap-y-4"
                >
                  <Link href="/register">
                    <a>
                      1. Added Register Page |{" "}
                      <span className="text-xs text-blue-600">1 Aug, 2021</span>
                    </a>
                  </Link>
                  <Link href="https://github.com/pyderator/hardware-token/actions">
                    <a target="_blank">
                      2. Setup Github Actions and Linked to Vercel |{" "}
                      <span className="text-xs text-blue-600">1 Aug, 2021</span>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a>
                      3. Added Login Page |{" "}
                      <span className="text-xs text-blue-600">1 Aug, 2021</span>
                    </a>
                  </Link>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
