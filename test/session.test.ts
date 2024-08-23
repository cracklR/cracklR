import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import session, { sessionStore, onEndListener } from "../src/session.ts";

describe("Given the session is created", () => {
  let testSession: session;

  beforeEach(() => {
    // Arrange
    testSession = new session("1234", "5678");
  });

  afterEach(() => {
    testSession.ended = true;
  });

  test("When the session ends, Then end method should be called once", () => {
    // Arrange
    testSession.onEnd = jest.fn<onEndListener>();

    // Act
    testSession.ended = true;

    // Assert
    expect(testSession.onEnd).toBeCalled();
  });

  test("When hints are set higher or lower than 3, Then adjust the number to prevent from going over or under the limit", () => {
    // Act
    // Simulate the counter going down further than it should
    for (let i = 0; i < 4; i++) {
      testSession.hints--;
    }

    // Assert
    expect(testSession.hints).toBe(0);

    // Act
    // Go higher than the hint count should
    testSession.hints = 4;

    // Assert
    expect(testSession.hints).toBe(3);
  });
});

describe("Given the sessionStore contains a session", () => {
  test("When a session is destroyed, Then also remove it from the store", () => {
    // Arrange
    const channelId = "channel1234";
    const testSession = new session("1234", "5678", () =>
      sessionStore.delete(channelId),
    );

    sessionStore.set(channelId, testSession);

    // Act
    testSession.ended = true;

    // Assert
    expect(sessionStore.get(channelId)).toBe(undefined);
  });
});

describe("Given the session has a custom expire time", () => {
  test("When the timeout expires, Then trigger the onEnd listener", async () => {
    // Arrange / Act
    // The timeout will be set to 0 so that the onEnd listener will trigger
    const testSession = new session("1234", "5678", undefined, 0);

    const jestFunc = jest.fn();

    await new Promise((res) => {
      testSession.onEnd = () => {
        // Tell jest a thing happened
        jestFunc();
        res(undefined);
      };
    });

    // Assert
    expect(jestFunc).toBeCalled();
  });
});
