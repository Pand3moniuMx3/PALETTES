import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useFilters } from "../hooks/useFilters";
import "../styles/Profile.css";
import Palette from "./Palette";
import Message from "./Message";
import Loader from "./Loader";

export default function Saved() {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const { palettes } = useFilters();

  // user data
  const { user, isLoading } = useUser();

  // flipping palettes
  const [flipped, setFlipped] = useState("");
  function handleToggleFlipped(id) {
    setFlipped((prevId) => (prevId === id ? "" : id));
  }

  // displayed array
  let array;
  if (activeTab === "bookmarks") {
    array = palettes.filter((palette) =>
      user.user_metadata.bookmarks.includes(palette.id)
    );
  }
  if (activeTab === "personal") {
    array = palettes.filter((palette) => palette.author === user.id);
  }

  if (isLoading) return <Loader height="100vh" />;

  if (user && !isLoading)
    return (
      <div className="saved">
        <div className="selection">
          <img
            src="/icons/bookmark-icon.svg"
            alt="see bookmarks"
            onClick={() => setActiveTab("bookmarks")}
          />
          <img
            src="/icons/user-icon.svg"
            alt="see liked"
            onClick={() => setActiveTab("personal")}
          />
          <span
            className="indicator"
            style={{
              inset:
                activeTab === "bookmarks"
                  ? "34px 50% 0px 0px"
                  : "34px 0px 0px 50%",
            }}
          />
        </div>
        {array.length > 0 && (
          <div className="palette-grid">
            {array.map((palette) => (
              <Palette
                key={palette.id}
                palette={palette}
                flipped={flipped}
                handleToggleFlipped={handleToggleFlipped}
              />
            ))}
          </div>
        )}
        {array.length === 0 && <Message message="No Palettes" />}
      </div>
    );
}
