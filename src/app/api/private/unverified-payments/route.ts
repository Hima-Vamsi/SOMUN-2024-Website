import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

const uri = process.env.MONGODB_URI;

export async function GET() {
  let client;
  try {
    client = new MongoClient(uri ?? "");
    await client.connect();
    const database = client.db("SOMUN");
    const registrationsCollection = database.collection(
      "unverified_registrations"
    );

    // Fetch all unverified payments
    const unverifiedPayments = await registrationsCollection.find({}).toArray();

    return NextResponse.json(unverifiedPayments, { status: 200 });
  } catch (error) {
    console.error("Error fetching unverified payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch unverified payments" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function POST(request: Request) {
  let client;
  try {
    const { id, transactionId } = await request.json();
    const { EMAIL_USER, EMAIL_PASS } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error("Email credentials are not defined.");
    }

    client = new MongoClient(uri ?? "");
    await client.connect();
    const database = client.db("SOMUN");
    const registrationsCollection = database.collection(
      "unverified_registrations"
    );
    const verifiedRegistrationsCollection = database.collection(
      "verified_registrations"
    );

    const unverifiedPayment = await registrationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!unverifiedPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const existingTransaction = await verifiedRegistrationsCollection.findOne({
      transactionId,
    });

    if (existingTransaction) {
      return NextResponse.json(
        {
          error: "Transaction ID already used",
          existingId: existingTransaction._id,
        },
        { status: 400 }
      );
    }

    // Generate QR code with actual transactionId content
    const qrCodeDataUrl = await QRCode.toDataURL(transactionId);

    const newRegistration = {
      ...unverifiedPayment,
      transactionId,
    };

    await verifiedRegistrationsCollection.insertOne(newRegistration);
    await registrationsCollection.deleteOne({ _id: new ObjectId(id) });

    // Prepare the QR code as an image attachment (base64 encoding)
    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");

    // Send confirmation email with QR code as attachment
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: unverifiedPayment.email,
      subject: "Payment Verified: SOMUN",
      html: `<p>Dear ${unverifiedPayment.name},</p>
        <p>Your payment has been successfully verified. Your unique QR code is attached below.</p>
        <p>Thank you for your registration.</p>
        <p>Sincerely,<br />The SOMUN Team</p>`,
      attachments: [
        {
          filename: "qrcode.png", // Filename for the attachment
          content: qrCodeBuffer,
          contentType: "image/png", // Specify content type as PNG
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Payment verified and email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Get the id from the URL

  if (!id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  let client;
  try {
    client = new MongoClient(uri ?? "");
    await client.connect();
    const database = client.db("SOMUN");
    const registrationsCollection = database.collection(
      "unverified_registrations"
    );

    const result = await registrationsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
