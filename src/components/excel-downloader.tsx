"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";

export default function ExcelDownloader() {
  const [participantType, setParticipantType] = useState<string>("");
  const [registrationType, setRegistrationType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/private/delegate-management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participantType, registrationType }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        alert("No data available for the selected criteria");
        return;
      }
      downloadExcel(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadExcel = (data) => {
    const processedData = data.map((item) => {
      const baseFields = {
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        "Applicant School": item.school,
        "Is Part Of Delegation": item.isDelegation,
        "Is Head Delegate": item.isHeadDelegate,
        "Is Representing School/Organization": item.representingSchool,
        "Representing School/Organization": item.schoolOrOrganization,
        "Head Delegate Name": item.headDelegateName,
        "Attendee Type": item.participantType,
        "Registration Round": item.registrationType,
        "Delegation Size": item.delegationSize,
        "Previous Mun Experience": item.munExperience,
        "Previous Experience 1": item.previousExperiences[0] || "",
        "Previous Experience 2": item.previousExperiences[1] || "",
        "Previous Experience 3": item.previousExperiences[2] || "",
        "Additional Experience": item.additionalExperiences,
        "Dietary Restrictions": item.dietaryRestrictions,
        "Payment Verified": item.paymentVerified,
        "Generated Payment Id": item.generatedPaymentId,
        "Transaction Id": item.actualTransactionId,
        "Payment Screenshot": item.paymentScreenshot,
        "UPI Id": item.upiId,
      };

      if (item.participantType === "delegate") {
        return {
          ...baseFields,
          "First Committee Preference": `${item.firstChoice.committee} - ${item.firstChoice.country}`,
          "Second Committee Preference": `${item.secondChoice.committee} - ${item.secondChoice.country}`,
          "Third Committee Preference": `${item.thirdChoice.committee} - ${item.thirdChoice.country}`,
        };
      } else {
        return {
          ...baseFields,
          "IP Link 1": item.ipLinks[0] || "",
          "IP Link 2": item.ipLinks[1] || "",
          "IP Link 3": item.ipLinks[2] || "",
          "IP Link 4": item.ipLinks[3] || "",
          "IP Link 5": item.ipLinks[4] || "",
          "IP Link 6": item.ipLinks[5] || "",
          "IP Link 7": item.ipLinks[6] || "",
          "IP Link 8": item.ipLinks[7] || "",
          "IP Link 9": item.ipLinks[8] || "",
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    XLSX.writeFile(
      wb,
      `${participantType}_${registrationType}_registrations.xlsx`
    );
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Download Registration Data</h1>
      <div className="space-y-4">
        <Select onValueChange={setParticipantType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Participant Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delegate">Delegate</SelectItem>
            <SelectItem value="ip">International Press</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setRegistrationType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Registration Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early bird">Early Bird</SelectItem>
            <SelectItem value="round 1">Round 1</SelectItem>
            <SelectItem value="round 2">Round 2</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleDownload}
          disabled={!participantType || !registrationType || isLoading}
        >
          {isLoading ? "Loading..." : "Download Excel"}
        </Button>
      </div>
    </div>
  );
}
