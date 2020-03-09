import { createActions, handleActions, combineActions } from "redux-actions";

const defaultState = { number: 5 };

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount })
});
const register = handleActions(
  {
    [combineActions(increment, decrement)]: (state: any, actions: any) => {
      return { ...state, number: state.number + actions.amount };
    }
  },
  defaultState
);
export default register;
