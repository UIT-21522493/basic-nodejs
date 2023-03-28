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
    let user = await pool.execute(`select * from users where id = ?`, [userId]);
    //console.log('check req params: ', user)
    return res.send(JSON.stringify(user[0]))
}

module.exports = {
    getHomepage, getDetailPage
}