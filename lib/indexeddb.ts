import { openDB } from "idb";

const DB_NAME = "youtubeVideosDB";
const STORE_NAME = "videos";

export const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveVideosToIndexedDB = async (videos: any[]) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const video of videos) {
    await tx.store.put(video);
  }
  await tx.done;
};

export const getVideosFromIndexedDB = async (): Promise<any[]> => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};

export const clearIndexedDB = async () => {
  const db = await getDB();
  await db.clear(STORE_NAME);
};
