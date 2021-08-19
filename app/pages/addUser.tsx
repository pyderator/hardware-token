import { CircularProgress, Snackbar } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputField from "../components/Fields/InputField";
import { H1 } from "../components/Headers/H1";
import {
  GetNonAssignedHardwareTokensQuery,
  useAddUserMutation,
  useGetNonAssignedHardwareTokensQuery,
} from "../generated/graphql";
import BaseLayout from "../layouts/baselayout";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";

const AddUser = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const [addUser, { data, loading, error }] = useAddUserMutation();
  const unAssignedHardwareTokensData = useGetNonAssignedHardwareTokensQuery();
  if (unAssignedHardwareTokensData.loading) {
    return <h1>Loading</h1>;
  }
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Add User</title>
        </Head>
        <main className="h-screen">
          {/* Login Div */}
          <div className="flex align-center justify-center">
            <div className="h-full bg-white w-full md:min-w-[400px] max-w-[400px]">
              <div className="text-left">
                <H1>Add User</H1>
              </div>
              <div className="my-2">
                {data?.addUser?.errors?.map((e, i) => {
                  console.log("i am running as well");
                  return (
                    <Snackbar
                      key={i}
                      open={open}
                      autoHideDuration={6000}
                      onClose={() => setOpen(false)}
                    >
                      <Alert severity="error" variant="outlined">
                        {e.message}
                      </Alert>
                    </Snackbar>
                  );
                })}
              </div>
              <div className="mt-6">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    accountNumber: "",
                    contactNumber: "",
                    productKey: "",
                  }}
                  onSubmit={async (e, { setSubmitting }) => {
                    setSubmitting(true);
                    await addUser({ variables: { ...e } });
                    if (data?.addUser?.success) {
                      enqueueSnackbar("Added user successfully", {
                        variant: "success",
                      });
                      setSubmitting(false);
                      router.push("/allUsers");
                    } else {
                      setOpen(true);
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ setFieldValue, isSubmitting, values }) => (
                    console.log(values),
                    (
                      <Form className="grid grid-cols-1 grid-rows-auto gap-y-8">
                        <div className="flex">
                          <InputField
                            id="firstName"
                            type="text"
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            className="mr-0 md:mr-1"
                          />
                          <InputField
                            id="lastName"
                            type="text"
                            name="lastName"
                            label="Last Name"
                            placeholder="Doe"
                            className="ml-0 md:ml-1"
                          />
                        </div>
                        <InputField
                          id="email"
                          type="text"
                          name="email"
                          label="Email"
                          placeholder="john@doe.com"
                        />
                        <InputField
                          id="text"
                          type="text"
                          name="contactNumber"
                          label="Contact Number"
                          placeholder="9801234512"
                        />
                        <InputField
                          id="accountNumber"
                          type="text"
                          name="accountNumber"
                          label="Account Number"
                          placeholder="341891231723091823"
                        />
                        <div
                          className={`w-full group focus-within:text-blue-500 `}
                        >
                          <label
                            className="text-sm font-bold"
                            htmlFor="product-ids"
                          >
                            Product Key
                          </label>
                          <Autocomplete
                            id="product-ids"
                            options={
                              unAssignedHardwareTokensData.data
                                ?.getHardwareTokensUnAssigned?.data
                            }
                            autoHighlight
                            getOptionLabel={(option: { productKey: string }) =>
                              option.productKey
                            }
                            onChange={(event, newValue) => {
                              setFieldValue("productKey", newValue?.productKey);
                            }}
                            renderInput={(params) => (
                              // <div ref={params.InputProps.ref}>
                              <div ref={params.InputProps.ref}>
                                <input
                                  type="text"
                                  {...params.inputProps}
                                  placeholder="Select product key"
                                  className="pb-[4px] font-regular text-sm text-gray-600 w-full border-b-[1px] border-gray-300 outline-none focus:border-blue-500"
                                />
                              </div>
                            )}
                          />
                        </div>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className={`${
                            !isSubmitting && "border-blue-400 hover:bg-blue-600"
                          } border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 hover:text-white`}
                        >
                          {isSubmitting ? (
                            <CircularProgress
                              size="small"
                              classes={{ root: "h-4 w-4" }}
                            />
                          ) : (
                            "Add"
                          )}
                        </button>
                      </Form>
                    )
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

export default AddUser;
