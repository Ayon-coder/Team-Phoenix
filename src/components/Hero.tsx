import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Package, Shield, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Over 5,000+ resources shared</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Share Academic Resources,
            <span className="text-primary block mt-2">Build Campus Community</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A trusted peer-to-peer marketplace where students exchange books, notes, lab equipment, 
            and study materials within campus. Save money, help peers, and reduce waste.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" className="text-base px-8" asChild>
              <Link to="/products">
                <BookOpen className="h-5 w-5" />
                Browse Resources
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8" asChild>
              <Link to="/add-product">
                <Package className="h-5 w-5" />
                List Your Items
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              { icon: Shield, title: "Verified Students", desc: "Student ID verification for trust" },
              { icon: BookOpen, title: "5000+ Resources", desc: "Books, notes, equipment & more" },
              { icon: Package, title: "Safe Exchange", desc: "In-app messaging & ratings" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card shadow-card hover:shadow-soft transition-all">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
