import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReviewSection from "../ReviewSection";
import { useState } from "react";

export default function Review({ formData }) {
  const [openDialog, setOpenDialog] = useState(null);

  const delegationDetails = [
    {
      label: "Part of Delegation",
      value: formData.isDelegation ? "Yes" : "No",
    },
    ...(formData.isDelegation
      ? [
          {
            label: "Head Delegate",
            value: formData.isHeadDelegate ? "Yes" : "No",
          },
          ...(formData.isHeadDelegate
            ? [
                {
                  label: "Representing School/Organization",
                  value: formData.representingSchool ? "Yes" : "No",
                },
                {
                  label: "School/Organization Name",
                  value: formData.schoolOrOrganization,
                },
                { label: "Delegation Size", value: formData.delegationSize },
              ]
            : [
                {
                  label: "Head Delegate Name",
                  value: formData.headDelegateName,
                },
              ]),
        ]
      : []),
  ];

  const personalDetails = [
    { label: "Name", value: formData.name },
    { label: "Email", value: formData.email },
    { label: "Phone", value: formData.phone },
    { label: "School/Organization", value: formData.school },
  ];

  const participantDetails = [
    {
      label: "Participant Type",
      value:
        formData.participantType === "delegate"
          ? "Delegate"
          : "International Press",
    },
  ];

  const committeeDetails =
    formData.participantType === "delegate"
      ? [
          {
            label: "First Choice",
            value: `${formData.firstChoice.committee} - ${formData.firstChoice.country}`,
          },
          {
            label: "Second Choice",
            value: `${formData.secondChoice.committee} - ${formData.secondChoice.country}`,
          },
          {
            label: "Third Choice",
            value: `${formData.thirdChoice.committee} - ${formData.thirdChoice.country}`,
          },
        ]
      : [];

  const munExperience = [
    {
      label: "First MUN",
      value: formData.munExperience === "first-time" ? "Yes" : "No",
    },
    ...(formData.munExperience === "experienced"
      ? [
          {
            label: "Previous Experiences",
            value: formData.previousExperiences.join(", "),
          },
          {
            label: "Additional Experiences",
            value: formData.additionalExperiences || "None provided",
          },
          ...(formData.participantType === "ip"
            ? [
                {
                  label: "Previous Work Links",
                  value: formData.ipLinks.join(", ") || "None provided",
                },
              ]
            : []),
        ]
      : []),
  ];

  const dietaryRestrictions = [
    {
      label: "Dietary Restrictions",
      value: formData.dietaryRestrictions || "None provided",
    },
  ];

  return (
    <>
      <CardHeader>
        <CardTitle>Review Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReviewSection
          title="Delegation Details"
          content={delegationDetails}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        <ReviewSection
          title="Personal Details"
          content={personalDetails}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        <ReviewSection
          title="Participant Details"
          content={participantDetails}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        {formData.participantType === "delegate" && (
          <ReviewSection
            title="Committee Details"
            content={committeeDetails}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        )}
        <ReviewSection
          title="MUN Experience"
          content={munExperience}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        <ReviewSection
          title="Dietary Restrictions"
          content={dietaryRestrictions}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </CardContent>
    </>
  );
}
