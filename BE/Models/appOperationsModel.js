const Pet = require("../Schemas/MongoSchemas/petSchema");
const AppOperations = require("../Schemas/MongoSchemas/appOperationsSchema");


async function getWeeklyPetModel() {
    try {
        const currentDay = new Date().getDay();
        // console.log("currentDay: ", currentDay);
        let isRandomized = false;
        if (currentDay === 6 && !isRandomized) {
            isRandomized = !isRandomized;
            const weeklyPet = await assignRandomPet();
            // console.log("weeklyPet", weeklyPet);
            if (weeklyPet) return weeklyPet;
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function setArrOfPetsToBeEmpty() {
    await AppOperations.updateOne({ _id: "63c1743b3a53756dd37afc7e" }, { '$set': { petsOfTheWeek: [] } });
}

async function setArrOfPetsToDefaultValues() {
    const pets = await Pet.find({});
    const defaultArr = pets.map(() => "");
    console.log("defaultArr: ", defaultArr);
    await AppOperations.updateOne(
        { _id: "63c1743b3a53756dd37afc7e" },
        {
            '$push': {
                petsOfTheWeek: {
                    '$each': defaultArr,
                    '$position': 0
                }
            }
        });
}

async function getRandomPet(petsArr) {
    // const petsResolved = await petsArr;
    // const petsLength = petsResolved.length;
    const petsLength = petsArr.length;
    const maxRange = petsLength - 1;
    const randomPetID = Math.round(Math.random() * maxRange);
    return [petsArr[randomPetID], randomPetID];
}

async function updateRandomPet() {
    const pets = await Pet.find({});
    // let isExit = false;
    let randomPet = await getRandomPet(pets);
    console.log("randomPet: ", randomPet[0].name, randomPet[1]);
    const updatedRandomArr = await getArrayOfRandomPets();
    // התנאי שגודל המערך הרנדומלי קטן מגודל מערך החיות לא נכון מפני שההתנייה נעשית על פי מספר האיברים שערכם לא סטרינג ריק וזה מה שצריך לפתור
    while (updatedRandomArr.includes(randomPet[0].name) && updatedRandomArr.length < pets.length) {
        randomPet = await getRandomPet(pets);
        console.log("new randomPet inside while loop: ", randomPet[0].name, randomPet[1]);
    }
    // if (updatedRandomArr.length === pets.length) {
    //     setArrOfPetsToBeEmpty();
    //     setArrOfPetsToDefaultValues();
    // }
    await AppOperations.updateOne(
        { _id: "63c1743b3a53756dd37afc7e" },
        {
            '$push': {
                petsOfTheWeek: {
                    '$each': [randomPet[0].name],
                    '$position': randomPet[1]
                }
            }
        });
    return randomPet[0];
}

async function getArrayOfRandomPets() {
    const obj = await AppOperations.find({ _id: "63c1743b3a53756dd37afc7e" });
    console.log("randomArr: ", obj[0].petsOfTheWeek);
    if (obj[0].petsOfTheWeek) return obj[0].petsOfTheWeek;
}

async function assignRandomPet() {

    // setArrOfPetsToBeEmpty();
    // setArrOfPetsToDefaultValues();
    const updatedRandomPet = await updateRandomPet();
    return updatedRandomPet;
}

module.exports = {
    getWeeklyPetModel,
}