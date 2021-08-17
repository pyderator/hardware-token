import React from "react";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/";
import InputField from "../components/Fields/InputField";
import { H1 } from "../components/Headers/H1";
import BaseLayout from "../layouts/baselayout";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  AllUsersQuery,
  AllUsersQueryHookResult,
  Exact,
  useAllUsersQuery,
} from "../generated/graphql";
import { gql } from "apollo-server-micro";
import client from "../utils/apollo-client";
import { QueryResult } from "@apollo/client";

const AllUsers = () => {
  const { data, loading } = useAllUsersQuery();
  const users = data?.findAllUsers?.data;
  console.log(data);
  if (loading) return <h1>Loading</h1>;
  return (
    <BaseLayout>
      <div>
        <Head>
          <title>Add User</title>
        </Head>
        <main className="h-screen">
          {/* Login Div */}
          <div className="flex align-center justify-center">
            <div className="h-full bg-white w-full ">
              <div className="text-left">
                <H1>All Users</H1>
              </div>
              <div className="text-gray-500 text-sm">
                <p className="text-lg">*Note</p>
                <p>
                  NOT_ACTIVE users are those who have their bank account but no
                  online banking account
                </p>
              </div>
              <div className="mt-6">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Contact Number</TableCell>
                        <TableCell align="center">Account Number</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Token Id</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users &&
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                              {user.id}
                            </TableCell>
                            <TableCell align="center">
                              {user.firstName}
                            </TableCell>
                            <TableCell align="center">
                              {user.lastName}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">
                              {user.contactNumber}
                            </TableCell>
                            <TableCell align="center">
                              {user.accountNumber}
                            </TableCell>
                            <TableCell align="center">{user.amount}</TableCell>
                            <TableCell align="center">{user.status}</TableCell>
                            <TableCell align="center">
                              {user.hardwareToken
                                ? user.hardwareToken
                                : "Not allotted yet"}
                            </TableCell>
                            {/* <TableCell align="center">{user.}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell> */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BaseLayout>
  );
};
export default AllUsers;
