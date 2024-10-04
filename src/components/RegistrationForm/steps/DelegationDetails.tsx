import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DelegationDetails({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Delegation Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={formData.isDelegation ? "yes" : "no"}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              isDelegation: value === "yes",
            }))
          }
        >
          <text className="text-lg font-semibold">
            Are you part of a delegation?
          </text>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="isDelegationYes" />
            <Label htmlFor="isDelegationYes">Part of a delegation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="isDelegationNo" />
            <Label htmlFor="isDelegationNo">Individual delegate</Label>
          </div>
        </RadioGroup>
        {formData.isDelegation && (
          <>
            <RadioGroup
              value={formData.isHeadDelegate ? "yes" : "no"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  isHeadDelegate: value === "yes",
                }))
              }
            >
              <text className="text-md font-semibold">
                Are you the head delegate?
              </text>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="isHeadDelegateYes" />
                <Label htmlFor="isHeadDelegateYes">
                  I am the head delegate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="isHeadDelegateNo" />
                <Label htmlFor="isHeadDelegateNo">
                  I am not the head delegate
                </Label>
              </div>
            </RadioGroup>
            {formData.isHeadDelegate ? (
              <>
                <RadioGroup
                  value={formData.representingSchool ? "yes" : "no"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      representingSchool: value === "yes",
                    }))
                  }
                >
                  <text className="text-md font-semibold">
                    Are you representing a school or organization?
                  </text>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="representingSchoolYes" />
                    <Label htmlFor="representingSchoolYes">
                      Representing a school or organization
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="representingSchoolNo" />
                    <Label htmlFor="representingSchoolNo">
                      Not representing a school or organization
                    </Label>
                  </div>
                </RadioGroup>
                <div className="space-y-2">
                  <Label
                    htmlFor="schoolOrOrganization"
                    className="text-md font-semibold"
                  >
                    {formData.representingSchool
                      ? "What is the name of the School/Organization you represent?"
                      : "What is the name of the School/Organization you are from?"}
                  </Label>
                  <Input
                    id="schoolOrOrganization"
                    name="schoolOrOrganization"
                    value={formData.schoolOrOrganization}
                    onChange={handleInputChange}
                    required
                    maxLength={256}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="delegationSize"
                    className="text-md font-semibold"
                  >
                    Delegation Size (minimum 6)
                  </Label>
                  <Input
                    id="delegationSize"
                    name="delegationSize"
                    type="number"
                    value={formData.delegationSize}
                    onChange={handleInputChange}
                    required
                    min="6"
                    max="999"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label
                    htmlFor="headDelegateName"
                    className="text-md font-semibold"
                  >
                    What is the name of your head delegate?
                  </Label>
                  <Label className="text-sm font-extralight">
                    If you do not know their name, enter the school/organization
                    you are from
                  </Label>
                </div>
                <Input
                  id="headDelegateName"
                  name="headDelegateName"
                  value={formData.headDelegateName}
                  onChange={handleInputChange}
                  maxLength={256}
                  required
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </>
  );
}
