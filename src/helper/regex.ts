function regex(name: string, data: string | number) {
  const regexName: any = {
    email: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
    userName: /^[A-Za-z0-9_]{5,12}$/,
    password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[A-Za-z0-9@$!%*?&-_~#]{8,16}$/,
    dynamic: /^\d{4}$/,
  };
  return regexName[name].test(data);
}
export default regex;
