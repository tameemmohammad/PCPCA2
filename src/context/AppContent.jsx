import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer from "../reducer/AppReducer";
import { getToken, getDataset } from "../sevices/api";

const initialState = {
  activities: [],
  loading: true,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tokenRes = await getToken(
          "activities"
        );

        const data = await getDataset(
          tokenRes.token,
          tokenRes.dataUrl
        );

        dispatch({ type: "SET_ACTIVITIES", payload: data });
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <AppContext.Provider value={{ activities: state.activities }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);