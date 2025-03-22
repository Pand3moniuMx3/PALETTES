import { useState } from "react";
import { useWorkshop } from "../hooks/useWorkshop";
import Palette from "../components/Palette";
import TextInput from "../components/TextInput";
import { useCreatePalette } from "../hooks/useCreatePalette";
import "../styles/Workshop.css";
// import { createPalette } from "../services/apiPalettes";

export default function Workshop() {
  // getting state from WorkshopContext
  const {
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
    isPublic,
    saturation,
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
  } = useWorkshop();

  const { createPalette, isCreating } = useCreatePalette();

  // creating palette object
  const palette = {
    title,
    author,
    createdAt,
    lightness,
    hue,
    saturation,
    background,
    main,
    theme,
    light,
    text,
    isPublic,
  };

  // flipping palettes
  const [flipped, setFlipped] = useState("");
  function handleToggleFlipped(id) {
    setFlipped((prevId) => (prevId === id ? "" : id));
  }

  // button disable condition
  function isValidHex(color) {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  }
  const filledOut =
    title &&
    lightness &&
    hue &&
    saturation &&
    isValidHex(background) &&
    isValidHex(main) &&
    isValidHex(text) &&
    (light ? isValidHex(light) : true) &&
    (theme ? isValidHex(theme) : true);

  // creating palette
  function handleCreate(e) {
    e.preventDefault();
    if (!filledOut || isCreating) return;
    createPalette(palette);
    console.log(palette);
  }

  // clear inputs
  function handleReset(e) {
    e.preventDefault();
    clearInputs();
  }

  return (
    <form className="workshop">
      <div className="sidebar">
        <h3>Create new palette</h3>
        <div className="selection-row">
          <b>Enter title</b>
          <TextInput value={title} onChange={setTitle} placeholder="title">
            <img src="/icons/user-icon.svg" alt="enter username" />
          </TextInput>
        </div>
        <div className="selection-row">
          <b>Colours</b>
          <div className="options-wrapper vertical">
            <TextInput
              placeholder="background"
              value={background}
              onChange={setBackground}
              incorrectCondition={background.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setBackground(e.target.value)}
                value={background}
              />
            </TextInput>
            <TextInput
              placeholder="main"
              value={main}
              onChange={setMain}
              incorrectCondition={main.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setMain(e.target.value)}
                value={main}
              />
            </TextInput>
            <TextInput
              placeholder="text"
              value={text}
              onChange={setText}
              incorrectCondition={text.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </TextInput>
            <TextInput
              placeholder="light (optional)"
              value={light}
              onChange={setLight}
              incorrectCondition={light.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setLight(e.target.value)}
                value={light}
              />
            </TextInput>
            <TextInput
              placeholder="theme (optional)"
              value={theme}
              onChange={setTheme}
              incorrectCondition={theme.length !== 7}
            >
              <input
                type="color"
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
              />
            </TextInput>
          </div>
        </div>
        <div className="selection-row">
          <b>Theme lightness</b>
          <div className="options-wrapper">
            <p
              className={`option ${lightness === "light" && "selected"}`}
              onClick={() => setLightness("light")}
            >
              Light
            </p>
            <p
              className={`option ${lightness === "dark" && "selected"}`}
              onClick={() => setLightness("dark")}
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
              onClick={() => setHue("monochrome")}
            >
              Monochrome
            </p>
            <p
              className={`option ${hue === "coloured" && "selected"}`}
              onClick={() => setHue("coloured")}
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
              onClick={() => setSaturation("vibrant")}
            >
              Vibrant
            </p>
            <p
              className={`option ${saturation === "muted" && "selected"}`}
              onClick={() => setSaturation("muted")}
            >
              Muted
            </p>
          </div>
        </div>
        <div className="selection-row">
          <b>Public status</b>
          <div className="options-wrapper">
            <p
              className={`option ${isPublic && "selected"}`}
              onClick={() => setPublicStatus(true)}
            >
              Public
            </p>
            <p
              className={`option ${!isPublic && "selected"}`}
              onClick={() => setPublicStatus(false)}
            >
              Private
            </p>
          </div>
        </div>
        <div className="btns-wrapper">
          <button className="btn secondary" onClick={handleReset}>
            Reset
          </button>
          <button
            className={`btn ${!filledOut && "disabled"}`}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
      <div className="preview-palette">
        <Palette
          palette={palette}
          flipped={flipped}
          handleToggleFlipped={handleToggleFlipped}
          customClass="custom-workshop-palette"
        />
      </div>
    </form>
  );
}
