
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading opacity-0 animate-fade-in">
          <span className="text-mint font-mono text-lg mr-2">01.</span> About Me
        </h2>
        
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 opacity-0 animate-fade-in animate-delay-100">
            <p className="text-slate text-lg mb-4">
              Hello! I'm a passionate web developer with a love for creating beautiful, 
              functional, and user-friendly websites and applications. My journey in web 
              development began several years ago, and I've been hooked ever since.
            </p>
            <p className="text-slate text-lg mb-4">
              I enjoy tackling complex problems and turning them into simple and intuitive designs. 
              My goal is always to build applications that are not only functional but also 
              provide great user experiences.
            </p>
            <p className="text-slate text-lg mb-4">
              Here are a few technologies I've been working with recently:
            </p>
            
            <div className="grid grid-cols-2 gap-2 max-w-md font-mono text-sm">
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> JavaScript (ES6+)
              </div>
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> React
              </div>
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> TypeScript
              </div>
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> Node.js
              </div>
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> Tailwind CSS
              </div>
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> RESTful APIs
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 opacity-0 animate-fade-in animate-delay-200">
            <Card className="group relative max-w-sm mx-auto md:mx-0 overflow-hidden bg-transparent">
              <div className="absolute inset-0 bg-mint/20 rounded-lg transition-opacity group-hover:opacity-0 z-10"></div>
              <div className="relative border-2 border-mint rounded-lg overflow-hidden before:absolute before:inset-0 before:bg-navy-light/50 before:z-[5]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Profile Photo" 
                  className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
