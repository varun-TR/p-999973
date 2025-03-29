
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-slate hover:text-mint transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#" className="text-slate hover:text-mint transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-slate hover:text-mint transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="mailto:your-email@example.com" className="text-slate hover:text-mint transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        
        <p className="text-slate text-sm">
          Designed & Built by Your Name
        </p>
        
        <p className="text-slate text-xs mt-2">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
