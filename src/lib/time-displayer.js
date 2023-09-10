const timeDisplayer = (time, createdAt) => {
  return Number(time.split(":")[0])
    ? Number(time.split(":")[0]) < 24
      ? Number(time.split(":")[0]) + "h"
      : Number(time.split(":")[0]) < 24 * 30
      ? Number(time.split(":")[0] / 24).toFixed(0) + "d"
      : createdAt.split("T")[0]
    : Number(time.split(":")[1]) + "mins";
};

module.exports = timeDisplayer;
