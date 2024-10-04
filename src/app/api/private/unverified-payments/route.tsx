import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("SOMUN");
    const collection = database.collection("unverified_registrations");

    const unverifiedPayments = await collection
      .find({ paymentVerified: false })
      .toArray();

    return NextResponse.json(unverifiedPayments);
  } catch (error) {
    console.error("Error fetching unverified payments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  let client;
  try {
    const { id, transactionId } = await request.json();
    client = new MongoClient(uri);
    await client.connect();
    const database = client.db("SOMUN");
    const registrationsCollection = database.collection(
      "unverified_registrations"
    );
    const verifiedRegistrationsCollection = database.collection(
      "verified_registrations"
    );

    // Check if the transaction ID already exists in either collection
    const existingTransaction = await Promise.all([
      registrationsCollection.findOne({ actualTransactionId: transactionId }),
      verifiedRegistrationsCollection.findOne({
        actualTransactionId: transactionId,
      }),
    ]);

    if (existingTransaction[0] || existingTransaction[1]) {
      return NextResponse.json(
        {
          error: "Transaction ID already used",
          existingId:
            existingTransaction[0]?._id || existingTransaction[1]?._id,
        },
        { status: 400 }
      );
    }

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

    // Update the registration
    const updatedRegistration = {
      ...registration,
      actualTransactionId: transactionId,
      paymentVerified: true,
    };

    // Add to verified registrations
    const insertResult = await verifiedRegistrationsCollection.insertOne(
      updatedRegistration
    );

    if (!insertResult.acknowledged) {
      throw new Error("Failed to insert into verified registrations");
    }

    // Delete from registrations
    const deleteResult = await registrationsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount !== 1) {
      throw new Error("Failed to delete from registrations");
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and registration updated",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
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
