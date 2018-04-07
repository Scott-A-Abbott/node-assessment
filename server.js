const express = require('express')
    , bodyParser = require('body-parser')
    , usersCtrl = require('./usersCtrl');

const app = express();
app.use(bodyParser.json());


app.get('/api/users', usersCtrl.getAll)
app.get('/api/users/:id', usersCtrl.getById)
app.get('/api/admins', usersCtrl.getAdmins)
app.get('/api/nonadmins', usersCtrl.getNonAdmins)
app.get('/api/user_type/:type', usersCtrl.getByType)
app.put('/api/users/:id', usersCtrl.updateUser)
app.post('/api/users', usersCtrl.addUser)
app.delete('/api/users/:id', usersCtrl.delete)



port = 3000;
app.listen(port, console.log('listening on port 3000'));