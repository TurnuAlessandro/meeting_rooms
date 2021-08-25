const db = require("../config/database")


class User{
  constructor(name, email, password) {
    this.email = email
    this.name = name
    this.password = password
  }

  static getAll(){
    return db.query('select * from project.users', [])
  }
  static login(email, password){ // restituisce l'utente loggato se il login va a buon fine, undefined altrimenti
    return db
          .query('select * from project.users where user_email like $1 and user_password like $2', [email, password])
          .then(res => res.rows.length > 0 ? res.rows[0] : undefined)
          .then(user => user ? ({
            name: user.user_name,
            email: user.user_email,
            role: user.user_role,
          }) : undefined)
  }
  static findByEmail(email){
    return db.query('select * from project.users where user_email like $1', [email]).then(res => res.rows[0])
  }
  static findByName(name){
    return db.query('select * from project.users where user_name like $1', [name]).then(res => res.rows[0])
  }
  static add(name, email, password){
    return db.query(
        "INSERT INTO project.users (user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4)",
        [email, password, name, 'USER']
          ).then(res => res.json())
  }
}
async function createUser (req, res){
  console.log(req.body)
  const { email, name, password } = req.body
  const { rows } = await db.query(
      "INSERT INTO project.users (user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4)",
      [email, password, name, 'USER']
  )

  res.status(201).send({
    message: "User added successfully!",
    body: {
      user: { email, name, password, role: 'USER' }
    },
  })
}

async function getAllUsers (req, res){
  const { rows } = await db.query("SELECT * FROM project.users", [])
console.log({rows})
  res.status(201).send({
    message: "User added successfully!",
    body: {
      users: [...rows]
          .filter(({user_role}) => user_role !== 'ADMIN')
          .map(({user_name, user_email, user_role}) => ({
            email: user_email,
            role: user_role,
            name: user_name
          }))
    },
  })
}

async function login (req, res){
  const user = await User.login(req.body.email || '', req.body.password || '')

  if(user){
    req.session = {}
    req.session.logged = true
    req.session.user = user

    res.status(200).send(user)
  } else {
    res.status(404).send(`Wrong username or password`)
  }
}


module.exports = {
  login,
  createUser,
  getAllUsers
}