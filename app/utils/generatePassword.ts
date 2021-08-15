import argon2 from "argon2";
const generatePassword = async () => {
  const password = Math.random().toString(36).slice(6);
  const hashedPassword = await argon2.hash(password);
  return {
    password,
    hashedPassword,
  };
};

export default generatePassword;
