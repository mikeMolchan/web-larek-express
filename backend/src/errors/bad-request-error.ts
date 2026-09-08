const BAD_REQUEST_CODE = 400;

class BadRequestError extends Error {
  statusCode = BAD_REQUEST_CODE;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
