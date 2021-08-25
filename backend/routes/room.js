const express = require('express')
const router = express.Router()

// Tutte le room
router.get('/', (req, res) => {
    try{
        res.send('aaa')
    } catch (err){
        res.status(500).json({message: 'Error 500'})
    }
})
// Una sola room
router.get('/:id', (req, res) => {
    res.send('Tutte le Una room')
})
// Crea room
router.post('/', (req, res) => {
    res.send('crea una room le room')

})
// Modifica Room
router.patch('/:id', (req, res) => {
    
})
// Cancella room
router.delete('/:id', (req, res) => {
    
})


module.exports = router