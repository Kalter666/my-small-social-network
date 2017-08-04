/**
 * Created by kalte on 11/26/2016.
 */
const DB = require(__dirname + './../db');

module.exports = {
    add: (userId, interestId, callback) => {
        let query = 'INSERT INTO `user_interest` (`id_user`, `id_interest`)' +
            'VALUES (?, ?)';
        const inserts = [userId, interestId];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    remove: (userId, interestId, callback) => {
        let query = 'DELETE FROM `user_interest` WHERE `id_user` = ? AND `id_interest` = ? limit 1';
        const inserts = [userId, interestId];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    }
};