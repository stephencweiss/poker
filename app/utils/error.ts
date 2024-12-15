import { isValidString } from "./strings";

const standardClientErrorMessages: Record<number, string> = {
  400: "Hmm. That doesn't look right!",
  401: "Looks like you need to authenticate in order to do that!",
  403: "Looks like you're not permitted to do that!",
  404: "We looked everywhere and couldn't find it!",
  500: "Oops! Something went wrong on our side!",
}

type ErrorCode =
| "NOT_FOUND"
| "INVALID_INPUT"
| "AUTHN_ERROR"
| "AUTHZ_ERROR"
| "UNIMPLEMENTED"

export const ErrorDefinitions: Record<ErrorCode, { status: number; detail: string }> = {
  NOT_FOUND: { status: 404, detail: "Resource not found" },
  INVALID_INPUT: { status: 400, detail: "Invalid input" },
  AUTHN_ERROR: { status: 401, detail: "Unauthenticated Request" },
  AUTHZ_ERROR: { status: 403, detail: "Unauthorized Request" },
  UNIMPLEMENTED: { status: 500, detail: "Not implemented." }
};

export class AppError extends Error {
  code: string;
  status: number;
  details?: any;

  constructor(errorCode: ErrorCode, details?: any, customStatusCode?: number, customClientMessage?: string) {
    const definition = ErrorDefinitions[errorCode] || { status: 500, detail: standardClientErrorMessages[500] };
    const status = customStatusCode ?? definition.status;
    const message = customClientMessage ?? standardClientErrorMessages[status];
    if (!isValidString(message)){
      throw new Error("No message in error code! Something's wrong")
    }
    super(message);

    this.code = errorCode;
    this.status = status;
    this.details = details ?? definition.detail;
  }
}
