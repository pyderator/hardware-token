import { CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
import InputField from "../components/Fields/InputField";
import { H1 } from "../components/Headers/H1";
import {
  RegisterAccountMutation,
  RegisterAccountMutationVariables,
  useRegisterAccountMutation,
} from "../generated/graphql";
import BaseLayout from "../layouts/baselayout";

const AddUser = () => {
  const [addUser, { data, loading, error }] = useRegisterAccountMutation();
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
              <div className="mt-6">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    accountNumber: "",
                    contactNumber: "",
                    productKey: "",
                    hardwareTokenId: "",
                  }}
                  onSubmit={(e, { setSubmitting }) => {
                    const { productKey, ...values } = e;
                    setSubmitting(true);
                    addUser({ variables: { ...values } });
                  }}
                >
                  {({ isSubmitting }) => (
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
                      <InputField
                        id="hardwareTokenId"
                        type="text"
                        name="hardwareTokenId"
                        label="Hardware Token"
                        placeholder="XXX-XXXX-XXXX"
                      />
                      <InputField
                        id="productKey"
                        type="text"
                        name="productKey"
                        label="Product Key"
                        placeholder="XXX-XXX-XXX"
                      />
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
