const connection= require('../database/connection');

exports.create = (req, res, next) => {
    const { id } = req.body;

    connection('ongs')
    .where('id', id)
    .select('name')
    .first()
    .then(ong => {
        if(!ong) {
            return res.status(400).json({error: 'No ONG found with this ID'});
        } else {
            return res.json(ong);
        }
    });
};