const getHome = (req, res, next) => {
  res.send("This is home get route from back-end");
};

module.exports = {
  getHome,
};
