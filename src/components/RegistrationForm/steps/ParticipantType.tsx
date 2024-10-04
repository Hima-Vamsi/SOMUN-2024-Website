import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ParticipantType({ formData, setFormData }) {
  const handleInputChange = (value) => {
    setFormData((prev) => ({ ...prev, participantType: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Participant Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <text className="text-md font-semibold">
          Are you registering as a delegate or International Press (IP)?
        </text>
        <RadioGroup
          value={formData.participantType}
          onValueChange={handleInputChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delegate" id="delegate" />
            <Label htmlFor="delegate">Delegate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ip" id="ip" />
            <Label htmlFor="ip">International Press (IP)</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </>
  );
}
