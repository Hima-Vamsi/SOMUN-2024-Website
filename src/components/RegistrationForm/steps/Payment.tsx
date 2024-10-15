"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Cog } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { ImageKitProvider, IKUpload } from "imagekitio-next";

interface FormData {
  generatedPaymentId: string;
  isDelegation: boolean;
  upiId: string;
  paymentScreenshot: string;
}

interface PaymentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  fileError: string | null;
}

export default function Payment({
  formData,
  setFormData,
  fileError,
}: PaymentProps) {
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const ikUploadRef = useRef<HTMLInputElement>(null);

  const delegatePrice =
    Number(process.env.NEXT_PUBLIC_ROUND_DELEGATE_PRICE) || 2400;
  const delegationPrice =
    Number(process.env.NEXT_PUBLIC_ROUND_DELEGATION_PRICE) || 2200;
  const upiPaymentAddress =
    process.env.NEXT_PUBLIC_UPI_PAYMENT_ADDRESS || "yourupi@upi";
  const upiPaymentAddressName =
    process.env.NEXT_PUBLIC_UPI_PAYMENT_ADDRESS_NAME || "Your UPI Name";

  const generatePaymentId = useCallback(() => {
    const newPaymentId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setFormData((prev) => ({
      ...prev,
      generatedPaymentId: newPaymentId,
      upiId: "No UPI ID",
    }));
    return newPaymentId;
  }, [setFormData]);

  useEffect(() => {
    if (!formData.generatedPaymentId) {
      generatePaymentId();
    }
  }, [formData.generatedPaymentId, generatePaymentId]);

  const handleQRCodeGeneration = async () => {
    const newPaymentId = generatePaymentId();
    setError(null);

    const amount = formData.isDelegation ? delegationPrice : delegatePrice;
    const paymentData = `upi://pay?pa=${upiPaymentAddress}&pn=${encodeURIComponent(
      upiPaymentAddressName
    )}&am=${amount}&tn=${newPaymentId}`;

    try {
      const response = await fetch("/api/register/generate-payment-qr", {
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

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error", err);
    setError("File upload failed. Please try again.");
    setUploadProgress(0);
  };

  const onSuccess = (res) => {
    console.log("File upload success:", res);
    setFormData((prev) => ({
      ...prev,
      paymentScreenshot: res.url,
    }));
    setUploadProgress(100);
  };

  const onUploadProgress = (progress: { loaded: number; total: number }) => {
    setUploadProgress(Math.round((progress.loaded / 2 / progress.total) * 100));
  };

  const onUploadStart = () => {
    setUploadProgress(0);
    setError(null);
  };

  const validateFile = (file: File) => {
    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isValidType = validFileTypes.includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isValidType) {
      setError("File should be an image (jpeg, jpg, png)");
      return false;
    }
    if (!isValidSize) {
      setError("File size should be less than 5MB");
      return false;
    }

    return true;
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
                <Cog className="h-[200px] w-[200px]" />
              </div>
            )}
          </div>
          {!qrCodeGenerated ? (
            <Button onClick={handleQRCodeGeneration}>
              Generate Payment QR Code
            </Button>
          ) : (
            <div className="space-y-4 w-full">
              <div className="text-center flex flex-col">
                <p>{upiPaymentAddress}</p>
                <p>
                  Amount: ₹
                  {formData.isDelegation ? delegationPrice : delegatePrice}
                </p>
              </div>
              <div className="space-y-2">
                <ImageKitProvider
                  urlEndpoint={urlEndpoint}
                  publicKey={publicKey}
                  authenticator={authenticator}
                >
                  <h2 className="text-lg font-semibold">
                    Upload Payment Screenshot
                  </h2>
                  <IKUpload
                    fileName="screenshot.png"
                    folder="/payment-screenshots"
                    useUniqueFileName={true}
                    validateFile={validateFile}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={ikUploadRef}
                  />
                  <Button onClick={() => ikUploadRef.current?.click()}>
                    Select File
                  </Button>

                  {uploadProgress > 0 && (
                    <div className="mt-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-gray-500 mt-1">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadProgress == 100 && (
                    <div className="mt-2">
                      <p className="text-green-500 text-sm">File uploaded!</p>
                    </div>
                  )}
                  {fileError && (
                    <p className="text-red-500 text-sm">{fileError}</p>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
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
                </ImageKitProvider>
              </div>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </CardContent>
    </>
  );
}
