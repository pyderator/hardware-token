import { CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
import InputField from "../components/Fields/InputField";
import { H1 } from "../components/Headers/H1";
import {
  useAddHardwareTokenMutation,
  useAddUserMutation,
} from "../generated/graphql";
import BaseLayout from "../layouts/baselayout";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const AddHardwareToken = () => {
  const [addToken, { data, loading, error }] = useAddHardwareTokenMutation();
  const { enqueueSnackbar } = useSnackbar();
  let [isOpen, setIsOpen] = useState(false);
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Add Hardware Token</title>
        </Head>
        <main className='h-screen'>
          {/* Login Div */}
          <div className='flex align-center justify-center'>
            <div className='h-full bg-white w-full md:min-w-[400px] max-w-[400px]'>
              <div className='text-left'>
                <H1>Add Token</H1>
              </div>
              <div className='mt-6'>
                <Formik
                  initialValues={{
                    productKey: "",
                  }}
                  onSubmit={async (e, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    const { data, errors } = await addToken({
                      variables: { ...e },
                    });
                    if (!data?.addHardwareToken?.success) {
                      enqueueSnackbar("Error! Something went wrong", {
                        variant: "error",
                      });
                    }
                    if (data?.addHardwareToken?.success) {
                      enqueueSnackbar("Token added successfully", {
                        variant: "success",
                      });
                      setIsOpen(true);
                      resetForm();
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className='grid grid-cols-1 grid-rows-auto gap-y-8'>
                      <InputField
                        id='productKey'
                        type='text'
                        name='productKey'
                        label='Product Key'
                        placeholder='XXX-XXX-XXX'
                      />
                      <button
                        disabled={isSubmitting}
                        type='submit'
                        className={`${
                          !isSubmitting && "border-blue-400 hover:bg-blue-600"
                        } border-[1.2px] rounded-md text-sm text-gray-700 font-regular p-2 hover:text-white`}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            size='small'
                            classes={{ root: "h-4 w-4" }}
                          />
                        ) : (
                          "Add"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
                {isOpen && (
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as='div'
                      className='fixed inset-0 z-10 overflow-y-auto'
                      onClose={() => setIsOpen(false)}
                    >
                      <div className='min-h-screen px-4 text-center'>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                          className='inline-block h-screen align-middle'
                          aria-hidden='true'
                        >
                          &#8203;
                        </span>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'
                        >
                          <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <Dialog.Title
                              as='h3'
                              className='text-lg font-medium leading-6 text-gray-900'
                            >
                              Token added successfully
                            </Dialog.Title>
                            <div className='mt-2'>
                              <p className='text-sm text-gray-500'>
                                The hash value for this token is,
                                <br />
                                <br />
                                {data?.addHardwareToken?.data?.hashArray}
                              </p>
                            </div>

                            <div className='mt-4'>
                              <button
                                type='button'
                                className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                onClick={() => setIsOpen(false)}
                              >
                                Exit!
                              </button>
                            </div>
                          </div>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </BaseLayout>
  );
};

export default AddHardwareToken;
