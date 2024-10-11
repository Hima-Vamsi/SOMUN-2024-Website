import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ParticipantTypeProps {
  formData: {
    participantType: string;
    ipType: string;
  };
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ParticipantType({
  formData,
  setFormData,
}: ParticipantTypeProps) {
  const handleParticipantTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, participantType: value, ipType: "" }));
  };

  const handleIpTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, ipType: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Participant Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-md font-semibold">
          Are you registering as a delegate or International Press (IP)?
        </p>
        <RadioGroup
          value={formData.participantType}
          onValueChange={handleParticipantTypeChange}
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

        {formData.participantType === "ip" && (
          <div className="mt-4">
            <p className="text-md font-semibold mb-2">
              Are you registering as a journalist or a photo journalist?
            </p>
            <RadioGroup
              value={formData.ipType}
              onValueChange={handleIpTypeChange}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Journalist" id="journalist" />
                <Label htmlFor="journalist">Journalist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Photo Journalist" id="photoJournalist" />
                <Label htmlFor="photoJournalist">Photo Journalist</Label>
              </div>
            </RadioGroup>
            {formData.participantType === "ip" && !formData.ipType && (
              <p className="text-sm text-red-500 mt-2">
                Please select your IP type.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </>
  );
}
