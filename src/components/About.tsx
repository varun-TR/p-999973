
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
          <p className="text-slate text-lg mb-4"> Hello! I’m Sam Tanjore, a passionate Data Analytics Engineering graduate student at George Mason University, Fairfax, VA, with a deep interest in leveraging data to solve complex problems. As a current Graduate Teaching Assistant and IT Support professional at the university, my journey is fueled by a relentless pursuit of knowledge in Data Modeling, Database Administration, and advanced analytics techniques. </p>
           <p className="text-slate text-lg mb-4"> With a Master’s degree in progress, I blend my expertise in Natural Language Processing (NLP) with hands-on experience in IT solutions. My recent contributions to NASA's geoSMART and ESIPfed projects reflect my commitment to impactful research, where I apply my skills to deliver efficient, transformative outcomes that meet rigorous standards. </p> 
           <p className="text-slate text-lg mb-4"> I thrive on turning complex challenges into intuitive, user-focused solutions. Whether through academic endeavors or practical applications, my goal is to innovate and create systems that not only function seamlessly but also provide exceptional user experiences. Here are a few technologies and areas I’ve been working with recently: Big Data, Database Management, Machine Learning, and programming. </p> 
            <div className="grid grid-cols-2 gap-2 max-w-md font-mono text-sm">
              <div className="flex items-center">
                <span className="text-mint mr-2">▹</span> Python
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
                <span className="text-mint mr-2">▹</span> SQL
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 opacity-0 animate-fade-in animate-delay-200">
            <Card className="group relative max-w-sm mx-auto md:mx-0 overflow-hidden bg-transparent">
              <div className="absolute inset-0 bg-mint/20 rounded-lg transition-opacity group-hover:opacity-0 z-10"></div>
              <div className="relative border-2 border-mint rounded-lg overflow-hidden before:absolute before:inset-0 before:bg-navy-light/50 before:z-[5]">
                <img 
                  src="https://i.imgur.com/aWs7WDP.jpeg" 
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
