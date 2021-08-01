import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import InputField from "../components/Fields/InputField";
import { codes } from "../datas/phoneNumberCodes";
import BaseLayout from "../layouts/baselayout";
import { H1 } from "../components/Headers/H1";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <main className="h-screen">
          {/* Login Div */}
          <div className="flex align-center justify-center">
            <div className="h-full bg-white w-full md:min-w-[400px] md:max-w-[400px]">
              <div className="text-center">
                <H1>Login</H1>
              </div>
              <div className="mt-6">
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  onSubmit={(e) => console.log(e)}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="grid grid-cols-1 grid-rows-auto gap-y-8">
                      <InputField
                        id="username"
                        type="text"
                        name="username"
                        label="Username"
                        placeholder="Enter your username"
                      />
                      <div className="relative">
                        <InputField
                          id="password"
                          type={`${showPassword ? "text" : "password"}`}
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                        />
                        <button
                          className="absolute top-[28px] right-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiFillEyeInvisible className="text-xl" />
                          ) : (
                            <AiFillEye className="text-xl" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-bold text-gray-500 mr-2">
                          Don't have an account ?
                        </p>
                        <Link href="/register">
                          <p className="text-sm font-bold text-blue-600 cursor-pointer">
                            Sign up
                          </p>
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className={`${"border-blue-400 hover:bg-blue-600"} border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 hover:text-white`}
                      >
                        Login
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

export default Login;
