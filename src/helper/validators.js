export const validateLogin = (value) => {
  const error = {};
  if (!value?.userName?.trim()) error.userName = "Please enter username";
  if (!value?.password?.trim()) error.password = "Please enter password";

  return error;
};
