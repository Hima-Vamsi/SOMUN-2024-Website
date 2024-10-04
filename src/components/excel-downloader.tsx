"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

export default function ExcelDownloaderComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/private/delegate-management");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processData = (registrationType, participantType) => {
    const filteredData = data.filter((item) => {
      const matchesType =
        item.registrationType.toLowerCase() === registrationType.toLowerCase();
      const matchesParticipant =
        item.participantType.toLowerCase() === participantType.toLowerCase();

      return matchesType && matchesParticipant;
    });

    return filteredData.map((item) => ({
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
      "First Committee Preference": `${item.firstChoice.committee} - ${item.firstChoice.country}`,
      "Second Committee Preference": `${item.secondChoice.committee} - ${item.secondChoice.country}`,
      "Third Committee Preference": `${item.thirdChoice.committee} - ${item.thirdChoice.country}`,
      "Previous Mun Experience": item.munExperience,
      "Previous Experience 1": item.previousExperiences[0] || "",
      "Previous Experience 2": item.previousExperiences[1] || "",
      "Previous Experience 3": item.previousExperiences[2] || "",
      "Additional Experience": item.additionalExperiences,
      "IP Link 1": item.ipLinks[0] || "",
      "IP Link 2": item.ipLinks[1] || "",
      "IP Link 3": item.ipLinks[2] || "",
      "IP Link 4": item.ipLinks[3] || "",
      "IP Link 5": item.ipLinks[4] || "",
      "IP Link 6": item.ipLinks[5] || "",
      "IP Link 7": item.ipLinks[6] || "",
      "IP Link 8": item.ipLinks[7] || "",
      "IP Link 9": item.ipLinks[8] || "",
      "Dietary Restrictions": item.dietaryRestrictions,
      "Payment Verified": item.paymentVerified,
      "Generated Payment Id": item.generatedPaymentId,
      "Transaction Id": item.actualTransactionId,
      "Payment Screenshot": item.paymentScreenshot,
      "UPI Id": item.upiId,
    }));
  };

  const downloadExcel = (data, fileName) => {
    if (data.length === 0) {
      console.warn("No data to download");
      alert("No data available for the selected criteria");
      return;
    }

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Add column headers
    const headers = Object.keys(data[0]);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");

    // Generate Excel file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleDownload = (registrationType, participantType) => {
    const processedData = processData(registrationType, participantType);
    const fileName = `${registrationType}_${participantType}_registrations`;
    downloadExcel(processedData, fileName);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Download Registration Data</h1>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => handleDownload("early bird", "delegate")}>
          Download Early Bird Delegate Registrations
        </Button>
        <Button onClick={() => handleDownload("round 1", "delegate")}>
          Download Round 1 Delegate Registrations
        </Button>
        <Button onClick={() => handleDownload("round 2", "delegate")}>
          Download Round 2 Delegate Registrations
        </Button>
        <Button onClick={() => handleDownload("early bird", "ip")}>
          Download Early Bird IP Registrations
        </Button>
        <Button onClick={() => handleDownload("round 1", "ip")}>
          Download Round 1 IP Registrations
        </Button>
        <Button onClick={() => handleDownload("round 2", "ip")}>
          Download Round 2 IP Registrations
        </Button>
      </div>
    </div>
  );
}
