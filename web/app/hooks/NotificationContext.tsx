import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type NotificationState = {
  stack: {
    id: string;
    content: string;
    ttl: number;
  }[];
};
const initState: NotificationState = {
  stack: [],
};

const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: (...args: any) => any;
}>({});

const notificationReducer = (
  state: NotificationState,
  action: { type: string; payload?: any }
): NotificationState => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        stack: [
          ...state.stack,
          {
            id: crypto.randomUUID(),
            content: action.payload,
            ttl: 5,
          },
        ],
      };

    case "remove":
      return {
        ...state,
        stack: state.stack.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};

export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error("useNotificationContext must be inside of provider!");

  const { state, dispatch } = context;

  function addNotification(msg: string) {
    dispatch({
      type: "add",
      payload: msg,
    });
  }

  function removeNotification(id: string) {
    dispatch({
      type: "remove",
      payload: id,
    });
  }

  return {
    state,
    addNotification,
    removeNotification,
  };
}

export function NotificationProvider(props: any) {
  const [state, dispatch] = useReducer(notificationReducer, initState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <NotificationContext.Provider value={value} {...props} />;
}
