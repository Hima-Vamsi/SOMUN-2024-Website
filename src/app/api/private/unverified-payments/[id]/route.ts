import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let client;
  try {
    const id = params.id;
    client = new MongoClient(uri ?? "");
    await client.connect();
    const database = client.db("SOMUN");
    const registrationsCollection = database.collection(
      "unverified_registrations"
    );

    // Find the registration
    const registration = await registrationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Delete the registration from the database
    const deleteResult = await registrationsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: "Failed to delete registration from database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
