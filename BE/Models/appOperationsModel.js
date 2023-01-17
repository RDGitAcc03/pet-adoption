const Pet = require("../Schemas/MongoSchemas/petSchema");
const AppOperations = require("../Schemas/MongoSchemas/appOperationsSchema");

async function getLastRandomPet() {
    const obj = await AppOperations.find({});
    const lastRandomPet = obj[0].lastRandomPet;
    console.log("getLastRandomPet: ", lastRandomPet.name);
    return lastRandomPet;
}

async function getWeeklyPetModel() {
    try {
        const currentDay = new Date().getDay();
        // console.log("currentDay: ", currentDay);
        let obj = await AppOperations.find({});
        let isRandomized = obj[0]?.isRandomized;
        if (currentDay === 2 && isRandomized === false) {
            isRandomized = true;
            console.log("It should be printed only once a day (&& once a week)");
            await setIsRandomized(isRandomized);
            const weeklyPet = await assignRandomPet();
            console.log("weeklyPet", weeklyPet);
            if (weeklyPet) return weeklyPet;
        }
        else if (currentDay === 3 && isRandomized) {
            isRandomized = false;
            await setIsRandomized(isRandomized);
        }
        else {
            const lastRandomPet = await getLastRandomPet();
            if (lastRandomPet) return lastRandomPet;
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function setIsRandomized(value) {
    await AppOperations.updateOne({ _id: "63c1743b3a53756dd37afc7e" }, { '$set': { isRandomized: value } })
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
    const petsLength = petsArr.length;
    const maxRange = petsLength - 1;
    const randomPetID = Math.round(Math.random() * maxRange);
    return [petsArr[randomPetID], randomPetID];
}

async function executeUpdateQuery(randomPet) {
    await AppOperations.updateOne(
        { _id: "63c1743b3a53756dd37afc7e" },
        {
            '$addToSet': {
                petsOfTheWeek: {
                    '$each': [(randomPet["_id"])]
                }
            }
        });
    // lastRandomPet
    await AppOperations.updateOne(
        { _id: "63c1743b3a53756dd37afc7e" },
        {
            '$set': {
                lastRandomPet: randomPet
            }
        });
}

async function updateRandomPet() {
    const pets = await Pet.find({});
    let randomPet = await getRandomPet(pets);
    console.log("randomPet: ", randomPet[0].name);
    const updatedRandomArr = await getArrayOfRandomPets();
    while (updatedRandomArr.includes(randomPet[0].name) && updatedRandomArr.length < pets.length) {
        randomPet = await getRandomPet(pets);
        console.log("new randomPet inside while loop: ", randomPet[0].name);
    }
    await executeUpdateQuery(randomPet[0]); // the actual change of the arr in the db
    console.log("updatedArr length is " + (updatedRandomArr.length + 1) + ", pets length is " + pets.length);
    if (updatedRandomArr.length === pets.length) {
        console.log("last pet in the set: ", updatedRandomArr[updatedRandomArr.length - 1]);
    }
    // setArrOfPetsToBeEmpty happens before executeUpdateQuery because of asynchronosity, therefore, 
    // setArrOfPetsToBeEmpty needs to be executed when the count is 1 over array.length
    if (updatedRandomArr.length + 1 === pets.length + 1) {
        console.log("array is now being reset.. ");
        setArrOfPetsToBeEmpty();
    }
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