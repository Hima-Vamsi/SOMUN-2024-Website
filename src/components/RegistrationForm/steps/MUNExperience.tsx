"use client";

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MUNExperience({ formData, setFormData }) {
  const [showAdditionalExperiences, setShowAdditionalExperiences] =
    useState(false);
  const [showLinkLimitAlert, setShowLinkLimitAlert] = useState(false);

  useEffect(() => {
    // Cull empty experience fields
    const nonEmptyExperiences = formData.previousExperiences.filter(
      (exp) => exp.trim() !== ""
    );
    // Cull empty link fields
    const nonEmptyLinks = formData.ipLinks.filter((link) => link.trim() !== "");

    setFormData((prev) => ({
      ...prev,
      previousExperiences: nonEmptyExperiences.length
        ? nonEmptyExperiences
        : [""],
      ipLinks: nonEmptyLinks.length ? nonEmptyLinks : [""],
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...formData.previousExperiences];
    newExperiences[index] = value;
    setFormData((prev) => ({ ...prev, previousExperiences: newExperiences }));
  };

  const addExperienceField = () => {
    if (formData.previousExperiences.length < 3) {
      setFormData((prev) => ({
        ...prev,
        previousExperiences: [...prev.previousExperiences, ""],
      }));
    } else {
      setShowAdditionalExperiences(true);
    }
  };

  const removeExperienceField = (index) => {
    const newExperiences = [...formData.previousExperiences];
    newExperiences.splice(index, 1);
    setFormData((prev) => ({ ...prev, previousExperiences: newExperiences }));
    if (newExperiences.length < 3) {
      setShowAdditionalExperiences(false);
      setFormData((prev) => ({ ...prev, additionalExperiences: "" }));
    }
  };

  const handleIPLinkChange = (index, value) => {
    const newLinks = [...formData.ipLinks];
    newLinks[index] = value;
    setFormData((prev) => ({ ...prev, ipLinks: newLinks }));
  };

  const addIPLinkField = () => {
    if (formData.ipLinks.length < 9) {
      setFormData((prev) => ({
        ...prev,
        ipLinks: [...prev.ipLinks, ""],
      }));
    } else {
      setShowLinkLimitAlert(true);
    }
  };

  const removeIPLinkField = (index) => {
    const newLinks = [...formData.ipLinks];
    newLinks.splice(index, 1);
    setFormData((prev) => ({ ...prev, ipLinks: newLinks }));
  };

  return (
    <ScrollArea className="h-[500px]">
      <CardHeader>
        <CardTitle>MUN Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={formData.munExperience}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, munExperience: value }))
          }
        >
          <text className="text-md font-semibold">
            Have you participated in any MUNs before?
          </text>
          <text className="text-sm font-extralight">
            Please write your previous experiences in this format:
            <br />
            Conference(Year) - Committee - Allocation - Award
          </text>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="first-time" id="first-time" />
            <Label htmlFor="first-time">This is my first MUN</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experienced" id="experienced" />
            <Label htmlFor="experienced">
              I have participated in MUNs before
            </Label>
          </div>
        </RadioGroup>

        {formData.munExperience === "experienced" && (
          <div className="space-y-4">
            {formData.participantType === "ip" && (
              <div className="space-y-2">
                <Label htmlFor="ipLinks">
                  Links to previous work (not mandatory)
                </Label>
                {formData.ipLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`ipLink-${index}`}>Link {index + 1}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={`ipLink-${index}`}
                        value={link}
                        onChange={(e) =>
                          handleIPLinkChange(index, e.target.value)
                        }
                        placeholder="https://example.com/your-work"
                        maxLength={512}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove link</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your link entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeIPLinkField(index)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addIPLinkField}>
                  Add Another Link
                </Button>
              </div>
            )}
            {formData.previousExperiences.map((exp, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`experience-${index}`}>
                  Experience {index + 1}
                </Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <Input
                      id={`experience-${index}`}
                      value={exp}
                      onChange={(e) =>
                        handleExperienceChange(index, e.target.value)
                      }
                      maxLength={512}
                      required
                    />
                  </div>
                  {index !== 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove experience</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your experience entry.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeExperienceField(index)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
            {formData.previousExperiences.length < 3 && (
              <Button variant="outline" onClick={addExperienceField}>
                Add More Experience
              </Button>
            )}
            {formData.previousExperiences.length === 3 &&
              !showAdditionalExperiences && (
                <Button
                  variant="outline"
                  onClick={() => setShowAdditionalExperiences(true)}
                >
                  Add Additional Experiences
                </Button>
              )}
            {showAdditionalExperiences && (
              <div className="space-y-2">
                <Label htmlFor="additionalExperiences">
                  Additional Experiences
                </Label>
                <Textarea
                  id="additionalExperiences"
                  name="additionalExperiences"
                  value={formData.additionalExperiences}
                  onChange={handleInputChange}
                  placeholder="Please list any additional MUN experiences here"
                  className="h-32"
                  maxLength={1024}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowAdditionalExperiences(false)}
                >
                  Hide Additional Experiences
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <AlertDialog
        open={showLinkLimitAlert}
        onOpenChange={setShowLinkLimitAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Link Limit Reached</AlertDialogTitle>
            <AlertDialogDescription>
              You cannot add more than 9 links. If you have any additional
              links, please add them in the last field separated by commas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLinkLimitAlert(false)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollArea>
  );
}
