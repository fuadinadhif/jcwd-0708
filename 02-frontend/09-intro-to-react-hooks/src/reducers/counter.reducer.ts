export function counterReducer(
  state: { counter: number; history: string[] },
  action: string
) {
  switch (action) {
    case "incrementByOne":
      return {
        counter: state.counter + 1,
        history: [...state.history, "Increment by 1"],
      };
    case "decrementByOne":
      return {
        counter: state.counter - 1,
        history: [...state.history, "Decrement By 1"],
      };
    case "incrementBy5":
      return {
        counter: state.counter + 5,
        history: [...state.history, "Increment By 5"],
      };
    case "decrementByFive":
      return {
        counter: state.counter - 5,
        history: [...state.history, "Decrement By 5"],
      };
    case "resetCounter":
      return {
        counter: 0,
        history: [...state.history, "Reset to 0"],
      };
    case "resetHistory":
      return {
        counter: state.counter,
        history: [],
      };
    default:
      throw new Error("Uknown action");
  }
}
