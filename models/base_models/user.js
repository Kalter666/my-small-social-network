/**
 * Created by kalte on 11/22/2016.
 */
const DB = require(__dirname + './../db');
const mysql = require('mysql');
module.exports = {
    remove: (user, callback) => {
        const query = 'DELETE FROM `user` WHERE `id` = ? limit 1';
        const inserts = [user.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    all: callback => {
        const query = 'SELECT * FROM `user` ORDER BY `create` DESC LIMIT 40';
        DB.request(query, null, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(err, rows);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `user` WHERE `id` = ? limit 1';
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if(!rows[0]) return callback(err, false);
            const user = rows[0];
            return callback(err, user);
        });
    },
    selectByUsername: (username, callback) => {
        const query = 'SELECT * FROM `user` WHERE `username` = ? limit 1';
        const inserts = [username];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            return callback(err, rows[0]);
        });
    },
    update: (user, callback) => {
        let query = 'UPDATE user SET ';
        const inserts = [];
        const queryIns = [];
        if (user.pass) {
            inserts.push(user.pass);
            queryIns.push('`pass` = ?');
        }
        if (user.name) {
            inserts.push(user.name);
            queryIns.push('`name` = ?');
        }
        if (user.last_name) {
            inserts.push(user.last_name);
            queryIns.push('`last_name` = ?');
        }
        if (user.e_mail) {
            inserts.push(user.e_mail);
            queryIns.push('`e_mail` = ?');
        }
        if (user.website) {
            inserts.push(user.website);
            queryIns.push('`website` = ?');
        }
        query += queryIns.join(', ') + ' WHERE `id` = ? limit 1';
        inserts.push(user.id);
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    add: (user, callback) => {
        const query = 'INSERT INTO `user` (`id`, `username`, `pass`, `name`, `last_name`, `e_mail`,`pic`, `website`,`create`)' +
            "VALUES (NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL)";
        const inserts = [user.username, user.pass];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
};