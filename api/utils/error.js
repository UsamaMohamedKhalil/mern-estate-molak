export const errorHandeler = (statusCode , message) => {
   // Create a new Error object
   const error = new Error();
   // Set the status code of the error
   error.statusCode = statusCode;
   // Set the message of the error
   error.message = message;
   // Return the error object
   return error;
}