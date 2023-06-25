db = db.getSiblingDB('admin')
db.auth("root","root")
db = db.getSiblingDB("cinema")
db.createUser({
    'user':"user",
    'pwd':"user",
    'roles':[{
        'role':"dbOwner",
        'db':"cinema"
    }]
})

db.createCollection('init')