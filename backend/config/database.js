//mongodb+srv://smithakunder42:hbSlvzkBkb6ELoZB@cluster0.hwcvpmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require('mongoose');

const username = encodeURIComponent('smithakunder42');
const password = encodeURIComponent('hbSlvzkBkb6ELoZB');
const clusterUrl = 'cluster0.hwcvpmn.mongodb.net';
const dbname = 'virtual_library';

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Successfully connected to the ${dbname} database`))
.catch((err) => console.error("Something went wrong when connecting to the database", err));