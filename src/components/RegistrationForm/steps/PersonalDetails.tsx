import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@/styles/phoneInputDark.css";

export default function PersonalDetails({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={256}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            maxLength={256}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            inputProps={{
              name: "phone",
              required: true,
              className:
                "h-[40px] w-full p-2 pl-12 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground",
            }}
            containerClass="relative"
            buttonClass="absolute top-0 left-0 h-full px-2 border-r rounded-l-md bg-secondary"
            inputStyle={{
              backgroundColor: "#333333",
              color: "#fff",
              border: "1px solid #4d4d4d",
              borderRadius: "6px",
            }}
            buttonStyle={{
              backgroundColor: "#333333",
            }}
            dropdownStyle={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school">School/Organization</Label>
          <Input
            id="school"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            maxLength={256}
            required
          />
        </div>
      </CardContent>
    </>
  );
}
