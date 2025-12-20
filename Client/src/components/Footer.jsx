import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 py-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">Soul Sync</h2>
          <p className="text-sm leading-relaxed">
            A platform designed to support mental well-being through guidance,
            clarity, and meaningful conversations.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-medium mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Use Cases</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Team</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-medium mb-3">Connect</h3>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#">
              <Github size={20} />
            </a>
            <a className="hover:text-white" href="#">
              <Linkedin size={20} />
            </a>
            <a className="hover:text-white" href="#">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} MindCare. All rights reserved.
      </div>
    </footer>
  );
}
