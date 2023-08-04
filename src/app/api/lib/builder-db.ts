import clientPromise from "../data-source";

export default class BuilderBD {
    private dbName: string = "tech-trove";

    public async collaction(collaction: string) {
        const client = await clientPromise;
        const db = client.db(this.dbName);
        return db.collection(collaction);
    }
}