const router = require('express').Router()
const Instructor = require('./user_module')
const {hashing, errorHandler, makeJwt, restricted, usernameValidation} = require('./users_helper')
const bcryptjs = require('bcryptjs')

//get all instructors
router.get('/', restricted, (req, res) => {
    Instructor.find()
    .then(allInstrucs => res.status(200).json({data: allInstrucs}))
    .catch(error =>  errorHandler(error, res))
})

// get instructor by id
router.get('/:id', restricted, (req, res) => {
    const {id} = req.params
    Instructor.findById(id)
    .then(instructor => res.status(200).json({data: instructor}))
    .catch(error =>  errorHandler(error, res))
})

// remove instructor from the databse
router.delete('/:id', restricted, (req, res) => {
    const {id} = req.params
    Instructor.remove(id)
    .then(number => res.status(200).json({data: {deleteMessage: `you have deleted ${number} Instructor/Users`}}))
    .catch(error =>  errorHandler(error, res))
})

// register a new instructor to the instructor table
router.post('/register', usernameValidation, (req, res) => {
    let instructInfo = req.body
    const hashedPassword = hashing(instructInfo.password)
    instructInfo.password = hashedPassword
    Instructor.add(instructInfo)
    .then(instructor => {
        const token = makeJwt(instructor)
        res.status(201).json({data: instructor, token})
    })
    .catch(error =>  errorHandler(error, res))
})

// login into an existing instructor 
router.post('/login', (req, res) => {
    const {username, password} = req.body
    Instructor.findBy({username})
    .then(([instructor]) => {
        if (instructor && bcryptjs.compareSync(password, instructor.password)) {
            const token = makeJwt(instructor);

            res.status(201).json({data: instructor, token});
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    })
    .catch(error =>  errorHandler(error, res))
})