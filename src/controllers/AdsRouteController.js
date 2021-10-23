const {
    AddAdsValidation
} = require("../modules/validations");
const path = require("path");

module.exports = class AdsRouteController {
    static async AdsGetController(req, res) {

        const categories = await req.db.categories.findAll({})
        
        res.render("add_ads", {
            user: req.user,
            categories,
        })
    }
    static async AdsPostController(req, res) {
        try {

            const {
                title,
                price,
                category,
                phone,
                description
            } = await AddAdsValidation(req.body);

            if (!(title && price && category && phone && description)) {
                throw new Error("Invalid content")
            }

            let photosContainer = []
            let photoName

            if (Array.isArray(req.files.photos)) {
                for (let photo of req.files.photos) {
                    photoName = photo.md5 + ".jpg";

                    photo.mv(path.join(__dirname, "..", "public", "uploads", photoName))

                    photosContainer.push(photoName)
                }
            } else {
                photoName = req.files.photos.md5 + ".jpg";
                req.files.photos.mv(path.join(__dirname, "..", "public", "uploads", photoName))
                photosContainer.push(photoName);
            }


            const newAd = await req.db.ads.create({
                ad_title: title,
                ad_price: price,
                ad_user_phone: phone,
                ad_category: category,
                ad_description: description,
                ad_photos: photosContainer
            })

            console.log("NEW_AD", newAd);

            res.redirect('/ads/new_ad')
        } catch (error) {
            console.log(error);
            res.redirect('/ads/new_ad')
        }
    }
}