import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegistrationClosed() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md mx-auto animate-fade-in-up bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-100">
            Registrations Have Closed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-xl text-gray-300">We are at full capacity</p>
          <p className="text-lg text-gray-400">Thank you for your interest</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
            >
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
