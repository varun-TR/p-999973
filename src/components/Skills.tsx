
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, Database, Layout, Palette, 
  GitBranch, Server, ShieldCheck, Wand2
} from "lucide-react";

const skillCategories = [
  {
    name: "Frontend Development",
    description: "Building responsive and intuitive user interfaces with modern frameworks and libraries.",
    icon: <Layout className="text-mint" size={32} />,
    skills: [
      "HTML & CSS", "JavaScript (ES6+)", "TypeScript", 
      "React", "Next.js", "Tailwind CSS"
    ]
  },
  {
    name: "Backend Development",
    description: "Developing robust server-side applications and APIs to power web applications.",
    icon: <Server className="text-mint" size={32} />,
    skills: [
      "Node.js", "Express", "RESTful APIs",
      "GraphQL", "Authentication", "Middleware"
    ]
  },
  {
    name: "Database Management",
    description: "Designing and managing databases for efficient data storage and retrieval.",
    icon: <Database className="text-mint" size={32} />,
    skills: [
      "MongoDB", "PostgreSQL", "Firebase",
      "Data Modeling", "ORM/ODM", "Query Optimization"
    ]
  },
  {
    name: "UI/UX Design",
    description: "Creating beautiful and functional user interfaces with a focus on user experience.",
    icon: <Palette className="text-mint" size={32} />,
    skills: [
      "Responsive Design", "Prototyping", "User Flow",
      "Accessibility", "Design Systems", "Visual Hierarchy"
    ]
  },
  {
    name: "DevOps & Deployment",
    description: "Automating workflows and deploying applications to production environments.",
    icon: <GitBranch className="text-mint" size={32} />,
    skills: [
      "Git & GitHub", "CI/CD", "Docker",
      "Netlify", "Vercel", "AWS"
    ]
  },
  {
    name: "Testing & Quality Assurance",
    description: "Ensuring application reliability through comprehensive testing strategies.",
    icon: <ShieldCheck className="text-mint" size={32} />,
    skills: [
      "Jest", "React Testing Library", "Cypress",
      "Unit Testing", "Integration Testing", "E2E Testing"
    ]
  },
  {
    name: "Performance Optimization",
    description: "Enhancing application speed and efficiency for better user experiences.",
    icon: <Wand2 className="text-mint" size={32} />,
    skills: [
      "Lazy Loading", "Code Splitting", "Caching",
      "Bundle Size Optimization", "Image Optimization", "Web Vitals"
    ]
  },
  {
    name: "Programming Languages",
    description: "Proficiency in various programming languages for different application needs.",
    icon: <Code className="text-mint" size={32} />,
    skills: [
      "JavaScript", "TypeScript", "Python",
      "HTML", "CSS", "SQL"
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading opacity-0 animate-fade-in">
          <span className="text-mint font-mono text-lg mr-2">03.</span> My Skills
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.name} 
              className="bg-navy-light border-navy-light h-full hover:-translate-y-2 transition-transform duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              <CardContent className="p-7">
                <div className="flex items-start mb-4">
                  {category.icon}
                  <h3 className="text-xl font-bold text-slate-light ml-3">
                    {category.name}
                  </h3>
                </div>
                
                <p className="text-slate mb-6">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map(skill => (
                    <div key={skill} className="flex items-center">
                      <span className="text-mint mr-2">▹</span>
                      <span className="text-slate-light text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
