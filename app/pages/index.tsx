import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import BaseLayout from "../layouts/baselayout";
import styles from "../styles/Home.module.css";

export default function Home() {
  const auth = useAuthContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Hardware Token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <main className="text-4xl font-poppins">Welcome to the homepage</main>
        <div className="p-1 mt-4">
          <h2 className="text-2xl">Links that you can visit</h2>
          <ol start={1} className="mt-2">
            <Link href="/register" passHref>
              <li className="p-2 cursor-pointer text-lg">1. Register</li>
            </Link>
            <Link href="/login" passHref>
              <li className="p-2 cursor-pointer text-lg">2. Login</li>
            </Link>
            <Link href="/addUser" passHref>
              <li className="p-2 cursor-pointer text-lg">
                3. Add User [ Admin ]
              </li>
            </Link>
            <Link href="/addHardwareToken" passHref>
              <li className="p-2 cursor-pointer text-lg">
                4. Add Hardware Token [ Admin ]
              </li>
            </Link>
          </ol>
        </div>
      </BaseLayout>

      <footer></footer>
    </div>
  );
}
