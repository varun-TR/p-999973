import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Ensure this matches your project setup
import { Menu, X, ShoppingBag, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);

    if (isHomePage) {
      // If already on home page, scroll to the section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home page with section hash
      window.location.href = `/#${id}`;
    }
  };

  // Function to trigger resume download
  const handleResumeDownload = () => {
    const resumeUrl = "https://github.com/varun-TR/p-999973/raw/215dc18c79c981c09dd6ee8a7af4f1b0020b7ef5/public/assest/Resume.Saivarun__.pdf"; // Adjust path as needed 
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "multiagent.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full px-6 md:px-12 py-4 transition-all duration-300 ${
        isScrolled ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-mint font-bold text-2xl">
         // Saivarun TR //
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <button onClick={() => scrollToSection("about")} className="nav-link">
            <span className="text-mint font-mono text-sm mr-1">01.</span> About
          </button>
          <button onClick={() => scrollToSection("work")} className="nav-link">
            <span className="text-mint font-mono text-sm mr-1">02.</span> Work
          </button>
          <button onClick={() => scrollToSection("skills")} className="nav-link">
            <span className="text-mint font-mono text-sm mr-1">03.</span> Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className="nav-link">
            <span className="text-mint font-mono text-sm mr-1">04.</span> Contact
          </button>
          <Link to="/merch" className="nav-link flex items-center">
            <span className="text-mint font-mono text-sm mr-1">05.</span> Shop
            <ShoppingBag className="ml-1 h-4 w-4 text-mint" />
          </Link>
          <a href="https://github.com/varun-TR/p-999973/raw/215dc18c79c981c09dd6ee8a7af4f1b0020b7ef5/public/assest/Resume.Saivarun__.pdf" download="Resume_Saivarun.pdf">
            <Button
              variant="outline"
              className="ml-4 border-mint text-mint hover:bg-mint/10"
            >
            Resume
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-navy-light/95 z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-xl">
          <button onClick={() => scrollToSection("about")} className="nav-link">
            <span className="text-mint font-mono text-sm block mb-1 text-center">
              01.
            </span>
            About
          </button>
          <button onClick={() => scrollToSection("work")} className="nav-link">
            <span className="text-mint font-mono text-sm block mb-1 text-center">
              02.
            </span>
            Work
          </button>
          <button onClick={() => scrollToSection("skills")} className="nav-link">
            <span className="text-mint font-mono text-sm block mb-1 text-center">
              03.
            </span>
            Skills
          </button>
          <button onClick={() => scrollToSection("contact")} className="nav-link">
            <span className="text-mint font-mono text-sm block mb-1 text-center">
              04.
            </span>
            Contact
          </button>
          <Link to="/merch" className="nav-link flex flex-col items-center">
            <span className="text-mint font-mono text-sm block mb-1 text-center">
              05.
            </span>
            Shop
            <ShoppingBag className="mt-1 h-4 w-4 text-mint" />
          </Link>
          <a href="https://github.com/varun-TR/p-999973/raw/215dc18c79c981c09dd6ee8a7af4f1b0020b7ef5/public/assest/Resume.Saivarun__.pdf" download="Resume_Saivarun.pdf">
            <Button
              variant="outline"
              className="ml-4 border-mint text-mint hover:bg-mint/10"
            >
            Resume
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;