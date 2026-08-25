import { Db, MongoClient } from 'mongodb';

export type ProductDatabase = 'identity' | 'school_erp' | 'interview_copilot' | 'crm';

export type DatabaseConfig = {
  uri: string;
  databasePrefix?: string;
};

export const productDatabaseName = (product: ProductDatabase, prefix = 'company') => `${prefix}_${product}`;

export const connectProductDatabase = async (config: DatabaseConfig, product: ProductDatabase): Promise<{ client: MongoClient; db: Db }> => {
  const client = new MongoClient(config.uri);
  await client.connect();
  return { client, db: client.db(productDatabaseName(product, config.databasePrefix)) };
};
