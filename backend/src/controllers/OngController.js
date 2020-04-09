const crypto = require('crypto');

const generateUniqueId = require('../utils/generateUniqueId');

const connection = require('../database/connection');


exports.create = (req, res, next) => {
    const {name, email, whatsapp, city, uf} = req.body;

    const id = generateUniqueId();

    connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    }).then(result => {
        return res.json({ id });
    })
    .catch(err => {
        console.log(err);
    }); 
};

exports.index = (req, res, next) => {
    let ongs;

    connection('ongs')
    .select('*')
    .then(allOngs => {
        ongs = allOngs;
        return res.json(ongs);
    })
    .catch(err => console.log(err));    
};