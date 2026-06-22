import { STATS, TIMELINE, SERVICES, PROJECTS, AI_PROJECTS, TESTIMONIALS, CLIENT_RESULTS, HOW_I_WORK_PROCESS } from '../data';

const DB_NAME = 'MohammadTahirPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_text_cache';

export function initOfflineDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported by this browser."));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export function saveToOfflineCache(key: string, value: any): Promise<void> {
  return initOfflineDb().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ key, value, updatedAt: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

export function getFromOfflineCache<T = any>(key: string): Promise<T | null> {
  return initOfflineDb().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.value as T);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  });
}

/**
 * Seed all baseline portfolio information into IndexedDB for persistent offline retrieval.
 */
export async function seedBaselinePortfolioContent(): Promise<boolean> {
  try {
    const dataToCache = {
      STATS,
      TIMELINE,
      SERVICES,
      PROJECTS,
      AI_PROJECTS,
      TESTIMONIALS,
      CLIENT_RESULTS,
      HOW_I_WORK_PROCESS
    };

    for (const [key, value] of Object.entries(dataToCache)) {
      await saveToOfflineCache(key, value);
    }
    console.log("⚡ [Offline Hub] IndexedDB initialized and populated with latest portfolio metadata.");
    return true;
  } catch (error) {
    console.error("❌ [Offline Hub] Failed to seed offline database:", error);
    return false;
  }
}
