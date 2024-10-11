import Link from "next/link";
import { Button } from "@/components/ui/button";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        SOMUN 2024 Terms and Conditions
      </h1>
      <Link
        href="/SOMUN 2024 Terms and Conditions.pdf"
        target="_blank"
        download
      >
        <Button>Download Terms and Conditions</Button>
      </Link>
    </div>
  );
};

export default TermsAndConditions;
