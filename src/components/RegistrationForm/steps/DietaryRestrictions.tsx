import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DietaryRestrictions({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Dietary Restrictions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="dietaryRestrictions"
            className="text-md font-semibold"
          >
            Please list any dietary restrictions or allergies you have
          </Label>
          <Textarea
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
            placeholder="Enter your dietary restrictions or allergies here. If none, please write 'None'."
            maxLength={1000}
          />
        </div>
      </CardContent>
    </>
  );
}
