import { useState } from "react";
import Palette from "./Palette";
import Message from "./Message";
import "../styles/PaletteGrid.css";
import { useFilters } from "../hooks/useFilters";
import Badge from "./Badge";

const sortingOptions = ["most liked", "newest", "oldest"];

export default function PaletteGrid() {
  // palettes state
  const { filteredPalettes } = useFilters();
  const publicPalettes = filteredPalettes.filter((palette) => palette.isPublic);

  // sorting palettes
  const [sortBy, setSortBy] = useState("most liked");
  function toggleSort(newSort) {
    setSortBy((prev) => (prev === newSort ? prev : newSort));
  }

  let sortedPalettes = [...publicPalettes];
  if (sortBy === "most liked") {
    sortedPalettes.sort((a, b) => {
      const likesA = a.palette_likes[0]?.count || 0;
      const likesB = b.palette_likes[0]?.count || 0;
      return likesB - likesA; // Sorting in descending order (most likes first)
    });
  } else if (sortBy === "newest") {
    sortedPalettes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === "oldest") {
    sortedPalettes.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  // loading palettes in chunks instead of a full array
  const [loadAmount, setLoadAmount] = useState(24);
  const optimizedPalettes = sortedPalettes.slice(0, loadAmount);
  function loadMore() {
    setLoadAmount((prev) => prev + 24);
  }

  // flipping palettes
  const [flipped, setFlipped] = useState("");
  function handleToggleFlipped(id) {
    setFlipped((prevId) => (prevId === id ? "" : id));
  }

  if (filteredPalettes.length === 0)
    return <Message message={"That colour combo doesn't exist... yet"} />;

  return (
    <div className="palette-grid-container">
      <div className="sorting-options">
        {sortingOptions.map((option) => (
          <Badge
            customClass={`option ${option === sortBy && "selected"}`}
            onClick={() => toggleSort(option)}
          >
            {option}
          </Badge>
        ))}
      </div>
      <div className="palette-grid">
        {optimizedPalettes.map((palette) => (
          <Palette
            key={palette.id}
            palette={palette}
            flipped={flipped}
            handleToggleFlipped={handleToggleFlipped}
          />
        ))}
      </div>
      {filteredPalettes.length > loadAmount && (
        <button
          className={`btn secondary ${
            loadAmount >= sortedPalettes.length && "disabled"
          }`}
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
}
