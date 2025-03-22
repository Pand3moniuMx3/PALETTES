import supabase from "./supabase";

export async function getPalettes() {
  const { data, error } = await supabase
    .from("palettes")
    .select("*, palette_likes(count)")
    .order("count", {
      referencedTable: "palette_likes",
      ascending: true,
    });

  if (error) {
    console.error(error);
    throw new Error("Palettes could not be loaded");
  }

  console.log(data);

  return data;
}

export async function createPalette(newPalette) {
  const { data, error } = await supabase
    .from("palettes")
    .insert([newPalette])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Palette could not be created");
  }

  return data;
}

export async function deletePalette(paletteId) {
  const { error } = await supabase
    .from("palettes")
    .delete()
    .eq("id", paletteId);

  if (error) {
    console.error(error);
    throw new Error("Palette could not be deleted");
  }

  return true;
}

export async function toggleLikePalette(paletteId, userId) {
  // Check if the user already liked this palette
  const { data: existingLike, error: fetchError } = await supabase
    .from("palette_likes")
    .select("id")
    .eq("paletteId", paletteId)
    .eq("userId", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error(fetchError);
    throw new Error("Could not check existing like");
  }

  if (existingLike) {
    // Unlike the palette (delete the row)
    const { error: deleteError } = await supabase
      .from("palette_likes")
      .delete()
      .eq("id", existingLike.id);

    if (deleteError) {
      console.error(deleteError);
      throw new Error("Could not unlike the palette");
    }

    return { unliked: true };
  }

  // Insert new like record
  const { data, error } = await supabase
    .from("palette_likes")
    .insert([{ paletteId, userId }]);

  if (error) {
    console.error(error);
    throw new Error("Could not like the palette");
  }

  return { liked: true };
}

export async function fetchLikeCount(paletteId) {
  const { data, error } = await supabase
    .from("palette_likes")
    .select("id", { count: "exact" })
    .eq("paletteId", paletteId);

  if (error) {
    console.error(error);
    throw new Error("Could not fetch like count");
  }

  return data.length;
}

export async function hasUserLikedPalette(paletteId, userId) {
  if (!userId) return false; // Prevent unnecessary queries

  const { data, error } = await supabase
    .from("palette_likes")
    .select("id")
    .eq("paletteId", paletteId)
    .eq("userId", userId)
    .single(); // Single ensures we only get one row

  if (error && error.code !== "PGRST116") {
    console.error(error);
    throw new Error("Could not check like status");
  }

  return !!data; // Return true if data exists
}

export async function getLikes() {
  const { data, error } = await supabase.from("palette_likes").select("*");
  if (error) {
    console.error(error);
    throw new Error("Likes could not be loaded");
  }

  return data;
}
