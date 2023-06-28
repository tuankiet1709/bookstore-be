class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);

    this.name = Error.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
export default ApiError;
