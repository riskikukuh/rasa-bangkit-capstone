const TimeUtil = {
  getDateNow: () => {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return utcMilllisecondsSinceEpoch;
  },
};

module.exports = TimeUtil;
