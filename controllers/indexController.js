async function getIndex(req, res) {
    console.log(req.user);
    res.render("index");
}

module.exports = {
    getIndex,
};
