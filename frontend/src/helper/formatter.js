// Function to truncate text
export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};


export const formatDateToWordFormat = (dateString) => {
  // Convert the input string into a Date object
  const date = new Date(dateString);

  // Define the options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };

  // Convert the date to the desired format and make it uppercase
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .toUpperCase()
    .replace(",", ","); // Ensure the comma is correct

  return formattedDate;
};
export const formatTimeTo12Hour = (timeString) => {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Combine hours, minutes, and period into the desired format
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};
