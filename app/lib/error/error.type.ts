type FetchErrorOptions = {
  message?: string;
  reason: 'NetworkError' | 'HttpStatusError' | 'ParseError';
  status?: number;
  cause?: unknown;
};

export class FetchError extends Error {
  reason: FetchErrorOptions['reason'];
  status?: number;
  cause: unknown;

  constructor({ message, reason, status, cause }: FetchErrorOptions) {
    super(message ?? reason);

    this.name = 'FetchError';
    this.reason = reason;
    this.status = status;
    this.cause = cause;
  }
}
