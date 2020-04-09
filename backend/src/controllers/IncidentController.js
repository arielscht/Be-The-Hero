const connection = require('../database/connection');

exports.create = (req, res, next) => {
    const {title, description, valor} = req.body;
    const ong_id = req.headers.authorization;

    connection('incidents')
    .insert({
        title,
        description,
        valor,
        ong_id
    })
    .then(result => {
        return res.json({id: result[0]});
    })
};

exports.index = (req, res, next) => {
    const { page = 1 } = req.query;

    let incidentsQtd;

    connection('incidents')
    .count()
    .then(qtd => {
        incidentsQtd = qtd[0];
        res.header('x-Total-Count', incidentsQtd['count(*)']);
    })

    

    connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset( 5 * (page - 1))
    .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
    ])
    .then(allIncidents => {
        return res.json(allIncidents);
    })
    .catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    const ong_id = req.headers.authorization;

    connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first()
    .then(incident => {
        if(incident.ong_id !== ong_id) {
            console.log(incident.ong_id, '  ', ong_id);
           return res.status(401).json({id: id, status: "unauthorized user"});
        } else {
            connection('incidents')
            .where('id', id)
            .del()
            .then(result => {
                if(result) {
                    return res.status(204).send();
                }
            });
        }
    })
    .catch(err => console.log(err));

    
};