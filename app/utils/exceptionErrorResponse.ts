export const exceptionErrorResponse = (message: string) => {
  return {
    errors: [
      {
        message,
      },
    ],
    success: false,
  };
};
