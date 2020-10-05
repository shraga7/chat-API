const errorHandler = (err, req, res, next) => {
  const DEFAULT_MESSAGE = "Internal Server Error";
  const DEFAULT_STATUS = 500;
  const error = { ...err };
  try {
    error.message = err.message;
    error.status = err.status;
  } catch (e) {
    error.message = DEFAULT_MESSAGE;
    error.status = DEFAULT_STATUS;
  }

  console.log("********************************************");
  console.log(error.status);
  console.log(error.message);
  console.log("********************************************");

  return res
    .status(error.status)
    .json({ success: false, message: error.message });
};

export default errorHandler;
