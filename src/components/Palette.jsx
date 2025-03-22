import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchLikeCount } from "../services/apiPalettes";
import { useLike } from "../hooks/useLike";
import { useBookmark } from "../hooks/useBookmark";
import { useDeletePalette } from "../hooks/useDeletePalette";
import { useUser } from "../hooks/useUser";
import { useNotification } from "../hooks/useNotification";
import isColorLight from "../utils/isColorLight";
import "../styles/Palette.css";

export default function Palette({
  palette,
  flipped,
  handleToggleFlipped,
  customClass,
}) {
  return (
    <div
      className={`palette ${customClass}`}
      onClick={() => handleToggleFlipped(palette.id)}
    >
      <Actions palette={palette} />
      {flipped !== palette.id && <PalettePreview palette={palette} />}
      {flipped === palette.id && <PaletteColors palette={palette} />}
    </div>
  );
}

function PalettePreview({ palette }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // destructuring
  const title = palette.title;
  const backgroundClr = palette.background;
  const mainClr = palette.main;
  const themeClr = palette.theme;
  const lightClr = palette.light;
  const textClr = palette.text;

  return (
    <div className="preview" style={{ background: backgroundClr }}>
      <h3
        style={{
          color:
            !isColorLight(backgroundClr) && !isColorLight(mainClr)
              ? textClr
              : mainClr,
        }}
      >
        {title ? title : "New title"}
      </h3>
      <p style={{ color: textClr }}>
        {screenWidth >= 650
          ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
        ante purus, sit amet porta nunc egestas sit amet. Cras non luctus lacus.
        Sed sodales justo id lacus consequat, non elementum urna egestas. Sed
        tortor odio, varius sed odio a, lacinia efficitur tortor. Donec dictum
        iaculis sapien, eget porttitor mi.`
          : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
        ante purus, sit amet porta nunc egestas sit amet.`}
      </p>
      <div className="btn-wrapper">
        <button
          className="preview-btn"
          style={{
            background: themeClr || mainClr,
            color: isColorLight(themeClr)
              ? isColorLight(mainClr)
                ? textClr
                : mainClr
              : backgroundClr,
          }}
        >
          Primary
        </button>
        <button
          className="preview-btn secondary"
          style={{ borderColor: lightClr, color: textClr }}
        >
          Secondary
        </button>
      </div>
    </div>
  );
}

function PaletteColors({ palette }) {
  const { notify } = useNotification();

  const [copied, setCopied] = useState("");
  function copyToClipboard(e, colorType, colorHex) {
    e.stopPropagation();
    navigator.clipboard.writeText(colorHex);
    setCopied(colorType);
    notify(`Copied ${colorHex} to clipboard`, "positive");

    setTimeout(() => setCopied(""), 3000);
  }

  // destructuring
  const backgroundClr = palette.background;
  const mainClr = palette.main;
  const themeClr = palette.theme;
  const lightClr = palette.light;
  const textClr = palette.text;

  return (
    <div className="colors">
      <div
        className="color"
        style={{
          background: backgroundClr,
          borderRight: !backgroundClr && "1px solid var(--clr-light)",
          borderBottom: !backgroundClr && "1px solid var(--clr-light)",
        }}
      >
        <p>{copied === "background" ? "copied" : "background"}</p>
        <p>{backgroundClr}</p>
        <img
          src="/icons/copy-icon.svg"
          alt="copy hex code"
          className="copy-icon"
          onClick={(e) => copyToClipboard(e, "background", backgroundClr)}
        />
      </div>
      <div
        className="color"
        style={{
          background: mainClr,
          borderBottom: !mainClr && "1px solid var(--clr-light)",
        }}
      >
        <p>{copied === "main" ? "copied" : "main"}</p>
        <p>{mainClr}</p>
        <img
          src="/icons/copy-icon.svg"
          alt="copy hex code"
          className="copy-icon"
          onClick={(e) => copyToClipboard(e, "main", mainClr)}
        />
      </div>
      <div
        className="color"
        style={{
          background: textClr,
          borderRight: !textClr && !lightClr && "1px solid var(--clr-light)",
        }}
      >
        <p>{copied === "text" ? "copied" : "text"}</p>
        <p>{textClr}</p>
        <img
          src="/icons/copy-icon.svg"
          alt="copy hex code"
          className="copy-icon"
          onClick={(e) => copyToClipboard(e, "text", textClr)}
        />
      </div>
      {lightClr && (
        <div
          className="color"
          style={{
            background: lightClr,
            borderRight: !lightClr && "1px solid var(--clr-light)",
          }}
        >
          <p>{copied === "light" ? "copied" : "light"}</p>
          <p>{lightClr}</p>
          <img
            src="/icons/copy-icon.svg"
            alt="copy hex code"
            className="copy-icon"
            onClick={(e) => copyToClipboard(e, "light", lightClr)}
          />
        </div>
      )}
      {themeClr && (
        <div className="color" style={{ background: themeClr }}>
          <p>{copied === "theme" ? "copied" : "theme"}</p>
          <p>{themeClr}</p>
          <img
            src="/icons/copy-icon.svg"
            alt="copy hex code"
            className="copy-icon"
            onClick={(e) => copyToClipboard(e, "theme", themeClr)}
          />
        </div>
      )}
    </div>
  );
}

function Actions({ palette }) {
  const { user } = useUser();
  const userId = user?.id;
  const paletteId = palette.id;
  const isPublic = palette.isPublic;
  const author = palette.author;
  const { toggleLike, hasLiked } = useLike(paletteId, userId);
  const { toggleBookmark, isBookmarked } = useBookmark(paletteId, user);
  const { deletePalette } = useDeletePalette();

  const { data: likes = 0 } = useQuery(["likes", paletteId], () =>
    fetchLikeCount(paletteId)
  );

  function handleLike(e) {
    e.stopPropagation();
    if (!userId) {
      alert("You must be logged in to like a palette");
      return;
    }
    toggleLike();
  }

  function handleBookmark(e) {
    e.stopPropagation();
    if (!userId) {
      alert("You must be logged in to bookmark a palette");
      return;
    }
    toggleBookmark();
  }

  function handleDelete(e) {
    e.stopPropagation();
    console.log(
      "Delete button clicked, attempting to delete palette",
      paletteId
    );
    deletePalette(paletteId);
  }

  return (
    <div className="actions">
      {Number(likes) >= 1 && <p style={{ fontSize: "12px" }}>{likes}</p>}
      {isPublic && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleLike}
        >
          <g id="Mid Heart Icon">
            <path
              id="Heart"
              d="M1 4.55882C1 9.91177 8 14.5 8 14.5C8 14.5 15 9.91177 15 4.55882C15 2.26471 13.4444 1.5 11.8889 1.5C8.77778 1.5 8 5.01765 8 5.01765C8 5.01765 7.22222 1.5 4.11111 1.5C2.55556 1.5 1 2.26471 1 4.55882Z"
              stroke="black"
              stroke-linejoin="round"
              fill={hasLiked ? "black" : "none"}
            />
          </g>
        </svg>
      )}
      {isPublic && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Mid Bookmark Icon">
            <path
              id="Bookmark"
              d="M2.5 15V1H13.5V15L8 10.3333L2.5 15Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill={isBookmarked ? "black" : "white"}
              onClick={handleBookmark}
            />
          </g>
        </svg>
      )}
      {author === userId && (
        <img
          src="/icons/trash-icon.svg"
          alt="delete palette"
          onClick={handleDelete}
        />
      )}
    </div>
  );
}
