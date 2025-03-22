const isColorLight = (hex) => {
  // Remove '#' if present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance using the formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If luminance is greater than 0.5, it's a light color
  return luminance > 0.5;
};

export default isColorLight;
