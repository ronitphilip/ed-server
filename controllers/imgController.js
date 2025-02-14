const images = require('../models/imageModel')

// add new image
exports.addImagesController = async (req, res) => {
    console.log("Inside addImagesController");
    const { collegename, imageArray} = req.body;
    
    try{
        existingCollege  = await images.findOne({collegename})
        if(existingCollege){
            res.status(406).json('Collage already added!')
        }else{
            const newImages = new images({
                collegename, imageArray
            })
            await newImages.save()
            res.status(200).json(newImages)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get all images
exports.allImagesController = async (req, res) => {
    console.log('Inside allImagesController');
    
    try {
        const imageData = await images.find()
        res.status(200).json(imageData)
    }catch(err){
        res.status(406).json(err)
    }
}