// format time
export const fromatTime = (times) => {
  let min = Math.floor(times / 60);
  let sec = Math.floor(times - min * 60);

  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  return `Time Remaining ${min} : ${sec}`;
};
