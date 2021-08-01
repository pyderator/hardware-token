import Head from "next/head";
import Link from "next/link";
import BaseLayout from "../layouts/baselayout";
import { Formik, Form } from "formik";
import InputField from "../components/Fields/InputField";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { codes } from "../Datas/phoneNumberCodes";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Register = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Register</title>
        </Head>
        <main className=" h-screen w-screen">
          {/* Register Div */}
          <div className="flex align-center justify-center">
            <div className="h-full bg-white p-8">
              <h1 className="font-bold text-2xl md:text-4xl text-gray-800 pb-2">
                Register an account
              </h1>
              <div className="flex flex-row">
                <p className="text-sm font-bold text-gray-500 mr-2">
                  Already have an Account ?
                </p>
                <Link href="/login">
                  <p className="text-sm font-bold text-blue-600 cursor-pointer">
                    Sign in
                  </p>
                </Link>
              </div>
              <div className="mt-6">
                <Formik
                  initialValues={{
                    accountNumber: "",
                    mobileNumber: "",
                    countryCode: "NP +977",
                  }}
                  onSubmit={(e) => console.log(e)}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="grid grid-cols-1 grid-rows-auto gap-y-8">
                      <InputField
                        id="accountNumber"
                        type="text"
                        name="accountNumber"
                        label="Account Number"
                      />
                      <div className="flex items-end">
                        <Menu
                          as="div"
                          className="mr-2 relative inline-block text-left"
                        >
                          {({ open }) => (
                            <>
                              <div className="max-h-40">
                                <Menu.Button className="inline-flex justify-center min-w-[120px] w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                                  <span className="w-full">
                                    {values.countryCode}
                                  </span>
                                  <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>

                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="max-h-[200px] overflow-y-scroll overflow-x-hidden origin-top-right absolute right-[-100px] md:right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                >
                                  <div className="py-1">
                                    {Object.entries(codes).map((c) => (
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-xs"
                                              )}
                                              onClick={() =>
                                                setFieldValue(
                                                  "countryCode",
                                                  `${c[0]} ${c[1]}`
                                                )
                                              }
                                            >
                                              {c[0]} {c[1]}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                        <InputField
                          id="mobileNumber"
                          type="text"
                          name="mobileNumber"
                          label="Mobile Number"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isAgreed"
                          name="isAgreed"
                          defaultChecked={isAgreed}
                          onChange={() => setIsAgreed(!isAgreed)}
                          className="mr-3 cursor-pointer"
                        />
                        <p className="text-sm text-gray-600">
                          I accept all the terms and conditions
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={!isAgreed}
                        className={`${
                          !isAgreed
                            ? "cursor-not-allowed hover:bg-red-600 hover:border-red-500"
                            : ""
                        } border-[1.2px] rounded-md text-sm text-gray-700 font-regular border-blue-400 p-2 hover:bg-blue-600 hover:text-white`}
                      >
                        Register
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BaseLayout>
  );
};

export default Register;
