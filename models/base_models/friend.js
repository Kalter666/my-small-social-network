/**
 * Created by kalte on 11/23/2016.
 */
const DB = require(__dirname + './../db');

module.exports = {
    add: (user1, user2, callback) => {
        let query = 'INSERT INTO `user_friend` (`id_user`, `id_friend`)' +
            'VALUES (?, ?)';
        const inserts = [user1.id, user2.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },
    remove: (user1, user2, callback) => {
        let query = 'DELETE FROM `user_friend` WHERE `id_user` = ? AND `id_friend` = ? LIMIT 1';
        const inserts = [user1.id, user2.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },
    isFriend: (user1, user2, callback) => {
        const query = 'SELECT * FROM `user_friend` WHERE `id_user` =? AND `id_friend` = ?';
        const inserts = [user1.id, user2.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            callback(null, true);
        });
    },
    myFriends: (user, callback) => {
        const query = 'SELECT `id`, `username` from `user_friend` inner join (`user`)' +
             'on `user`.id = `user_friend`.id_friend where `user_friend`.id_user = ?  ORDER BY `username`';
        const inserts = [user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            callback(null, rows);
        });
    },
    countFriends: (user, callback) => {
        const query = 'SELECT COUNT(*) as friends FROM `user_friend` where `user_friend`.id_user = ?;';
        const inserts = [user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows[0].friends);
        });
    },
    countAddings: (user, callback) => {
        const query = 'SELECT COUNT(*) as addingsfriend FROM `user_friend` where `user_friend`.id_friend = ?;';
        const inserts = [user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows[0].addingsfriend);
        });
    },
    myAddings: (user, callback) => {
        const query = 'SELECT `id`, `username` from `user_friend` inner join (`user`)' +
            'on `user`.id = `user_friend`.id_user where `user_friend`.id_friend = ? ORDER BY `username`';
        const inserts = [user.id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            callback(null, rows);
        });
    },
};