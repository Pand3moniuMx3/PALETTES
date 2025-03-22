import supabase from "./supabase";

export async function signup({ username, occupation, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: "",
        occupation,
        bookmarks: [],
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  newAvatar,
  newUsername,
  newOccupation,
  newPassword,
}) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  const userId = userData.user.id;
  let avatarUrl = userData.user.user_metadata.avatar;

  if (newAvatar) {
    const fileName = `avatar-${userId}`;
    const { error: storageError } = await supabase.storage
      .from("pfps")
      .upload(fileName, newAvatar, { upsert: true });

    if (storageError) throw new Error(storageError.message);

    // Append a timestamp to prevent caching issues
    const cacheBuster = Date.now();
    avatarUrl = `https://stfncsgsbcfkcofwxkri.supabase.co/storage/v1/object/public/pfps/${fileName}?t=${cacheBuster}`;
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
    data: {
      username: newUsername,
      occupation: newOccupation,
      avatar: avatarUrl,
    },
  });

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function toggleBookmark(newBookmark) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  const user = userData.user;
  const currentBookmarks = user.user_metadata?.bookmarks || [];

  let updatedBookmarks;

  if (currentBookmarks.includes(newBookmark)) {
    // if already bookmarked, remove it
    updatedBookmarks = currentBookmarks.filter((id) => id !== newBookmark);
  } else {
    // if not bookmarked, add it
    updatedBookmarks = [...currentBookmarks, newBookmark];
  }

  const { data, error: bookmarkError } = await supabase.auth.updateUser({
    data: { bookmarks: updatedBookmarks },
  });

  if (bookmarkError) throw new Error(bookmarkError.message);

  return data?.user;
}
