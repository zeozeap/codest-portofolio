"use client";

import { motion } from "framer-motion";
import WebIcon from "@mui/icons-material/Web";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import StorageIcon from "@mui/icons-material/Storage";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BrushIcon from "@mui/icons-material/Brush";
import SpeedIcon from "@mui/icons-material/Speed";

const services = [
  {
    icon: WebIcon,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with Next.js, React, and cutting-edge technologies for optimal performance.",
  },
  {
    icon: ViewInArIcon,
    title: "3D Experiences",
    description:
      "Immersive 3D web experiences using Three.js and WebGL that captivate users and elevate your brand.",
  },
  {
    icon: StorageIcon,
    title: "Backend Solutions",
    description:
      "Scalable, secure backend architectures with Node.js, Express, and MongoDB for robust data management.",
  },
  {
    icon: PhoneIphoneIcon,
    title: "Responsive Design",
    description:
      "Pixel-perfect designs that look stunning on every device, from mobile phones to large desktop displays.",
  },
  {
    icon: BrushIcon,
    title: "UI/UX Design",
    description:
      "Intuitive user interfaces and seamless experiences designed to delight users and drive conversions.",
  },
  {
    icon: SpeedIcon,
    title: "Performance Optimization",
    description:
      "Lightning-fast load times and smooth interactions through advanced optimization techniques.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-neon mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            <span className="text-foreground">Our </span>
            <span className="text-neon">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive digital solutions tailored to transform your ideas
            into exceptional products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:neon-border hover:scale-[1.02]">
                <div className="w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center mb-6 group-hover:bg-neon/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-neon" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
