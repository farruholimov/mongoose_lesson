module.exports = class HomeRoute{
    static async HomeGetController(req, res) {

        const ads = await req.db.ads.findAll({})

        res.render("index", {
            user: req.user,
            ads,
        });
    }
}