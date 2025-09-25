import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-xl sm:text-2xl font-bold text-indigo-600">
              Quickmart
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop shop for quality products at amazing prices. Fast
              delivery and excellent customer service.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <div className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 cursor-pointer transition-colors group">
                <Facebook className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 cursor-pointer transition-colors group">
                <Twitter className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 cursor-pointer transition-colors group">
                <Instagram className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">
                  support@quickmart.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">
                  123 Commerce St
                  <br />
                  Lagos, NG 100001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-600 text-xs sm:text-sm">
              &copy; 2025 Quickmart. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
