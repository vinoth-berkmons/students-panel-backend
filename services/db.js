const { MongoClient } = require("mongodb");

let client;

const connectToDb = (uri) => new Promise((resolve, reject) => {
    const clientWithConnection = new MongoClient(uri);
    clientWithConnection.connect().
        then(mongoClient => {
            client = mongoClient;
            resolve();
        }).
        catch(err => {
            reject(`Error connecting to MongoDB: ${err}`);
        });
});

module.exports = {
    connect: connectToDb,
    client: function () {
        return client;
    },
};