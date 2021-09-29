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
  static getAllEmails(){
    return db.query('select user_email from project.users', [])
        .then(res => res.rows)
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

async function signup (req, res){
  console.log('Signup', req.body)

  const { email, name, password } = req.body
  const { rows } = await db.query(
      "INSERT INTO project.users (user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4)",
      [email, password, name, 'USER']
  )

  res.status(201).send({
    text: `User ${name} added`,
    user: {
      email, name, role: 'USER'
    }
  })
}

async function getAllUsers (req, res){
  console.log('Get All Users')

  const { rows } = await db.query("SELECT * FROM project.users", [])
  console.log({rows})
  res.status(201).send([...rows]
          .filter(({user_role}) => user_role !== 'ADMIN')
          .map(({user_name, user_email, user_role}) => ({
            email: user_email,
            role: user_role,
            name: user_name
          })))
}

async function login (req, res){
  console.log('Login', req.body)

  const user = await User.login(req.body.email || '', req.body.password || '')
  if(user){
    req.session = {
      logged: true,
      user
    }
    res.status(200).send(user)
  } else {
    res.status(400).send(`Wrong username or password`)
  }
}

async function userAlreadyExists(req, res){
  console.log('Check if an email already exists', req.body)

  const emails = await User.getAllEmails()
  res.status(200).send(emails.map(e => e.user_email).indexOf(req.body.email) !== -1)
}

function logout(req, res){
  console.log('Logout', req.body)

  req.session = null
}


module.exports = {
  login,
  signup,
  getAllUsers,
  userAlreadyExists,
  logout
}