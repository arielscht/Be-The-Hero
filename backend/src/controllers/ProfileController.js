const connection = require('../database/connection');

exports.index = (req, res, next) => {
    const ong_id = req.headers.authorization;

    connection('incidents')
    .where('ong_id', ong_id)
    .select('*')
    .then(incidents => {
        return res.json(incidents);
    })
    .catch(err => console.log(err));

    

}