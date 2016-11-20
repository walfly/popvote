export const chooseColor = (party) => {
  switch (party) {
    case "D":
      return "blue";
    case "R":
      return "red";
    default:
      return "purple";
  }
}

export const chooseColorText = (party) => {
  return `${chooseColor(party)}-text`;
}
