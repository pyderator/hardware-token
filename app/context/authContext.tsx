import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { useIsUserLoggedInQuery } from "../generated/graphql";

// TODO: Configure Private || Protected Routes

// Default Signed In User Context
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  accountNumber: "",
  isAuthenticated: false,
  isPasswordExpired: false,
  loading: true,
  setAuthContext: () => {},
};

const AuthContext = createContext({});

// Context Provider
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<any>(defaultValues);
  const { data, loading, error } = useIsUserLoggedInQuery();
  const { enqueueSnackbar } = useSnackbar();

  const changeAuthContext = (data: {
    key: string;
    value: string | boolean;
  }) => {
    setState((prevState: any) => {
      return {
        ...prevState,
        ...data,
      };
    });
  };

  useEffect(() => {
    if (!loading) {
      if (!data?.loggedInUser?.success) {
        if (router.asPath.toString() !== ("/register" && "/login")) {
          console.log("heer");
          if (!data?.loggedInUser?.success) {
            enqueueSnackbar("Not Authenticated", {
              variant: "error",
            });
          }
          router.push("/login");
          return;
        }
        return;
      }
      setState((prevState: any) => ({
        ...prevState,
        ...data?.loggedInUser?.data,
        loading,
        isAuthenticated: data?.loggedInUser?.success,
      }));
      if (data.loggedInUser.data?.isPasswordExpired) {
        router.push("/updatePassword");
      }
    }
  }, [setState, data, loading, enqueueSnackbar]);
  console.log(state);

  return (
    <AuthContext.Provider
      value={{ ...state, setAuthContext: changeAuthContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Context Consumer
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
