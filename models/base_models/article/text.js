/**
 * Created by kalte on 12/12/2016.
 */
const DB = require(__dirname + './../../db');

module.exports = {
    add: (userId, id_article, text, callback) => {
        const query = 'INSERT INTO `text` (`id`, `id_user`, `id_article`, `text`) ' +
            'VALUES (NULL, ?, ?, ?)';
        const inserts = [userId, id_article, text];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM `text` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    update: (id, text, callback) => {
        const query = 'UPDATE `text` SET `text` = ? WHERE `id` = ?';
        const inserts = [text, id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `text` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    }
};