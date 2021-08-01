import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/register");
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Hardware Token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-">Welcome to the homepage</main>

      <footer></footer>
    </div>
  );
}
