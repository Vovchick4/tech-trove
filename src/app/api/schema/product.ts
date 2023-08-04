import BuilderBD from "../lib/builder-db";

export interface IProductData {
    name: string;
    slug: string;
}

export default class Product extends BuilderBD {
    private collectionName: string = "products";

    constructor() {
        super();
    }

    async create(data: IProductData) {
        return (await this.collaction(this.collectionName)).insertOne(data);
    }

    async findAll() {
        return (await this.collaction(this.collectionName)).find().toArray();
    }

    async findBySlug(slug: any) {
        return (await this.collaction(this.collectionName)).findOne({ slug });
    }
} 
