export const getTime = () => {
  let message = "";
  const hours = new Date().getHours();
  if (hours <= 9) {
    message = "Good morning";
  } else if (hours <= 12) {
    message = "Good noon";
  } else if (hours <= 18) {
    message = "Good afternoon";
  } else {
    message = "Good night";
  }
  return message;
};
