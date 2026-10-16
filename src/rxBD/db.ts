import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { MenuItem } from "@/domain/entities/MenuItem";

interface FoodlyDB extends DBSchema {
  menuItems: {
    key: number;
    value: any;
    indexes: { 'by-category': string };
  };
}

const DB_NAME = "foodly_kitchen_db";
const STORE_NAME = "menuItems";
const DB_VERSION = 1;

class DBDataSource {
  private dbPromise: Promise<IDBPDatabase<FoodlyDB>>;

  constructor() {
    this.dbPromise = openDB<FoodlyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("by-category", "category_id");
        }
      },
    });
  }

 async getAll(): Promise<any[]> {
    const db = await this.dbPromise;
    const items = await db.getAll(STORE_NAME);
    return items.reverse(); 
  }

  async add(item: any): Promise<number> {
    const db = await this.dbPromise;
    const dataToSave = { ...item };
    if (!dataToSave.id) {
      delete dataToSave.id;
    }
    const id = await db.add(STORE_NAME, dataToSave);
    return Number(id);
  }

  async update(item: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, item);
  }

  async delete(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, id);
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear(STORE_NAME);
  }
}

export const dbDataSource = new DBDataSource();