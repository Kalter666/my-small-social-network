/**
 * Created by kalte on 11/26/2016.
 */
const DB = require(__dirname + './../db');

module.exports = {
    remove: (interestId, callback) => {
        let query = 'DELETE FROM `interest` WHERE `id` = ? limit 1';
        const inserts = [interestId];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    add: (title, callback) => {
        let query = 'INSERT INTO `interest` (`id`, `title`)' +
            'VALUES (NULL, ?)';
        const inserts = [title];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        let query = 'SELECT * FROM `interest` WHERE `id` = ? limit 1';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    }
};