import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://root:root@cluster0.ovtftp6.mongodb.net/?retryWrites=true&w=majority"
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options)
clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise