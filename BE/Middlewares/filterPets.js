function filterPets(req, res, next) {
  const { name, height, weight} = req.body;
  
  for (let key in req.query) {
    if (req.query[key] === "" || req.query[key] === '0') {
      // console.log("current", req.query[key]);
      delete req.query[key];
    }
    console.log("req.query", req.query);

    if (height) {
      req.query.height = { $lte: Number(height) };
    }
    if (weight) {
      req.query.weight = { $lte: Number(weight) };
    }
    if (name) {
      req.query.name = { $regex: name, $options: "i" };
    }
  }
  next();
}
module.exports = { filterPets };
