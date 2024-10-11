import Link from "next/link";
import { Github, Mail, Phone, Instagram } from "lucide-react";

export function FooterComponent() {
  return (
    <footer className="text-gray-300 py-4 border-t-[1px] border-[#303030]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-2 text-center">
              Created by
            </h3>
            <Link
              href="https://github.com/Hima-Vamsi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start hover:text-white transition-colors duration-200"
            >
              <Github className="w-4 h-4 mr-2" />
              <span className="text-sm">Katta Hima Vamsi</span>
            </Link>
          </div>
          <div className="text-center w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-2 text-center">Legal</h3>
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              Terms and Conditions
            </Link>
          </div>
          <div className="text-center sm:text-right w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-2 text-center">Support</h3>
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-4">
              <a
                href="mailto:hvkatta@gmail.com"
                className="flex items-center hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">hvkatta@gmail.com</span>
              </a>
              <a
                href="tel:+919398497723"
                className="flex items-center hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+91 9398497723</span>
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h3 className="text-sm font-semibold mb-2 text-center">
              Instagram
            </h3>
            <Link
              href="https://www.instagram.com/somunhyd/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-4 h-4 mr-2" />
              <span className="text-sm">@somunhyd</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
