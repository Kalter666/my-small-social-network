/**
 * Created by kalte on 12/10/2016.
 */
const User = require(__dirname + './../base_models/user');


function testSelectAll() {
    User.all( (err, users) => {
        if(err) {
            console.log(err);
        }
        console.log(users);
    });
}

function select() {
    User.selectByUsername('stas', (err, user) => {
        if(err) {
            console.log(err);
        }
        console.log(user);
    });
}

function update() {
    user = {
        id: 1,
        username: 'LOlex',
        pass: '321',
        name: 'Lol',
        lastName: 'Lolse',
        eMail: 'Xabec.com',
        website: 'keads.com'
    };
    User.update(user, (err, rows) => {
        if (err) console.log(err);
    });
}


function addInfo() {
    user = {
        id: 1,
        name: 'Lol',
        lastName: 'Lolse',
        eMail: 'Xabec.com',
        website: 'keads.com'
    };
    User.addInfo(user, (err) => {
        if(err) console.log(err)
    });
}

function add() {
    user = {
        username: 'kek',
        pass: '123'
    };
    User.add(user, (err) => {
        if(err) console.log(err);
    });
}

const updateInfo = () => {
    user = {
        id: 1,
        name: 'kek',
        lastName: 'kek',
        eMail: 'kek',
        website: 'kek'
    };
    User.updateInfo(user, (err) => {
        if(err) console.log(err)
    });
};

const selectId =() => {
    User.select(1, (err, user) => {
        if (err) console.log(err);
        console.log(user);
    });
};
//selectId();
//add();
//update();
//testSelectAll();
select();
//addInfo();

//updateInfo();

const selectInfo = () => {
    User.selectWithInfoByUsername('kek', (err, rows) => {
        if (err) console.log(err);
        console.log(rows);
    });
};

//selectInfo();