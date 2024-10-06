"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Sidebar from "./Sidebar";
import DelegationDetails from "./steps/DelegationDetails";
import ParticipantType from "./steps/ParticipantType";
import PersonalDetails from "./steps/PersonalDetails";
import CommitteeSelection from "./steps/CommitteeSelection";
import MUNExperience from "./steps/MUNExperience";
import DietaryRestrictions from "./steps/DietaryRestrictions";
import Review from "./steps/Review";
import Payment from "./steps/Payment";

const delegateSteps = [
  "Delegation Details",
  "Participant Type",
  "Personal Details",
  "Committee Selection",
  "MUN Experience",
  "Dietary Restrictions",
  "Review",
  "Payment",
];

const ipSteps = [
  "Delegation Details",
  "Participant Type",
  "Personal Details",
  "MUN Experience",
  "Dietary Restrictions",
  "Review",
  "Payment",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  school: string;
  isDelegation: boolean;
  isHeadDelegate: boolean;
  representingSchool: boolean;
  schoolOrOrganization: string;
  headDelegateName: string;
  participantType: string;
  registrationType: string;
  delegationSize: string;
  firstChoice: { committee: string; country: string };
  secondChoice: { committee: string; country: string };
  thirdChoice: { committee: string; country: string };
  munExperience: string;
  previousExperiences: string[];
  additionalExperiences: string;
  ipLinks: string[];
  showAdditionalExperiences: boolean;
  dietaryRestrictions: string;
  paymentVerified: boolean;
  generatedPaymentId: string;
  paymentScreenshot: string | null;
  upiId: string;
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    school: "",
    isDelegation: false,
    isHeadDelegate: false,
    representingSchool: false,
    schoolOrOrganization: "",
    headDelegateName: "",
    participantType: "",
    registrationType: "early bird",
    delegationSize: "",
    firstChoice: { committee: "", country: "" },
    secondChoice: { committee: "", country: "" },
    thirdChoice: { committee: "", country: "" },
    munExperience: "",
    previousExperiences: [""],
    additionalExperiences: "",
    ipLinks: [""],
    showAdditionalExperiences: false,
    dietaryRestrictions: "",
    paymentVerified: false,
    generatedPaymentId: "",
    paymentScreenshot: null,
    upiId: "",
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogContent, setAlertDialogContent] = useState("");
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileError =
    "Please upload a valid image of the payment and wait for it to upload.";

  useEffect(() => {
    if (
      step !==
      (formData.participantType === "ip"
        ? ipSteps.length
        : delegateSteps.length)
    ) {
      setFormData((prev) => ({ ...prev, generatedPaymentId: "" }));
    }
  }, [step, formData.participantType]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showProgressDialog && progress < 100) {
      timer = setTimeout(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 100 / 70;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [showProgressDialog, progress]);

  useEffect(() => {
    if (progress === 100) {
      setSubmissionComplete(true);
    }
  }, [progress]);

  const showAlert = (message: string) => {
    setAlertDialogContent(message);
    setAlertDialogOpen(true);
  };

  const isStepValid = () => {
    const steps = formData.participantType === "ip" ? ipSteps : delegateSteps;
    switch (steps[step - 1]) {
      case "Delegation Details":
        if (!formData.isDelegation) return true;
        if (formData.isHeadDelegate) {
          return (
            formData.representingSchool !== undefined &&
            formData.schoolOrOrganization !== "" &&
            formData.delegationSize !== "" &&
            parseInt(formData.delegationSize, 10) >= 6
          );
        }
        return formData.headDelegateName !== "";
      case "Participant Type":
        return formData.participantType !== "";
      case "Personal Details":
        return (
          formData.name && formData.email && formData.phone && formData.school
        );
      case "Committee Selection":
        return (
          formData.firstChoice.committee &&
          formData.firstChoice.country &&
          formData.secondChoice.committee &&
          formData.secondChoice.country &&
          formData.thirdChoice.committee &&
          formData.thirdChoice.country
        );
      case "MUN Experience":
        if (formData.munExperience === "first-time") return true;
        return formData.previousExperiences.every((exp) => exp.trim() !== "");
      case "Dietary Restrictions":
        return formData.dietaryRestrictions.trim() !== "";
      case "Review":
        return true;
      case "Payment":
        return (
          formData.paymentScreenshot !== null && formData.upiId.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      const steps = formData.participantType === "ip" ? ipSteps : delegateSteps;
      if (steps[step - 1] === "Personal Details") {
        if (!validateEmail(formData.email)) {
          showAlert("Please enter a valid email address.");
          return;
        }
      }

      const maxSteps =
        formData.participantType === "ip"
          ? ipSteps.length
          : delegateSteps.length;
      if (step < maxSteps) {
        const nextStep = step + 1;
        if (steps[nextStep - 1] === "Payment") {
          setShowConfirmDialog(true);
        } else {
          setStep(nextStep);
        }
      }
    } else {
      console.log("Step is not valid.");
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (isStepValid()) {
      setIsSubmitting(true);
      setShowProgressDialog(true);
      if (!formData.isDelegation) {
        setFormData((prev) => ({
          ...prev,
          isHeadDelegate: false,
          headDelegateName: "",
          representingSchool: false,
          schoolOrOrganization: "",
          delegationSize: "",
        }));
      }

      if (formData.participantType === "ip") {
        setFormData((prev) => ({
          ...prev,
          firstChoice: { committee: "", country: "" },
          secondChoice: { committee: "", country: "" },
          thirdChoice: { committee: "", country: "" },
        }));
      }

      if (formData.munExperience === "first-time") {
        setFormData((prev) => ({
          ...prev,
          previousExperiences: [],
          additionalExperiences: "",
          ipLinks: [],
        }));
      }

      const submissionData = {
        ...formData,
        firstChoice: formData.firstChoice,
        secondChoice: formData.secondChoice,
        thirdChoice: formData.thirdChoice,
        paymentScreenshot: formData.paymentScreenshot,
      };

      if (!formData.paymentScreenshot) {
        showAlert("Please upload a payment screenshot before submitting.");
        return;
      }
      try {
        const response = await fetch("/api/register/submit-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit registration");
        }

        while (progress < 100) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        setSubmissionComplete(true);
      } catch (error) {
        console.error("Error submitting registration:", error);
        setShowProgressDialog(false);
        showAlert(
          "Submission failed. Please take a screenshot and either message +919398497723 or email hvkatta@gmail.com for support."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const renderStep = () => {
    const steps = formData.participantType === "ip" ? ipSteps : delegateSteps;
    switch (steps[step - 1]) {
      case "Delegation Details":
        return (
          <DelegationDetails formData={formData} setFormData={setFormData} />
        );
      case "Participant Type":
        return (
          <ParticipantType formData={formData} setFormData={setFormData} />
        );
      case "Personal Details":
        return (
          <PersonalDetails formData={formData} setFormData={setFormData} />
        );
      case "Committee Selection":
        return (
          <CommitteeSelection formData={formData} setFormData={setFormData} />
        );
      case "MUN Experience":
        return <MUNExperience formData={formData} setFormData={setFormData} />;
      case "Dietary Restrictions":
        return (
          <DietaryRestrictions formData={formData} setFormData={setFormData} />
        );
      case "Review":
        return <Review formData={formData} />;
      case "Payment":
        return (
          <Payment
            formData={formData}
            setFormData={setFormData}
            fileError={fileError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[600px] sm:w-[400px] md:w-[700px] lg:w-[800px] mx-auto  border rounded-lg overflow-hidden">
      <Sidebar
        step={step}
        formData={formData}
        steps={formData.participantType === "ip" ? ipSteps : delegateSteps}
      />
      <Card className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow">{renderStep()}</ScrollArea>
        <CardFooter className="space-x-4 border-t p-4">
          <Button
            onClick={handlePrevious}
            disabled={step === 1 || isSubmitting}
          >
            Previous
          </Button>
          {step <
            (formData.participantType === "ip"
              ? ipSteps.length
              : delegateSteps.length) && (
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
            >
              Next
            </Button>
          )}
          {step ===
            (formData.participantType === "ip"
              ? ipSteps.length
              : delegateSteps.length) && (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Registration Details</AlertDialogTitle>
            <AlertDialogDescription>
              Please confirm that all the information you&apos;ve provided is
              correct. By proceeding, you agree to the event&apos;s terms and
              conditions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Review Again
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowConfirmDialog(false);
                setStep((prev) => prev + 1);
              }}
            >
              Confirm and Proceed to Payment
            </AlertDialogAction>
          </AlertDialogFooter>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <Link
              href="https://www.privacypolicyonline.com/sample-terms-conditions-template/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Terms and Conditions
            </Link>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertDialogContent.includes("failed") ? "Error" : "Alert"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialogContent}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showProgressDialog} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {submissionComplete
                ? "Registration Complete"
                : "Submitting Registration"}
            </DialogTitle>
          </DialogHeader>
          {!submissionComplete ? (
            <div className="py-4">
              <Progress value={progress} className="w-full" />
            </div>
          ) : (
            <div className="py-4 space-y-4">
              <p>Your registration has been submitted successfully!</p>
              <p>
                Please check your email for a confirmation that we received your
                registration.
              </p>
              <p>
                If you do not receive an email, please SMS or WhatsApp message
                +91 9398497723 or email hvkatta@gmail.com.
              </p>
            </div>
          )}
          {submissionComplete && (
            <DialogFooter>
              <Button onClick={() => (window.location.href = "/")}>
                Go to Home Page
              </Button>
              <Button onClick={() => (window.location.href = "/event-details")}>
                View Event Details
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
