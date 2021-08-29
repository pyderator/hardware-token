import Head from "next/head";
import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { Updates } from "../components/Updates/updates";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  // Returns Navbar, Children and Footer
  return (
    <div>
      <Navbar />
      <div className="mb-4 mx-1">
        <Updates />
      </div>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className="px-4"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
