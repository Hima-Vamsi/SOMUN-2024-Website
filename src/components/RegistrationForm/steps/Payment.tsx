import { useState, useEffect, useCallback } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FormData {
  generatedPaymentId: string;
  isDelegation: boolean;
  upiId: string;
  paymentScreenshot: string;
}

interface PaymentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileError: string | null;
}

export default function Payment({
  formData,
  setFormData,
  handleFileUpload,
  fileError,
}: PaymentProps) {
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generatePaymentId = useCallback(() => {
    const newPaymentId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setFormData((prev) => ({ ...prev, generatedPaymentId: newPaymentId }));
    return newPaymentId;
  }, [setFormData]);

  useEffect(() => {
    if (!formData.generatedPaymentId) {
      generatePaymentId();
    }
  }, [formData.generatedPaymentId, generatePaymentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQRCodeGeneration = async () => {
    const newPaymentId = generatePaymentId();
    setError(null);

    const paymentData = `upi://pay?pa=9398497723@idfcfirst&pn=Hima Vamsi&am=${
      formData.isDelegation ? "1" : "2"
    }&tn=${newPaymentId}`;

    try {
      const response = await fetch("/api/register/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: paymentData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const result = await response.json();
      setQrCodeUrl(result.qrCode);
      setQrCodeGenerated(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Failed to generate QR code. Please try again.");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-64 h-64 bg-[#333333] flex items-center justify-center rounded-lg overflow-hidden">
            {qrCodeGenerated ? (
              <Image
                src={qrCodeUrl}
                alt="Payment QR Code"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#333333] flex items-center justify-center">
                <Image
                  src="/dog.png"
                  alt="Placeholder Image"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
          {!qrCodeGenerated ? (
            <Button onClick={handleQRCodeGeneration}>
              Generate Payment QR Code
            </Button>
          ) : (
            <div className="space-y-4 w-full">
              <div className="text-center">
                <p>Amount: ₹{formData.isDelegation ? "1" : "2"}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="upiId" className="text-md font-semibold">
                  UPI ID (You&apos;re paying from)
                </Label>
                <Input
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="Enter your UPI ID"
                  required
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="paymentScreenshot"
                  className="text-md font-semibold"
                >
                  Upload Payment Screenshot
                </Label>
                <Input
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                {!formData.paymentScreenshot && (
                  <p className="text-red-500 text-sm">
                    Please upload a payment screenshot before submitting.
                  </p>
                )}
                {formData.paymentScreenshot && (
                  <div className="mt-2">
                    <a
                      href={formData.paymentScreenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View uploaded screenshot
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </CardContent>
    </>
  );
}
