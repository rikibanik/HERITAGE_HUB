const {validationResult} = require('express-validator');
const venueService = require('../services/venueService');
const {s3Uploadv3} = require('../services/s3service');


module.exports.addVenue = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
        console.log("Error 1");
        return res.status(400).json({ error: "Image file is required" });
    }

    try {
       
        const imgData = await s3Uploadv3(req.file);

        // If the structure has a 'Location' key, it should be accessed here
        const imgLink = imgData.Location || imgData.result?.Location;

        if (!imgLink) {
            return res.status(500).json({ error: "Failed to retrieve image link from S3" });
        }
        const venue = {
            name: req.body.name,
            typeofVenue: req.body.typeofVenue,
            location: {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pin: req.body.pin
            },
            description: {
                line: req.body.line,
                elaborated: req.body.elaborated
            },
            fare: {
                indianAdult: req.body.indianAdult,
                indianChild: req.body.indianChild,
                foreignAdult: req.body.foreignAdult,
                foreignChild: req.body.foreignChild
            },
            workingHours: {
                opening: {
                    hour: req.body.openingHour,
                    minute: req.body.openingMinute
                },
                closing: {
                    hour: req.body.closingHour,
                    minute: req.body.closingMinute
                }
            },
            workingsDays: req.body.workingDays,
            phNo: req.body.phNo,
            email: req.body.email,
            imgLink: imgLink
             // Use the correct field from S3
        };

        const result = await venueService.addVenue(venue);
        res.status(201).json({result});
    } catch (error) {
        console.error("Error uploading venue:", error);
        res.status(500).json({ error: "Failed to upload venue" });
    }
};


module.exports.getAllVenue = async (req,res)=>{
    const user = req.user;
    console.log(user);
    const id = user._id;
    try{
        const result = await venueService.getAllVenue();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
    
};