import { U } from './index';

describe("AppError", () => {
  it("creates an error with default message and status", () => {
    const error = new U.Error("NOT_FOUND");
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("We looked everywhere and couldn't find it!");
    expect(error.status).toBe(404);
  });

  it("overrides status when custom status is provided", () => {
    const error = new U.Error("AUTHN_ERROR", null, 403);
    expect(error.code).toBe("AUTHN_ERROR");
    expect(error.message).toBe("Looks like you're not permitted to do that!");
    expect(error.status).toBe(403);
  });

  it("overrides message when custom message is provided", () => {
    const error = new U.Error("INVALID_INPUT", null, undefined, "Custom message");
    expect(error.code).toBe("INVALID_INPUT");
    expect(error.message).toBe("Custom message");
    expect(error.status).toBe(400); // Default status
  });

  it("handles custom details of any shape", () => {
    const error = new U.Error("AUTHN_ERROR", { detail: "Custom details" });
    expect(error.code).toBe("AUTHN_ERROR");
    expect(error.message).toBe("Looks like you need to authenticate in order to do that!");
    expect(error.details).toEqual({ detail: "Custom details" });
    expect(error.status).toBe(401); // Default status for unknown codes
  });
});