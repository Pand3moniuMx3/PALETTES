import { createContext, useEffect, useReducer, useState } from "react";
import { getPalettes } from "../services/apiPalettes";

const FilterContext = createContext();

const initialFilterContext = {
  lightness: "", // light, dark
  hue: "", // monochrome, coloured
  saturation: "", //vibrant, muted
  backgroundClr: "",
  mainClr: "",
  themeClr: "",
  lightClr: "",
  textClr: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "select/lightness":
      return {
        ...state,
        lightness: action.payload === state.lightness ? "" : action.payload,
      };
    case "select/hue":
      return {
        ...state,
        hue: action.payload === state.hue ? "" : action.payload,
      };
    case "select/saturation":
      return {
        ...state,
        saturation: action.payload === state.saturation ? "" : action.payload,
      };
    case "select/backgroundClr":
      return {
        ...state,
        backgroundClr: action.payload,
      };
    case "select/mainClr":
      return {
        ...state,
        mainClr: action.payload,
      };
    case "select/themeClr":
      return {
        ...state,
        themeClr: action.payload,
      };
    case "select/lightClr":
      return {
        ...state,
        lightClr: action.payload,
      };
    case "select/textClr":
      return {
        ...state,
        textClr: action.payload,
      };
    case "filters/clear":
      return {
        ...initialFilterContext,
      };
    default:
      throw new Error("unknown action");
  }
}

function FilterProvider({ children }) {
  const [
    {
      lightness,
      hue,
      saturation,
      backgroundClr,
      mainClr,
      themeClr,
      lightClr,
      textClr,
    },
    dispatch,
  ] = useReducer(reducer, initialFilterContext);

  // creating palettes array
  const [palettes, setPalettes] = useState([]);
  const [filteredPalettes, setFilteredPalettes] = useState([palettes]);

  useEffect(() => {
    getPalettes().then((data) => {
      setPalettes(data);
      setFilteredPalettes(data); // Set both states initially
    });
  }, []);

  // setting filters
  function selectLightness(option) {
    dispatch({ type: "select/lightness", payload: option });
  }
  function selectHue(option) {
    dispatch({ type: "select/hue", payload: option });
  }
  function selectSaturation(option) {
    dispatch({ type: "select/saturation", payload: option });
  }
  function setBackgroundColor(color) {
    dispatch({ type: "select/backgroundClr", payload: color });
  }
  function setMainColor(color) {
    dispatch({ type: "select/mainClr", payload: color });
  }
  function setThemeColor(color) {
    dispatch({ type: "select/themeClr", payload: color });
  }
  function setLightColor(color) {
    dispatch({ type: "select/lightClr", payload: color });
  }
  function setTextColor(color) {
    dispatch({ type: "select/textClr", payload: color });
  }

  // filtering palettes
  function handleFilterPalettes() {
    const filtered = palettes.filter((palette) => {
      return (
        (!lightness ||
          palette.lightness.toLowerCase() === lightness.toLowerCase()) &&
        (!hue || palette.hue.toLowerCase() === hue.toLowerCase()) &&
        (!saturation ||
          palette.saturation.toLowerCase() === saturation.toLowerCase()) &&
        (!backgroundClr ||
          palette.background.toLowerCase() === backgroundClr.toLowerCase()) &&
        (!mainClr || palette.main.toLowerCase() === mainClr.toLowerCase()) &&
        (!themeClr || palette.theme.toLowerCase() === themeClr.toLowerCase()) &&
        (!lightClr || palette.light.toLowerCase() === lightClr.toLowerCase()) &&
        (!textClr || palette.text.toLowerCase() === textClr.toLowerCase())
      );
    });
    setFilteredPalettes(filtered);
  }

  // resetting filters
  function handleResetFilters(e) {
    e.preventDefault();
    setFilteredPalettes(palettes); // Reset filteredPalettes, keep original data untouched
    dispatch({ type: "filters/clear" });
  }

  return (
    <FilterContext.Provider
      value={{
        lightness,
        hue,
        saturation,
        backgroundClr,
        mainClr,
        themeClr,
        lightClr,
        textClr,
        selectLightness,
        selectHue,
        selectSaturation,
        setBackgroundColor,
        setMainColor,
        setThemeColor,
        setLightColor,
        setTextColor,
        handleFilterPalettes,
        handleResetFilters,
        palettes,
        filteredPalettes,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
