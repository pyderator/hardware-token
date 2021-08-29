import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
import InputField from "../components/Fields/InputField";
import { H1 } from "../components/Headers/H1";
import {
  useChangePasswordMutation,
  useCheckIfCredsMatchesMutation,
} from "../generated/graphql";
import BaseLayout from "../layouts/baselayout";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [executeChangePassword] = useChangePasswordMutation();

  const { enqueueSnackbar } = useSnackbar();
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Update Password</title>
        </Head>
        <main className="h-screen">
          {/* Login Div */}
          <div className="flex align-center justify-center">
            <div className="h-full bg-white w-full md:min-w-[400px] max-w-[600px]">
              <div className="text-center">
                <H1>Update Password</H1>
              </div>
              <div className="mt-6">
                <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={async (e, { setSubmitting }) => {
                    setSubmitting(true);
                    const { data, errors } = await executeChangePassword({
                      variables: e,
                    });

                    if (data?.changeUserPassword?.data) {
                      enqueueSnackbar("Creds Matches", {
                        variant: "success",
                      });
                    }
                    if (data?.changeUserPassword?.errors) {
                      data.changeUserPassword.errors.map((e) =>
                        enqueueSnackbar(e.message, { variant: "error" })
                      );
                    }
                  }}
                >
                  {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="grid grid-cols-1 grid-rows-auto gap-y-8">
                      <div className="relative">
                        <InputField
                          id="password"
                          type={`${showPassword ? "text" : "password"}`}
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
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
                      <div className="relative">
                        <InputField
                          id="confirmPassword"
                          type={`${showConfirmPassword ? "text" : "password"}`}
                          name="confirmPassword"
                          label="Confirm Password"
                          placeholder="Please re-type your password"
                        />
                        <button
                          type="button"
                          className="absolute top-[28px] right-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <AiFillEyeInvisible className="text-xl" />
                          ) : (
                            <AiFillEye className="text-xl" />
                          )}
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${
                          isSubmitting
                            ? "cursor-not-allowed hover:bg-red-600 hover:border-red-500"
                            : "border-blue-400 hover:bg-blue-600"
                        } border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 hover:text-white`}
                      >
                        Update
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

export default UpdatePassword;
