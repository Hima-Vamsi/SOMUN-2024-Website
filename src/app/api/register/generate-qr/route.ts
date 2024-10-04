import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data } = body;

  if (!data) {
    return NextResponse.json(
      { message: "Missing data parameter" },
      { status: 400 }
    );
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 200,
      margin: 2,
      color: {
        dark: "#FFFFFF",
        light: "#333333",
      },
    });

    return NextResponse.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { message: "Error generating QR code" },
      { status: 500 }
    );
  }
}
