import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function GET() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("SOMUN");
    const collection = database.collection("verified_registrations");

    const result = await collection.find({}).toArray();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data", details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
