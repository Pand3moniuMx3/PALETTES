import { createContext, useReducer, useEffect } from "react";
import "../styles/Workshop.css";
import { getCurrentUser } from "../services/apiAuth";

const WorkshopContext = createContext();

const initialPaletteState = {
  title: "",
  createdAt: new Date(),
  background: "",
  main: "",
  theme: "",
  light: "",
  text: "",
  author: "",
  lightness: "",
  hue: "",
  saturation: "",
  isPublic: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "set/author":
      return {
        ...state,
        author: action.payload,
      };
    case "set/title":
      return {
        ...state,
        title: action.payload,
      };
    // setting features
    case "set/lightness":
      return {
        ...state,
        lightness: state.lightness === action.payload ? "" : action.payload,
      };
    case "set/hue":
      return {
        ...state,
        hue: state.hue === action.payload ? "" : action.payload,
      };
    case "set/saturation":
      return {
        ...state,
        saturation: state.saturation === action.payload ? "" : action.payload,
      };
    // setting colors
    case "set/background":
      return {
        ...state,
        background: action.payload,
      };
    case "set/main":
      return {
        ...state,
        main: action.payload,
      };
    case "set/theme":
      return {
        ...state,
        theme: action.payload,
      };
    case "set/light":
      return {
        ...state,
        light: action.payload,
      };
    case "set/text":
      return {
        ...state,
        text: action.payload,
      };
    // public status
    case "set/public-status":
      return {
        ...state,
        isPublic:
          state.isPublic === action.payload ? state.isPublic : action.payload,
      };
    // clear inputs
    case "clear-inputs":
      return {
        ...state,
        title: "",
        lightness: "",
        hue: "",
        saturation: "",
        background: "",
        main: "",
        text: "",
        light: "",
        theme: "",
      };
    default:
      throw new Error("unknown action");
  }
}

function WorkshopProvider({ children }) {
  const [
    {
      title,
      createdAt,
      background,
      main,
      theme,
      light,
      text,
      author,
      lightness,
      hue,
      saturation,
      isPublic,
    },
    dispatch,
  ] = useReducer(reducer, initialPaletteState);

  // initial palette setup and title
  function setTitle(title) {
    dispatch({ type: "set/title", payload: title });
  }

  // initial palette population
  useEffect(() => {
    getCurrentUser().then((user) => {
      const author = user.id;
      dispatch({ type: "set/author", payload: author });
    });
  }, []);

  // setting features
  function setLightness(lighntess) {
    dispatch({ type: "set/lightness", payload: lighntess });
  }
  function setHue(hue) {
    dispatch({ type: "set/hue", payload: hue });
  }
  function setSaturation(saturation) {
    dispatch({ type: "set/saturation", payload: saturation });
  }

  // selecting colors
  function setBackground(color) {
    dispatch({ type: "set/background", payload: color });
  }
  function setMain(color) {
    dispatch({ type: "set/main", payload: color });
  }
  function setTheme(color) {
    dispatch({ type: "set/theme", payload: color });
  }
  function setLight(color) {
    dispatch({ type: "set/light", payload: color });
  }
  function setText(color) {
    dispatch({ type: "set/text", payload: color });
  }

  // set public status
  function setPublicStatus(status) {
    dispatch({ type: "set/public-status", payload: status });
  }

  // clear inputs
  function clearInputs() {
    dispatch({ type: "clear-inputs" });
  }

  return (
    <WorkshopContext.Provider
      value={{
        title,
        createdAt,
        background,
        main,
        theme,
        light,
        text,
        author,
        lightness,
        hue,
        saturation,
        isPublic,
        setTitle,
        setLightness,
        setHue,
        setSaturation,
        setBackground,
        setMain,
        setTheme,
        setLight,
        setText,
        setPublicStatus,
        clearInputs,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
}

export { WorkshopContext, WorkshopProvider };
