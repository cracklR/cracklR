import { describe, expect, jest, test } from "@jest/globals";
import session, { sessionStore, onEndListener } from "../src/session.ts";

describe("Given the session is created", () => {
  test("When the session ends, Then end method should be called once", () => {
    // Arrange
    const end = new (jest.fn<onEndListener>(new session()))();
    const testSession: session = new session("1234", "5678", end);

    // Act
    testSession.ended = true;

    // Assert
    expect(end).toBeCalled();
  });
});
