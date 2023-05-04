export const UserInformation = (): any => {
  // @ts-ignore
return JSON.parse(localStorage.getItem("userDetails"));
}