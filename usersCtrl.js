let data = require('./userData.json');
module.exports = {
    getAll: (req, res, next) => {
        let {query} = req;
        switch(true){
            case ('age' in query):
                res.status(200).send(data.filter(e => e.age < query.age))
                break;
            case ('lastname' in query):
                res.status(200).send(data.filter(e => e["last_name"] === query.lastname))
                break;
            case ('email' in query):
                res.status(200).send(data.filter(e => e.email === query.email))
                break;
            case ('favorites' in query):
                res.status(200).send(data.filter(e => e.favorites.indexOf(query.favorites) !== -1))
                break;
            default: res.status(200).send(data);
        }
    },
    getById: (req, res, next) => {
        let id = req.params;
        let user = data.find(e => e.id === Number(id.id))
        if (user === undefined){
            console.log(user);
            res.status(404).send('null')
        }
        res.status(200).send(user)
    },
    getAdmins: (req, res, next) => {
        res.status(200).send(data.filter(e => e.type === 'admin'));
    },
    getNonAdmins: (req, res, next) => res.status(200).send(data.filter(e => e.type !== 'admin')),
    getByType: (req, res, next) => {
        let type = req.params;
        res.status(200).send(data.filter(e => e.type === type.type))
    },
    updateUser: (req, res, next) => {
        let {id} = req.params;
        let index = data.findIndex(e => e.id == +id)
        if(index !== -1){
            data[index] = req.body;
            res.status(200).send(data);
        } else { res.status(404).send() }
    },
    addUser: (req, res, next) => {
        let newUser = Object.assign({}, req.body, {id: +data[data.length-1].id + 1})
        data.push(newUser);
        res.status(200).send(data);
    },
    delete: (req, res, next) => {
        let {id} = req.params;
        let index = data.findIndex(e => e.id === +id)
        data.splice(index, 1);
        res.status(200).send(data);
    }
}