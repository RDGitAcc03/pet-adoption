const { getWeeklyPetModel } = require("../Models/appOperationsModel");


async function getWeeklyPet(req, res) {
    try {
        const weeklyPet = await getWeeklyPetModel();
        if (weeklyPet) res.status(200).send(weeklyPet);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    getWeeklyPet,
}