export const initials = (name?: string) => {
  if (!name) {
    return "";
  }

  const split = name.split(" ");

  let initials: string;
  if (split.length > 1) {
    initials = split[0].slice(0, 1) + split[1].slice(0, 1);
  } else {
    initials = split[0].slice(0, 1);
  }

  return initials.toUpperCase();
};
