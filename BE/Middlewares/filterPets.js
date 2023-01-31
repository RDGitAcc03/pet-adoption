function filterPets(req, res, next) {
  const { name, height, weight } = req.query;

  console.log("params before ", req.query);

  for (let key in req.query) {
    if (req.query[key] === '' || req.query[key] === 0) {
      // console.log("current", req.query[key]);
      delete req.query[key];
    }
  }
  if (Number(height) === 0) { console.log("height equals 0"); req.query.height = { $gte: 0, $lte: 250 } }
  
  if (Number(height) > 0) { console.log("height is greater than 0"); req.query.height = { $gte: 0, $lte: Number(height) } }
  
  if (Number(weight) === 0) { console.log("wheight equals 0"); req.query.weight = { $gte: 0, $lte: 20 } }

  if (Number(weight) > 0) { console.log("weight is greater than 0"); req.query.weight = { $gte: 0, $lte: Number(weight) } }
  
  if (name) {req.query.name = { $regex: name, $options: "i" }}
  console.log("params after ", req.query);

  next();
}
module.exports = { filterPets };
