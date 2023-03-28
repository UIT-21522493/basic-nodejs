import pool from "../configs/connnetDB"

let getHomepage = async (req, res) => {
    // let data = [];
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function (err, results, fields) {
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName
    //             })
    //         });
    //         // return res.render('index.ejs', { dataUser: (data) })
    //     })
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows, test: 'abc strign test' });

    console.Console.log('>>>>check rows:', rows)
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
    //console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    console.log('check: ', req.body)
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)',
        [firstName, lastName, email, address]);
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [id])
    return res.render('update.ejs', { dataUser: user })
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName= ?, lastName= ?, email= ?, address=? where id =?',
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}