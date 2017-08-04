/**
 * Created by kalte on 12/12/2016.
 */
const DB = require(__dirname + './../../db');

module.exports = {
    add: (userId, id_article, file, callback) => {
        const query = 'INSERT INTO `file` (`id`, `id_article`, `id_user`, `file`) ' +
            'VALUES (NULL, ?, ?, ?)';
        const inserts = [userId, id_article, file];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM `file` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    update: (id, file, callback) => {
        const query = 'UPDATE `file` SET `file` = ? WHERE `id` = ?';
        const inserts = [text, id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `file` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    }
};