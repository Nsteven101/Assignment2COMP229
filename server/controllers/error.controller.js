function handleError(req, res) {
  // Your code to handle the error
  res.status(500).json({
    error: "An unexpected error occurred.",
    path: req.originalUrl,
    method: req.method,
  });
}

function getErrorMessage(errMsg) {
  console.log("Logged Error:", errMsg);
}

// Export the controller function
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};