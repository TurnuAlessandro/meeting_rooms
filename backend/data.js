const ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    PUBLIC: 'PUBLIC'
}

module.exports = {
    ROLE : ROLE,
    users: [
        {id: 1, name: 'ADMINNNN', role: ROLE.ADMIN},
        {id: 2, name: 'user1', role: ROLE.USER},
        {id: 3, name: 'user2', role: ROLE.USER},
        {id: 4, name: 'user3', role: ROLE.USER}
    ],
    rooms: [
        {id: 1, name: 'room1', user: 2},
        {id: 2, name: 'room2', user: 2},
        {id: 3, name: 'room3', user: 3},
        {id: 4, name: 'room4', user: 4},
    ]
}