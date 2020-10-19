const handleInsert = (db) => (req, res) => {
    const {firstName, lastName, email, dob, phoneNumber, homeAddress} = req.body;
    if(!firstName || !lastName ){
        return res.status(400).json('incorrect form submission');
    }

    db('patients').insert({
        firstname: firstName,
        lastname: lastName,
        email: email,
        dob: dob,
        phonenumber: phoneNumber, 
        homeaddress: homeAddress
    }).then(user => {
        res.json(user[0])
    }).catch(err => res.status(400).json(err))
}

const handleSearch = (db) => (req, res) => {
    const { email } = req.params;
    db.select('*').from('patients').where('email', email)
        .then(user => {
            return res.json(user)
        })
        .catch(err => res.status(400).json(err))
}

const handleDelete = (db) => (req, res) => {
    const { email } = req.params;
    db('patients').where('email', email).del()
    .then(user => {
        return res.json(user)
    })
    .catch(err => res.status(400).json(err))
}

const handleSearchAll = (db) => (req, res) => {
    db.select('*').from('patients')
    .then(users => {
        return res.json(users)
    })
    .catch(err => res.status(400).json(err))
}

const handleDeleteAll = (db) => (req, res) => {
    db.select('*').from('patients').del()
    .then(res.json('deleted All users'))
    .catch(err => res.status(400).json(err))
}

// const handleEdit = (db) => (req, res) => {
//     const { emailReq } = req.params;
//     const {firstName, lastName, email, dob, phoneNumber, homeAddress} = req.body;
    
//     db('patients')
//     .where('email', emailReq)
//     .update({
//         firstname: firstName,
//         lastname: lastName,
//         email: email,
//         dob: dob,
//         phonenumber: phoneNumber, 
//         homeaddress: homeAddress,
//         thisKeyIsSkipped: undefined
//     })
//     .then(user => {
//         return res.json("updated user")
//     })
//     .catch(err =>  res.status(400).json(err))
// }


module.exports = { 
    handleInsert,
    handleSearch,
    handleDelete,
    handleSearchAll,
    handleDeleteAll
    // handleEdit
}