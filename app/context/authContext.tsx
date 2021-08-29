import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { useIsUserLoggedInQuery } from "../generated/graphql";

// TODO: Configure Private || Protected Routes

// Default Signed In User Context
const defaultValues = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  accountNumber: "",
  isAuthenticated: false,
  isPasswordExpired: false,
  loading: true,
  setAuthContext: (_: any): any => {},
};

const AuthContext = createContext(defaultValues);

// Context Provider
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<any>(defaultValues);
  const { data, loading, error, refetch } = useIsUserLoggedInQuery();
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
    const fetchUser = async () => {
      const { data, loading, error } = await refetch();
      setState((prevState: any) => ({
        ...prevState,
        ...data?.loggedInUser?.data,
        loading,
        isAuthenticated: data?.loggedInUser?.success,
      }));
      if (data.loggedInUser?.data?.isPasswordExpired) {
        router.push("/updatePassword");
      }
      if (state.isAuthenticated) {
        router.push("/dashboard");
      }
    };
    fetchUser();
  }, [state.isAuthenticated]);

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
