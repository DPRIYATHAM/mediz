// lib/db.ts
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";

let dbPromise: ReturnType<typeof PGliteWorker.create>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = PGliteWorker.create(
      new Worker(new URL('./db-worker.ts', import.meta.url), {
        type: 'module',
      }),
      {
        dataDir: 'idb://mediz-patient-db',
        extensions: { live },
      }
    );
  }
  return dbPromise;
};

// Ensure the DB schema is created (only by the leader)
export async function initDB() {
  const db = await getDB(); // wait for db to be initialized

  if (db.isLeader) {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        dob TEXT NOT NULL,
        gender TEXT,
        address TEXT,
        phone TEXT,
        purpose TEXT,
        remarks TEXT
      );
    `);
  }
}


// Create the Web Worker and initialize PGliteWorker
// export const db = new PGliteWorker(
//   new Worker(new URL("./db-worker.ts", import.meta.url), { type: "module" }),
//   {
//     dataDir: "idb://mediz-patient-db",
//     extensions: { live },
//   }
// );

// export async function initDB() {
//   // Only the leader performs schema setup
//   if (await db.isLeader) {
//     await db.exec(`
//       CREATE TABLE IF NOT EXISTS patients (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         dob TEXT NOT NULL,
//         gender TEXT,
//         address TEXT,
//         phone TEXT,
//         purpose TEXT,
//         remarks TEXT
//       );
//     `);
//   }
// }