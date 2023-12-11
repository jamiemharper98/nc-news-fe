export const createDate = (date) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(Date.parse(date2) - Date.parse(date1)) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return `${daysPassed} days ago`; // on ${new Date(date).toLocaleDateString()}
};
