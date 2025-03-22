import { useState } from "react";
import { useFilters } from "../hooks/useFilters";
import "../styles/PaletteFilters.css";
import TextInput from "./TextInput";

export default function PaletteFilters() {
  const {
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
    handleResetFilters,
    handleFilterPalettes,
  } = useFilters();

  // opening filters on mobile
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // handle apply
  function handleApply(e) {
    e.preventDefault();
    handleFilterPalettes();
    setIsFiltersOpen(false);
  }

  return (
    <>
      <button
        className={`btn secondary filters-btn ${!isFiltersOpen && "visible"}`}
        onClick={() => setIsFiltersOpen(true)}
      >
        Filters
      </button>
      <form className={`filters ${isFiltersOpen && "open"}`}>
        <div className="heading-container">
          <h3>Filters</h3>
          <img
            src="/icons/close-icon.svg"
            alt="close filters"
            onClick={() => setIsFiltersOpen(false)}
          />
        </div>
        <div className="selection-row">
          <b>Theme lightness</b>
          <div className="options-wrapper">
            <p
              className={`option ${lightness === "light" && "selected"}`}
              onClick={() => selectLightness("light")}
            >
              Light
            </p>
            <p
              className={`option ${lightness === "dark" && "selected"}`}
              onClick={() => selectLightness("dark")}
            >
              Dark
            </p>
          </div>
        </div>
        <div className="selection-row">
          <b>Hue variety</b>
          <div className="options-wrapper">
            <p
              className={`option ${hue === "monochrome" && "selected"}`}
              onClick={() => selectHue("monochrome")}
            >
              Monochrome
            </p>
            <p
              className={`option ${hue === "coloured" && "selected"}`}
              onClick={() => selectHue("coloured")}
            >
              Coloured
            </p>
          </div>
        </div>
        <div className="selection-row">
          <b>Saturation</b>
          <div className="options-wrapper">
            <p
              className={`option ${saturation === "vibrant" && "selected"}`}
              onClick={() => selectSaturation("vibrant")}
            >
              Vibrant
            </p>
            <p
              className={`option ${saturation === "muted" && "selected"}`}
              onClick={() => selectSaturation("muted")}
            >
              Muted
            </p>
          </div>
        </div>
        <div className="selection-row">
          <b>Colours</b>
          <div className="options-wrapper vertical">
            <TextInput
              placeholder="background"
              value={backgroundClr}
              onChange={setBackgroundColor}
              incorrectCondition={backgroundClr.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setBackgroundColor(e.target.value)}
                value={backgroundClr}
              />
            </TextInput>
            <TextInput
              placeholder="main"
              value={mainClr}
              onChange={setMainColor}
              incorrectCondition={mainClr.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setMainColor(e.target.value)}
                value={mainClr}
              />
            </TextInput>
            <TextInput
              placeholder="theme"
              value={themeClr}
              onChange={setThemeColor}
              incorrectCondition={themeClr.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setThemeColor(e.target.value)}
                value={themeClr}
              />
            </TextInput>
            <TextInput
              placeholder="light"
              value={lightClr}
              onChange={setLightColor}
              incorrectCondition={lightClr.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setLightColor(e.target.value)}
                value={lightClr}
              />
            </TextInput>
            <TextInput
              placeholder="text"
              value={textClr}
              onChange={setTextColor}
              incorrectCondition={textClr.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setTextColor(e.target.value)}
                value={textClr}
              />
            </TextInput>
          </div>
        </div>
        <div className="btns-wrapper">
          <button className="btn secondary" onClick={handleResetFilters}>
            Reset
          </button>
          <button className="btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </form>
    </>
  );
}
