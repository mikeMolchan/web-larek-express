const CONFLICT_CODE = 409;

class ConflictError extends Error {
  statusCode = CONFLICT_CODE;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export default ConflictError;
