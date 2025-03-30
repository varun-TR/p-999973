import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        "service_9odylrb", // Replace with your EmailJS service ID
        "template_0cklqi4", // Replace with your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "jydqDVaNEWIU_Wjnv" // Replace with your EmailJS user ID
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the message. Please try again later.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-navy-dark">
      <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in">
        <h2 className="font-mono text-mint mb-3">04. What's Next?</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-slate-light mb-6">Get In Touch</h3>
        <p className="text-slate text-lg mb-12 max-w-xl mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-slate-light">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-navy-light border-slate-dark focus:border-mint focus-visible:ring-mint"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-slate-light">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="bg-navy-light border-slate-dark focus:border-mint focus-visible:ring-mint"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-slate-light">Message</label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              className="min-h-32 bg-navy-light border-slate-dark focus:border-mint focus-visible:ring-mint"
            />
          </div>
          <div className="flex justify-center">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="btn px-8 py-3 flex items-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={16} className="ml-1" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;