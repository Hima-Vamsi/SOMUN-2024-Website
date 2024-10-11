import { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const committees = [
  "UNHRC",
  "WHO",
  "DISEC",
  "Lok Sabha",
  "Press Corps",
  "Historical Crisis Committee",
  "UNOOSA",
  "Committee X",
];

const committeeLinks = {
  UNHRC:
    "https://1drv.ms/x/c/818b70d81da79c13/EQB2Ee53p5tEiPUbS6eD9EsB_JISnLAC1DpL90CNcaIbvw?e=eMDAgY",
  WHO: "https://1drv.ms/x/c/818b70d81da79c13/EV2MkhqSdnRJqImL4AZLYy8BvOZm4S6hnspwaq2Q_TXPNA?e=vMFU3c",
  DISEC:
    "https://1drv.ms/x/c/818b70d81da79c13/EVt3h2EIe1xPgpBAbP174ukBmBtMVlhTfTOqkS4Y_cdqAw?e=hMXEAj",
  "Lok Sabha":
    "https://1drv.ms/x/c/818b70d81da79c13/EVTu2fmlrFNHlC4XeQCy3R4BIeNZrn_2I5OU08gZlKtkFQ?e=KsOaG2",
  "Press Corps":
    "https://1drv.ms/x/c/818b70d81da79c13/EbiE1HL5suBNkybPd9GXQsUBMu8uMwx-ohPofCIUZaZmAg?e=SaEdof",
  "Historical Crisis Committee":
    "https://1drv.ms/x/c/818b70d81da79c13/Ea9D4P9CKCZHvVLtSAZoXFwB0RTZcvqaeHMUft1V8aLQ-Q?e=dUUgl7",
  UNOOSA:
    "https://1drv.ms/x/c/818b70d81da79c13/ERVpC6bPwzVIkW9k9sOtG64BLH-OnVGjDiJoCzrLVu33ng?e=KjGTE6",
  "Committee X":
    "https://1drv.ms/x/c/818b70d81da79c13/EdHzFoeI0xxPh5hfQuG5W8oBDFJXRCK2ut76-BCKgF1N4Q?e=BfaCoL",
};

export default function CommitteeSelection({ formData, setFormData }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChoiceChange = (choice, field, value) => {
    if (field === "committee") {
      const otherChoices = [
        "firstChoice",
        "secondChoice",
        "thirdChoice",
      ].filter((c) => c !== choice);
      const isAlreadySelected = otherChoices.some(
        (c) => formData[c].committee === value
      );

      if (isAlreadySelected) {
        setAlertMessage(
          "You have already selected this committee as one of your preferences, please choose another committee as your preference."
        );
        setShowAlert(true);
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [choice]: { ...prevData[choice], [field]: value },
    }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Committee Selection</CardTitle>
        <p className="text-sm font-extralight">
          Please note you cannot repeat committees in different preferences.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {["firstChoice", "secondChoice", "thirdChoice"].map((choice, index) => (
          <div key={choice} className="space-y-4">
            <h3 className="text-lg font-semibold">Choice {index + 1}</h3>
            <div className="space-y-2">
              <Label htmlFor={`${choice}-committee`}>Committee</Label>
              <Select
                value={formData[choice].committee}
                onValueChange={(value) =>
                  handleChoiceChange(choice, "committee", value)
                }
              >
                <SelectTrigger id={`${choice}-committee`}>
                  <SelectValue placeholder="Select committee" />
                </SelectTrigger>
                <SelectContent>
                  {committees.map((committee) => (
                    <SelectItem key={committee} value={committee}>
                      {committee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="mb-2">
                {formData[choice].committee ? (
                  <a
                    href={committeeLinks[formData[choice].committee]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Available Allocations
                  </a>
                ) : (
                  <span>Available Allocations</span>
                )}
              </div>
              <Label
                htmlFor={`${choice}-country`}
                className="text-sm text-muted-foreground"
              >
                Enter your preferred country from the list above
              </Label>
              <Input
                id={`${choice}-country`}
                value={formData[choice].country || ""}
                onChange={(e) =>
                  handleChoiceChange(choice, "country", e.target.value)
                }
                placeholder="Enter country"
                disabled={!formData[choice].committee}
              />
            </div>
          </div>
        ))}
      </CardContent>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Committee Already Selected</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
