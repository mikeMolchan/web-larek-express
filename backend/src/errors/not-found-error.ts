const NOT_FOUND_CODE = 404;

class NotFoundError extends Error {
  statusCode = NOT_FOUND_CODE;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
