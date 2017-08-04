/**
 * Created by kalte on 11/23/2016.
 */
const DB = require(__dirname + './../db');

module.exports = {
    remove: (id, callback) => {
        const query = 'DELETE FROM `message` WHERE `id` = ? limit 1';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    add: (userId, toUserId, text, callback) => {
        const query = 'INSERT INTO `message` (`id`, `id_user`, `to_id_user`, `text`, `read`,`create`)' +
            'VALUES (NULL, ?, ?, ?, ?,NULL)';
        const inserts = [userId, toUserId, text, 0];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },
    update: (id, text, callback) => {
        const query = 'UPDATE `message` SET `text` = ? WHERE `id` = ?';
        const inserts = [text, id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (message, callback) => {
        const query = 'SELECT * FROM `message` WHERE `id` = ? LIMIT 40';
        const inserts = [message.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },
    selectByUsers: (user, user2, callback) => {
        const query = 'SELECT `text`, `read`, `username`, `message`.`create` as `create` ' +
        ' from `message` inner join `user` ' +
        ' on `user`.`id` = `message`.`id_user` ' +
        ' WHERE (`id_user` = ? AND `to_id_user` = ?) OR (`id_user` = ? AND `to_id_user` = ?) ' +
        ' ORDER BY `message`.`create` ';
        const inserts = [user.id, user2.id, user2.id, user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            callback(null, rows);
        });
    },
    selectByUser: (user, callback) => {
        const query = 'SELECT * FROM `message` WHERE `id_user` = ? OR `to_id_user` = ? ORDER BY `create` LIMIT 40';
        const inserts = [user.id, user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },
    selectAllDialogs: (user, callback) => {
        const query = 'SELECT `text`, `read`, `message`.`create`,' +
            ' `from_user`.`username` as `from_username`, ' +
            '`to_user`.`username` as `to_username`' +
            ' FROM `message` ' +
            'inner join `user` as `from_user` ' +
            'on `from_user`.`id` = `message`.`id_user` ' +
            'inner join `user` as `to_user` ' +
            'on `to_user`.`id` = `message`.`to_id_user`' +
            ' WHERE `id_user` = ? or `to_id_user` = ? ' +
            'ORDER BY `message`.`create` desc LIMIT 1';
        const inserts = [user.id, user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            callback(null, rows);
        });
    }
};