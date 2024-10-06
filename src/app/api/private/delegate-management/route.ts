import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
  collection: Collection;
}> {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
      collection: cachedDb.collection("verified_registrations"),
    };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("SOMUN");

  cachedClient = client;
  cachedDb = db;

  return {
    client,
    db,
    collection: db.collection("verified_registrations"),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { participantType, registrationType } = await request.json();

    if (!participantType || !registrationType) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const { collection } = await connectToDatabase();

    const result = await collection
      .find({
        participantType: participantType.toLowerCase(),
        registrationType: registrationType.toLowerCase(),
      })
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Error fetching data", details: (error as Error).message },
      { status: 500 }
    );
  }
}
