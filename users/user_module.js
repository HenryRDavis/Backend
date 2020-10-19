const db = require('../database/connection')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    update
}
// get all users
function find() {
     return db('user')
}

// get a user by filter
function findBy(filter) {
    return find().where(filter)
}

// get a user by ID
function findById(id) {
    return find().where({id}).first()
}

// add a user 
async function add(user) {
    try {
        const [id] = await find().insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

// delete a user 
function remove(id) {
  return  findById(id).del()
}

// update a user 
function update(updating, id) {
    return findById(id).update(updating)
    .then(()=> findById(id))
}