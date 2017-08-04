/**
 * Created by kalte on 12/12/2016.
 */
const DB = require(__dirname + './../../db');

module.exports = {
    create: (userId, title, callback) => {
        const query = 'INSERT INTO `article` (`id`, `user_id`, `title`, `create`)' +
            'VALUES (NULL, ?, ?, NULL)';
        const inserts = [userId, title];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM `article` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    update: (id, title, callback) => {
        const query = 'UPDATE `article` SET `title` = ? WHERE `id` = ?';
        const inserts = [title, id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `article` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows[0]);
        });
    },
    selectByUser: (user, callback) => {
        const query = 'SELECT * FROM `article` WHERE `user_id` = ?';
        const inserts = [user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
};