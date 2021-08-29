import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { createRef } from "react";
import { useRef } from "react";
import PinInput from "react-pin-input";
import BaseLayout from "../../layouts/baselayout";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { useTransactionMutation } from "../../generated/graphql";
import { useSnackbar } from "notistack";

const TransactionConfirmation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const pinRef = createRef<any>();
  const [executeTransactionMutation] = useTransactionMutation();
  const [isOpen, setIsOpen] = useState(false);
  if (!router.query.info) {
    return null;
  }
  const { info }: any = router.query;
  return (
    <BaseLayout>
      <div className="max-w-3xl m-auto">
        <h2 className="mt-4 text-2xl underline font-semibold">
          Transaction Info
        </h2>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Recipient Name</TableCell>
                <TableCell>{info[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Recipient Account Number</TableCell>
                <TableCell>{info[1]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>NPR {info[3]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Initiated Date</TableCell>
                <TableCell>{info[2]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <button
            type="submit"
            onClick={() => setIsOpen(true)}
            className={`${
              // !isAgreed
              //   ? "cursor-not-allowed hover:bg-red-600 hover:border-red-500"
              "border-blue-400 hover:bg-blue-600"
            } border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 mt-4 hover:text-white`}
          >
            Complete Transcation
          </button>
        </TableContainer>
      </div>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter the 6 digit pin displayed in TOTP device
                  </Dialog.Title>
                  <div className="mt-2 flex items-center justify-center">
                    <PinInput
                      ref={pinRef}
                      length={6}
                      secret={false}
                      type="numeric"
                      style={{ padding: "10px" }}
                      inputStyle={{
                        borderColor: "black",
                        borderRadius: "10px",
                      }}
                      inputFocusStyle={{ borderColor: "blue" }}
                      onComplete={async (value, index) => {
                        const { data, errors } =
                          await executeTransactionMutation({
                            variables: {
                              amount: info[3],
                              recipientAccountNumber: info[1],
                              totpToken: value.toString(),
                            },
                          });
                        if (data?.transaction?.success) {
                          enqueueSnackbar("Transaction Successful", {
                            variant: "success",
                          });
                          router.push("/dashboard");
                          return;
                        }
                        if (data?.transaction?.errors) {
                          setIsOpen(false);
                          data.transaction.errors.map((t) =>
                            enqueueSnackbar(t.message, { variant: "error" })
                          );
                        }
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </BaseLayout>
  );
};

export default TransactionConfirmation;
