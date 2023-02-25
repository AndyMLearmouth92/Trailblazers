module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs", { user: req.user });
  },
};
// Get request which passes the information into the response and tells the view to render in the index.ejs.
