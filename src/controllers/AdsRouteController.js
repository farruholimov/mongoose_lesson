const {
    AddAdsValidation
} = require("../modules/validations");
const path = require("path");
const { default: slugify } = require("slugify")

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

            const slug = slugify(title, {lower: true, strict: true, trim: true, replacement: "_"}) + Date.now()

            const newAd = await req.db.ads.create({
                ad_title: title,
                ad_price: price,
                ad_user_phone: phone,
                ad_category: category,
                ad_description: description,
                ad_photos: photosContainer,
                ad_slug: slug
            })

            console.log("NEW_AD", newAd);

            res.redirect('/ads/new_ad')
        } catch (error) {
            console.log(error);
            res.redirect('/ads/new_ad')
        }
    }

    static async AdsMoreGetController(req, res){
        try {
            const ad = await req.db.ads.findOne({
                where: {
                    ad_slug: req.params?.slug
                }
            })

            const category = await req.db.categories.findOne({
                where: {
                    category_id: ad.dataValues.ad_category
                }
            })
    
            console.log(category);
    
            res.render('ad_more', {
                ad,
                category,
                user: req.user
            })
        } catch (error) {
            console.log(error);
            res.redirect('/')
        }
    }
}