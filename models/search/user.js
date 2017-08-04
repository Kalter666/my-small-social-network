const DB = require(__dirname + './../db');
module.exports = {
    findUsers: (name, callback) => {
        const query = '(SELECT * FROM `user` WHERE ' +
           ' `username` = ? order by `username` limit 1) union ' +
        '(SELECT * FROM `user` WHERE ' +
            '`name` = ? order by `name` limit 1) union ' +
        '(SELECT * FROM `user` WHERE ' +
            '`last_name` = ? order by `name` limit 1)';
        const inserts = [name, name, name];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            return callback(null, rows);
        });
    }
};