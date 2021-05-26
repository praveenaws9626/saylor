export const logError = err => {
  console.log(`status code: ${err && err.response && err.response.status ? err.response.status : "Error"}`);
  console.log(`server message: ${err && err.response && err.response.data ? err.response.data : ""}`);
  return err.response;
};
