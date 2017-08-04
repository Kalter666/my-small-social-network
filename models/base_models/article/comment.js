/**
 * Created by kalte on 12/12/2016.
 */
const DB = require(__dirname + './../../db');

module.exports = {
    add: (userId, articleId, text, callback) => {
        const query = 'INSERT INTO `article_comment` (`id`, `id_user`, `id_article`, `text`, `create`) ' +
            'VALUES (NULL, ?, ?, ?, NULL)';
        const inserts = [userId, articleId, text];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    remove: (id, callback) => {
        const query = 'DELETE FROM `article_comment` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    update: (id, text, callback) => {
        const query = 'UPDATE `article_comment` SET `text` = ? WHERE `id` = ?';
        const inserts = [text, id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `article_comment` WHERE `id` = ?';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    }
};