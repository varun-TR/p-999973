import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [nameText] = useState("Your Name.");

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto opacity-0 animate-fade-in">
        <p className="font-mono text-mint mb-5">Hi, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-light mb-4 jiggle-text">
          {nameText.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 50}ms` }}>
              {char}
            </span>
          ))}
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-slate mb-6">
          I build things for the web.
        </h2>
        <p className="text-slate max-w-xl text-lg mb-12">
          I'm a web developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products.
        </p>
        <Button 
          onClick={scrollToContact}
          className="btn flex items-center gap-2 group"
        >
          Get In Touch
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
