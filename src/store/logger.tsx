import Raven from "raven-js";

// Redux middleware

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = (store: { getState: () => any }) => (
  next: (arg0: any) => any
) => (action: any) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log(result);
  console.log("next state", store.getState());
  return result;
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = (store: { getState: () => any }) => (
  next: (arg0: any) => any
) => (action: any) => {
  try {
    return next(action);
  } catch (err) {
    console.error("Caught an exception!", err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState(),
      },
    });
    throw err;
  }
};
export { logger, crashReporter };
