export const generateUniqueFileName = (bytes = 32) => {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return [...Array.from(array)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
