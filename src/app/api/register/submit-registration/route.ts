import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { MONGODB_URI, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!MONGODB_URI) {
    return NextResponse.json(
      { message: "MongoDB URI is not defined" },
      { status: 500 }
    );
  }

  if (!EMAIL_USER || !EMAIL_PASS) {
    return NextResponse.json(
      { message: "Email credentials are not defined" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db("SOMUN");
    const collection = db.collection("unverified_registrations");

    const result = await collection.insertOne(body);

    await client.close();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Katta Hima Vamsi" <' + EMAIL_USER + ">",
      to: body.email,
      subject: "SOMUN Registration Successful",
      html: `
        <h1>Thank you for registering for SOMUN!</h1>
        <p>Dear ${body.name},</p>
        <p>Thank you for submitting the registration form for the upcoming Silver Oaks Model United Nations. We have received your form and will review it shortly.</p>
        <p>We will get back to you soon with further details regarding your participation. If you have any questions in the meantime, please feel free to reach out to us by emaining hvkatta@gmail.com <strong>(OR)</strong> somun@hyd.silveroaks.co.in <strong>(OR)</strong> messaging +91 9398497723</p>
        <p>Best regards,</p>
        <p>The SOMUN Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message:
          "Registration submitted successfully and confirmation email sent",
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting registration:", error);
    return NextResponse.json(
      { message: "Error submitting registration" },
      { status: 500 }
    );
  }
}
