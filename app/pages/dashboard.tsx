import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import InputField from "../components/Fields/InputField";
import { useAuthContext } from "../context/authContext";
import {
  useGetUserInfoQuery,
  usePreTransactionCheckMutation,
} from "../generated/graphql";
import BaseLayout from "../layouts/baselayout";

const Dashboard = () => {
  const router = useRouter();
  const auth = useAuthContext();
  const { data, loading, error, refetch } = useGetUserInfoQuery({
    variables: { id: auth.id },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const [executePreTransactionCheck] = usePreTransactionCheckMutation();
  const { enqueueSnackbar } = useSnackbar();
  if (loading) {
    return "loading";
  }
  if (error || data?.getUserInfo?.errors) {
    router.push("/");
  }
  return (
    <BaseLayout>
      <div className="max-w-3xl m-auto">
        <h1 className="text-4xl font-semibold underline">
          Good Afternoon {data?.getUserInfo?.data?.user?.firstName},
        </h1>
        <div className="mt-4">
          <h2 className="text-2xl underline font-semibold">Account Status</h2>
          <p className="mt-2 text-lg font-normal py-1">
            Account Holder: {data?.getUserInfo?.data?.user?.firstName}{" "}
            {data?.getUserInfo?.data?.user?.lastName}
          </p>
          <p className="text-lg font-normal py-1">
            Account Number: {data?.getUserInfo?.data?.user?.accountNumber}
          </p>
          <p className="text-lg font-normal py-1">
            Closing Balance: {data?.getUserInfo?.data?.user?.amount}
          </p>
          <p className="text-lg font-normal py-1">
            Associated Branch: Kathmandu
          </p>
          <p className="text-lg font-normal py-1">
            Hardware Token ID: {data?.getUserInfo?.data?.user?.hardwareTokenId}
          </p>
          <p className="text-lg font-normal py-1">
            Account Status: {data?.getUserInfo?.data?.user?.status}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl underline font-semibold">Transfer Money</h2>
          <Formik
            initialValues={{ toAccount: "", amount: "" }}
            onSubmit={async (e, { setSubmitting }) => {
              setSubmitting(true);
              const { data, errors } = await executePreTransactionCheck({
                variables: {
                  recipientAmountNumber: e.toAccount,
                  amount: e.amount,
                },
              });
              if (data?.preTransactionCheck?.errors) {
                data.preTransactionCheck.errors.map((e) =>
                  enqueueSnackbar(e.message, {
                    variant: "error",
                  })
                );
                return;
              }
              if (errors) {
                enqueueSnackbar("Something went wrong", {
                  variant: "error",
                });
                return;
              }
              router.push(
                `/transactionConfirmation/${data?.preTransactionCheck?.data?.recipientInfo?.name}/${data?.preTransactionCheck?.data?.recipientInfo?.accountNumber}/${data?.preTransactionCheck?.data?.recipientInfo?.initiatedTransactionDate}/${data?.preTransactionCheck?.data?.amount}`
              );
              // router.push("/transactionConfirmation/[...info]", {
              //   href:`${
              //     name: data?.preTransactionCheck?.data?.recipientInfo?.name,
              //     accountNumber:
              //       data?.preTransactionCheck?.data?.recipientInfo
              //         ?.accountNumber,
              //     initiatedDate:
              //       data?.preTransactionCheck?.data?.recipientInfo
              //         ?.initiatedTransactionDate,
              //     amount: data?.preTransactionCheck?.data?.amount,

              //   }`
              // });
            }}
          >
            <Form className="mt-4">
              <InputField
                className="my-4"
                id="toAccount"
                name="toAccount"
                label="Recipient Account Number"
                type="text"
                placeholder="Enter the recipient account number here"
              />
              <InputField
                className="my-4"
                id="amount"
                name="amount"
                label="Amount"
                type="text"
                placeholder="Enter the amount to be transferred"
              />
              {/* <Divider /> */}
              <button
                type="submit"
                className={`${
                  // !isAgreed
                  //   ? "cursor-not-allowed hover:bg-red-600 hover:border-red-500"
                  "border-blue-400 hover:bg-blue-600"
                } border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 mt-2 hover:text-white`}
              >
                Start Transcation
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
