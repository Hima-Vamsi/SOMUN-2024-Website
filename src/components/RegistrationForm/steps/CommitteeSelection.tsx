import { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select, { components } from "react-select";
import { ChevronDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const committees = [
  "UNHRC",
  "WHO",
  "DISEC",
  "Lok Sabha",
  "Press Corps",
  "Crisis Committee",
  "UNOOSA",
  "ψ",
];

const committeeCountries = {
  UNHRC: ["Enter Countries 1", "Enter Countries 2"],
  WHO: ["Enter Countries 1", "Enter Countries 2"],
  DISEC: ["Enter Countries 1", "Enter Countries 2"],
  "Lok Sabha": ["Enter Countries 1", "Enter Countries 2"],
  "Press Corps": ["Enter Countries 1", "Enter Countries 2"],
  "Crisis Committee": ["Enter Countries 1", "Enter Countries 2"],
  UNOOSA: ["Enter Countries 1", "Enter Countries 2"],
  ψ: ["Enter Countries 1", "Enter Countries 2"],
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-4 w-4" />
    </components.DropdownIndicator>
  );
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
        <text className="text-sm font-extralight">
          Please note you cannot repeat committees in different preferences.
        </text>
      </CardHeader>
      <CardContent className="space-y-6">
        {["firstChoice", "secondChoice", "thirdChoice"].map((choice, index) => (
          <div key={choice} className="space-y-4">
            <h3 className="text-lg font-semibold">Choice {index + 1}</h3>
            <div className="space-y-2">
              <Label htmlFor={`${choice}-committee`}>Committee</Label>
              <Select
                id={`${choice}-committee`}
                options={committees.map((committee) => ({
                  value: committee,
                  label: committee,
                }))}
                value={
                  formData[choice].committee
                    ? {
                        value: formData[choice].committee,
                        label: formData[choice].committee,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChoiceChange(choice, "committee", selectedOption.value)
                }
                placeholder="Select committee"
                components={{
                  DropdownIndicator,
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#333333",
                    borderColor: "#4d4d4d",
                    color: "#fff",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#333333",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#4d4d4d"
                      : state.isFocused
                      ? "#404040"
                      : "#333333",
                    color: "#fff",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#fff",
                  }),
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${choice}-country`}>Country</Label>
              <Select
                id={`${choice}-country`}
                options={
                  formData[choice].committee
                    ? committeeCountries[formData[choice].committee].map(
                        (country) => ({
                          value: country,
                          label: country,
                        })
                      )
                    : []
                }
                value={
                  formData[choice].country
                    ? {
                        value: formData[choice].country,
                        label: formData[choice].country,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChoiceChange(choice, "country", selectedOption.value)
                }
                placeholder="Select country"
                isDisabled={!formData[choice].committee}
                components={{
                  DropdownIndicator,
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#333333",
                    borderColor: "#4d4d4d",
                    color: "#fff",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#333333",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#4d4d4d"
                      : state.isFocused
                      ? "#404040"
                      : "#333333",
                    color: "#fff",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#fff",
                  }),
                }}
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
