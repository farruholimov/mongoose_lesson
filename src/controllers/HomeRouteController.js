module.exports = class HomeRoute{
    static async HomeGetController(req, res) {

        const categories = await req.db.categories.findAll({})

        res.render("index", {
            user: req.user,
            categories,
        });
    }
}