
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Folder } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    id: 1,
    title: "Geoweaver",
    description: "An open-source, in-browser tool for simplifying data processing workflows with high-performance server support, featuring code history and workflow orchestration.",
    tags: ["Java", "React", "CSS", "Firebase", "Cypress", "Python"],
    links: {
      github: "https://github.com/ESIPFed/Geoweaver",
      live: "https://geoweaver.dev/" 
    },
    featured: true,
    image: "https://i.imgur.com/OZVw848.png"
  },
  {
    id: 2,
    title: "DARIA-3o",
    description: "A Chatbot created for Virginia Department of Transportation (VDOT) website, an integrated platform for information management.",
    tags: ["Python","Streamlit", "LangChain", "FAISS"],
    links: {
      github: "https://github.com/varun-TR/DARIA-3o",
      live: "https://www.canva.com/design/DAGXWs03NH8/wcGvwMGcHKLUX8goj5cAFQ/edit"
    },
    featured: true,
    image: "https://i.imgur.com/QoVFule.jpeg"
  },
  {
    id: 3,
    title: "My Fullstack Portfolio",
    description: "Full-stack portfolio built with Next.js, React, HTML, and CSS. It includes a merch shop with Stripe payments, Supabase integration, and Render hosting, along with interactive features.",
    tags: ["React", "Next.js", "Node.js", "Express","Supabase","Stripe","Vitejs","HTML","CSS","Javascript","SQL"],
    links: {
      github: "https://github.com/varun-TR/p-999973"
    }
  },
  {
    id: 4,
    title: "Sentiment Analysis with Custom Naive Bayes and TF-IDF",
    description: "A custom Naive Bayes classifier for sentiment analysis of tweets using TF-IDF and stemming. It preprocesses text, converts it into feature vectors, and predicts sentiment labels. Performance is evaluated with accuracy and a confusion matrix.",
    tags: ["Python","Jupyter Notebook", "Numpy", "Pandas", "NLTK"],
    links: {
      github: "https://github.com/varun-TR/custom_naivebayes"
    }
  },
  {
    id: 5,
    title: "Infringement URL Analysis",
    description: "This repository contains a Python script designed to flatten nested data structures, extract and analyze infringing URLs, and generate insightful summaries. The project utilizes parallel processing to efficiently handle large datasets, making it suitable for high-performance environments.",
    tags: ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn"],
    links: {
      github: "https://github.com/varun-TR/infringement-url-analyzer/tree/470d2b5c7c08d0ad1913df88e1244adc4f0b8874"
    }
  },
  {
    id: 6,
    title: "Atliq Company Sales Dashboard",
    description: "This project uses SQL for data analysis and Tableau for visualizing Atliq's sales data. It answers key questions on revenue, sales trends, and market performance. Insights from the analysis help in shaping market strategies and improving sales. The dataset is visualized in Tableau to highlight growth and seasonal trends.",
    tags: ["SQL", "Tableau"],
    links: {
      github: "https://github.com/varun-TR/Atliq_sales_insights?tab=readme-ov-file"
    }
  }
];

const Projects = () => {
  const otherProjects = projects.filter(p => !p.featured);
  
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-navy-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading opacity-0 animate-fade-in">
          <span className="text-mint font-mono text-lg mr-2">02.</span> Some Things I've Built
        </h2>
        
        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {projects.filter(p => p.featured).map((project, index) => (
            <div 
              key={project.id}
              className={`relative grid md:grid-cols-12 items-center gap-10 opacity-0 animate-fade-in animate-delay-100`}
            >
              {/* Project Image */}
              <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-mint/20 rounded transition-opacity group-hover:opacity-0 z-[5]"></div>
                  <a href={project.links.live || project.links.github} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="overflow-hidden rounded">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full transition-transform duration-300 group-hover:scale-105 rounded"
                      />
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Project Info */}
              <div className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-2 md:text-right' : 'md:order-1'}`}>
                <p className="font-mono text-mint mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-slate-light mb-4">
                  <a href={project.links.live || project.links.github} className="hover:text-mint transition-colors">
                    {project.title}
                  </a>
                </h3>
                <div className={`relative z-10 p-6 rounded-lg bg-navy-light/70 backdrop-blur shadow-xl mb-4 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                  <p className="text-slate">{project.description}</p>
                </div>
                <ul className={`flex flex-wrap gap-3 mb-4 text-sm font-mono text-slate ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  {project.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
                <div className={`flex gap-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-light hover:text-mint transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-slate-light hover:text-mint transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Other Projects */}
        <h3 className="text-2xl text-center font-bold text-slate-light mb-10 opacity-0 animate-fade-in animate-delay-200">
          Other Noteworthy Projects
        </h3>
        
        <div className="relative py-4">
          <Carousel 
            className="w-full opacity-0 animate-fade-in animate-delay-200"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {otherProjects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-1/3 lg:basis-1/3">
                  <Card 
                    className="bg-navy-light border-navy-light h-full hover:-translate-y-2 transition-transform"
                  >
                    <CardContent className="p-7 h-full flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <Folder className="text-mint" size={40} />
                        <div className="flex gap-4">
                          {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-mint transition-colors">
                              <Github size={20} />
                            </a>
                          )}
                          {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-mint transition-colors">
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-light mb-2">
                        <a href={project.links.live || project.links.github} className="hover:text-mint transition-colors">
                          {project.title}
                        </a>
                      </h3>
                      
                      <p className="text-slate mb-6 flex-grow">{project.description}</p>
                      
                      <ul className="flex flex-wrap gap-3 mt-auto text-xs font-mono text-slate">
                        {project.tags.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end space-x-2 mt-6">
              <CarouselPrevious className="relative static translate-y-0 left-0 right-auto text-mint border-mint hover:bg-mint/10 hover:text-mint" />
              <CarouselNext className="relative static translate-y-0 left-0 right-auto text-mint border-mint hover:bg-mint/10 hover:text-mint" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
