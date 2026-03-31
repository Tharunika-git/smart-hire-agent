import { QdrantClient } from "@qdrant/js-client-rest";

// ✅ Create client (use env or fallback to local)
export const client = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333",
  apiKey: process.env.QDRANT_API_KEY,
});

export const COLLECTION = "jobs";


// 🔍 Check duplicate using ID (fast check)
export async function checkDuplicate(id: string) {
  try {
    const result = await client.retrieve(COLLECTION, {
      ids: [id],
    });

    return result.length > 0;
  } catch (error) {
    console.log("Check duplicate error:", error);
    return false;
  }
}


// 🧠 Semantic duplicate check (IMPORTANT for hackathon)
export async function searchSimilar(vector: number[]) {
  try {
    const result = await client.search(COLLECTION, {
      vector,
      limit: 1,
    });

    return result;
  } catch (error) {
    console.log("Search error:", error);
    return [];
  }
}


// 💾 Store job in Qdrant
export async function storeJob(
  id: string,
  vector: number[],
  payload: any
) {
  await client.upsert(COLLECTION, {
    points: [
      {
        id,
        vector,
        payload,
      },
    ],
  });
}