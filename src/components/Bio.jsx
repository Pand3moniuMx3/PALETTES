import { useState } from "react";
import { useUser } from "../hooks/useUser";
import Badge from "../components/Badge";
import "../styles/Profile.css";
import { useUpdateUser } from "../hooks/useUpdateUser";

export default function Bio() {
  const { user, isLoading } = useUser();

  // editing/preview mode
  const [viewMode, setViewMode] = useState("preview");

  if (user && !isLoading)
    return (
      <>
        {viewMode === "preview" && <PreviewView setViewMode={setViewMode} />}
        {viewMode === "edit" && <EditView setViewMode={setViewMode} />}
      </>
    );
}

function PreviewView({ setViewMode }) {
  const { user } = useUser();

  // formatting dates
  function formatDate(date) {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // destructuring
  const avatar = user.user_metadata.avatar;
  const username = user.user_metadata.username;
  const email = user.user_metadata.email;
  const occupation = user.user_metadata.occupation;
  const createdAt = formatDate(user.created_at);

  return (
    <div className="bio">
      <div className="img-wrapper">
        <img src={avatar} />
      </div>
      <div className="info-wrapper">
        <h3>{username}</h3>
        <Badge>Member since {createdAt}</Badge>
        <div className="info-grid">
          <div className="row">
            <p>Email:</p>
            <b>{email}</b>
          </div>
          <div className="row">
            <p>Occupation:</p>
            <b>{occupation}</b>
          </div>
        </div>
        <div className="btn-wrapper">
          <button className="btn" onClick={() => setViewMode("edit")}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

function EditView({ setViewMode }) {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  // destructuring
  const avatar = user.user_metadata.avatar;
  const username = user.user_metadata.username;
  const email = user.user_metadata.email;
  const occupation = user.user_metadata.occupation;

  // state for updated info
  const [newAvatar, setNewAvatar] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newOccupation, setNewOccupation] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // handle submit changes
  async function handleSubmit() {
    updateUser({
      newAvatar: newAvatar || undefined,
      newUsername: newUsername || user.user_metadata.username,
      newOccupation: newOccupation || user.user_metadata.occupation,
      newPassword: newPassword || undefined,
    });
  }

  return (
    <div className="bio">
      <div className="img-wrapper">
        <label for="file-upload" className="custom-file-upload">
          {newAvatar ? "File selected" : "Upload file"}
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={(e) => setNewAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </div>
      <div className="info-wrapper">
        <div className="info-grid">
          <div className="row">
            <p>Username:</p>
            <input
              type="text"
              placeholder={username}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div className="row" style={{ background: "var(--clr-light)" }}>
            <p>Email:</p>
            <input type="text" placeholder={email} disabled />
          </div>
          <div className="row">
            <p>Occupation:</p>
            <input
              type="text"
              placeholder={occupation}
              value={newOccupation}
              onChange={(e) => setNewOccupation(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div className="row">
            <p>Password:</p>
            <input
              type="text"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isUpdating}
            />
          </div>
        </div>
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={() => {
              setViewMode("preview");
              handleSubmit();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
