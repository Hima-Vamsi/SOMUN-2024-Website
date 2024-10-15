"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  generatedPaymentId: string;
  upiId: string;
  isDelegation: boolean;
  paymentScreenshot: string;
}

export function UnverifiedPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const delegatePrice =
    Number(process.env.NEXT_PUBLIC_ROUND_DELEGATE_PRICE) || 2400;
  const delegationPrice =
    Number(process.env.NEXT_PUBLIC_ROUND_DELEGATION_PRICE) || 2200;

  const fetchUnverifiedPayments = useCallback(async () => {
    try {
      const response = await fetch("/api/private/unverified-payments");
      if (!response.ok) throw new Error("Failed to fetch payments");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching unverified payments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch unverified payments",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchUnverifiedPayments();
  }, [fetchUnverifiedPayments]);

  const handleAuthorizePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDialogOpen(true);
  };

  const handleDeleteApplication = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "Error",
        description: "Transaction ID cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/private/unverified-payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedPayment?._id, transactionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Transaction ID already used") {
          toast({
            title: "Error",
            description: `Transaction ID already used for registration: ${data.existingId}`,
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || "Failed to verify payment");
        }
      } else {
        toast({
          title: "Success",
          description: "Payment verified successfully",
        });
        setIsDialogOpen(false);
        setTransactionId("");
        fetchUnverifiedPayments();
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast({
        title: "Error",
        description: "Failed to verify payment",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `/api/private/unverified-payments/${selectedPayment?._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      fetchUnverifiedPayments();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Unverified Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((payment) => (
          <Card key={payment._id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{payment.name}</h2>
              <p>
                <strong>Email:</strong> {payment.email}
              </p>
              <p>
                <strong>Phone:</strong> {payment.phone}
              </p>
              <p>
                <strong>Payment ID:</strong> {payment.generatedPaymentId}
              </p>
              <p>
                <strong>UPI ID:</strong> {payment.upiId}
              </p>
              <p>
                <strong>Amount:</strong> ₹
                {payment.isDelegation ? delegationPrice : delegatePrice}
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <a
                  href={`${payment.paymentScreenshot}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Click Here
                </a>
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row space-x-8">
                <Button
                  className="bg-[#66b33d] hover:bg-[#52c215]"
                  onClick={() => handleAuthorizePayment(payment)}
                >
                  Authorize Payment
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteApplication(payment)}
                >
                  Delete Application
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Enter the transaction ID to verify the payment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transactionId" className="text-right">
                Transaction ID
              </Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleConfirmPayment}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
