const { where } = require('sequelize');
const {User} = require('../Models/index');
const {UserPreference} = require('../Models/index');


exports.getpreferneces = async (req, res, next) => {
    const {user} = req;
    try {
        const preferences = await UserPreference.findOne({where: {userId: user.id}});
        if (!preferences) {
            return res.status(404).json({message: "Not found"});
        }
        return res.status(200).json({preferences});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

exports.updatePreferences = async (req, res, next) => {
    const {user} = req;
    const preferences = await UserPreference.findOne({
        where:{
            userId: user.id,
        }
    });
    if (!preferences) {
        return res.status(404).json({message: "Not found"});
    }
    const {theme, notification, language} = req.body;
    
    try {
        await UserPreference.update({
            theme,
            notification,
            language,
        },
        {
            where: { userId: preferences.userId }
        },
    );
    return res.status(201).json(preferences);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}