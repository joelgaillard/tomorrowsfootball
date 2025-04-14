export const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  let month = dateObj.toLocaleString("en", { month: "long" });
  month = month.charAt(0).toUpperCase() + month.slice(1);

  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  return `${day}${suffix} ${month}`;
};
