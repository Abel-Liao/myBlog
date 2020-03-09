import { createActions, handleActions, combineActions } from "redux-actions";

const defaultState = { counter: 5 };

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
});
const login = handleActions(
  {
    [combineActions(increment, decrement)]: (state, actions) => {
      console.log(actions);
      return { ...state, counter: state.counter + actions.amount };
    }
  },
  defaultState
);

export default login;
