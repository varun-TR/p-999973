
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
    title: "Project One",
    description: "A modern web application built with React, TypeScript, and Tailwind CSS. Features include user authentication, responsive design, and real-time data updates.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    links: {
      github: "#",
      live: "#"
    },
    featured: true,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2652&q=80"
  },
  {
    id: 2,
    title: "Project Two",
    description: "An e-commerce platform with a focus on smooth user experience and optimized performance. Includes features like product filtering, cart management, and secure checkout.",
    tags: ["Next.js", "Redux", "Stripe", "MongoDB"],
    links: {
      github: "#",
      live: "#"
    },
    featured: true,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80"
  },
  {
    id: 3,
    title: "Project Three",
    description: "A dashboard application built for data visualization and analytics. Includes interactive charts, data filtering, and export capabilities.",
    tags: ["React", "D3.js", "Node.js", "Express"],
    links: {
      github: "#"
    }
  },
  {
    id: 4,
    title: "Project Four",
    description: "A mobile-first web application for task management with collaborative features. Includes real-time updates, notifications, and offline capability.",
    tags: ["React Native", "GraphQL", "Apollo", "AWS"],
    links: {
      github: "#"
    }
  },
  {
    id: 5,
    title: "Project Five",
    description: "A blog platform built with a focus on performance and SEO. Features include content management, comments, and social sharing.",
    tags: ["Gatsby", "MDX", "Netlify CMS"],
    links: {
      github: "#"
    }
  },
  {
    id: 6,
    title: "Project Six",
    description: "A CLI tool for automating development workflows. Helps with tasks like code generation, project scaffolding, and deployments.",
    tags: ["Node.js", "CLI", "Automation"],
    links: {
      github: "#"
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
        
        <div className="flex justify-center mt-12">
          <Button variant="outline" className="btn">
            View More Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
