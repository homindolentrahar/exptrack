import { createContext, useReducer } from "react";

const initialState = {
  expenses: [
    {
      id: "c2731762-87eb-491e-9531-dd269db9aa43",
      name: "Commision",
      amount: 23,
      date: Date.now(),
    },
    {
      id: "c598efa9-cae8-4ceb-9717-29c81057293a",
      name: "Beli nasi",
      amount: -15,
      date: Date.now(),
    },
    {
      id: "07e765b8-6099-4c1f-9c46-c118be402aa4",
      name: "Bayar parkir",
      amount: -5,
      date: Date.now(),
    },
    {
      id: "1ae24123-a010-49da-8168-b019d28d2944",
      name: "Makan burjo",
      amount: -12,
      date: Date.now(),
    },
    {
      id: "6a1196b6-4b45-4348-80fd-3fc886f886f5",
      name: "Comission",
      amount: 34,
      date: Date.now(),
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "CREATE":
        return {
          ...state,
          expenses: [action.payload, ...state.expenses],
        };
      case "UPDATE":
        const updatedIndex = state.expenses.findIndex(
          (each) => each.id === action.payload.id
        );
        const expenses = state.expenses;
        const data = action.payload.expense;

        expenses[updatedIndex] = data;

        return {
          ...state,
          expenses: [...expenses],
        };
      case "DELETE":
        return {
          ...state,
          expenses: state.expenses.filter(
            (expense) => expense.id !== action.payload
          ),
        };
      default:
        return state;
    }
  }, initialState);

  const addExpense = (expense) => {
    dispatch({
      type: "CREATE",
      payload: expense,
    });
  };

  const updateExpense = (id, expense) => {
    dispatch({
      type: "UPDATE",
      payload: { id, expense },
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
