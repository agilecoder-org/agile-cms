import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ShieldCheck, LayoutGrid, Zap, Code, Users, Lock, FileText, Settings, Globe, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigation = (section: any) => {
    setActiveSection(section);
    console.log(`Navigating to: ${section}`);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: LayoutGrid,
      title: "Multi-Blog Management",
      description: "Create and manage unlimited niche blogs from one unified dashboard. Perfect for writers with multiple interests.",
      color: "text-blue-500"
    },
    {
      icon: Code,
      title: "Clean JSON APIs",
      description: "Each blog gets a secure API endpoint that delivers pure JSON. Use any frontend framework you prefer.",
      color: "text-purple-500"
    },
    {
      icon: ShieldCheck,
      title: "API Key Protection",
      description: "Every blog comes with unique API keys ensuring only authorized clients can access your content.",
      color: "text-green-500"
    },
    {
      icon: Zap,
      title: "Battery-Included Templates",
      description: "Download pre-configured Next.js, React, or Hugo starters with SEO, GA4, and AdSense ready to go.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Granular User Roles",
      description: "Admin, Editor, Author, and Read-only roles with precise permission control for team collaboration.",
      color: "text-indigo-500"
    },
    {
      icon: FileText,
      title: "Powerful Content Editor",
      description: "Rich editor supporting code blocks, tables, columns, videos, internal references, and more.",
      color: "text-pink-500"
    }
  ];

  const problems = [
    "Strapi, Sanity, Contentful — too complex for simple blogging",
    "Ghost CMS — limited to one blog per instance",
    "Traditional CMS — lack JSON APIs for custom frontends",
    "Multiple platforms — scattered content management"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
          >
            Open Source • Self-Hosted • Developer-First
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Agile CMS
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mb-8"
          >
            The lightweight, headless CMS built for managing multiple niche blogs.
            One dashboard, unlimited blogs, complete control.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <Button onClick={() => handleNavigation('auth')} size="lg" className="group">
              Get Started Free
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button onClick={() => handleNavigation('docs')} size="lg" variant="outline">
              View Documentation
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Problem with Existing CMS Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Current content management systems force you to choose between simplicity and flexibility
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700">{problem}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-purple-50 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-100/40 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agile CMS gives you the simplicity of traditional blogging with the power and flexibility developers need
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer">
                    <CardContent className="p-6">
                      <Icon className={`${feature.color} mb-4`} size={40} />
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-700">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Blogs</h3>
            <p className="text-gray-600">
              Set up multiple blogs for different niches. Each gets its own API endpoint and security key.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Write & Manage Content</h3>
            <p className="text-gray-600">
              Use our powerful editor to create rich content. Assign roles, manage permissions, organize posts.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Deploy Your Frontend</h3>
            <p className="text-gray-600">
              Download a pre-configured template with GA4 and AdSense ready. Customize and deploy anywhere.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-20 px-6 bg-gradient-to-br from-white via-purple-50 to-blue-50 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">Built for Real-World Blogging</h2>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1">
                <Globe className="text-blue-500 mb-4" size={40} />
                <h3 className="text-2xl font-semibold mb-3">Complete Blog Setup</h3>
                <p className="text-gray-600 mb-4">
                  Each blog comes with everything you need: GA4 integration for analytics, AdSense configuration for monetization, and customizable settings for SEO optimization.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                    <span>Google Analytics 4 pre-configured</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                    <span>AdSense integration ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                    <span>SEO metadata management</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm">
                  <div className="text-gray-500">// Your blog API</div>
                  <div className="text-blue-600">GET /api/blogs/tech-blog</div>
                  <div className="text-gray-500 mt-2">// Returns clean JSON</div>
                  <div className="text-gray-700">{'{ posts: [...], meta: {...} }'}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse gap-8 items-center"
            >
              <div className="flex-1">
                <Lock className="text-green-500 mb-4" size={40} />
                <h3 className="text-2xl font-semibold mb-3">Team Collaboration</h3>
                <p className="text-gray-600 mb-4">
                  Invite team members with granular permission controls. From read-only access for auditors to full admin privileges, you control exactly who can do what.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Admin: Full system control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Editor: Publish and manage content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Author: Write and submit for review</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                    <Users className="text-purple-600" size={20} />
                    <span className="font-medium">5 team members</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                    <Settings className="text-blue-600" size={20} />
                    <span className="font-medium">Per-blog permissions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                    <ShieldCheck className="text-green-600" size={20} />
                    <span className="font-medium">Role-based access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 max-w-4xl mx-auto text-center"
      >
        <Sparkles className="text-purple-500 mx-auto mb-6" size={48} />
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          We believe everyone should be able to share their multiple passions without the friction of managing content across different platforms. Agile CMS empowers writers, developers, and creators to focus on what matters — their content — while we handle the complexity of multi-blog management.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your Blogging?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join the community of creators managing multiple blogs with ease. Open source, self-hosted, and built for developers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => handleNavigation('auth')} size="lg" variant="secondary" className="group">
              Start Free Today
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button onClick={() => window.open('https://github.com', '_blank')} size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              View on GitHub
            </Button>
          </div>
        </motion.div>
      </motion.section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-lg font-semibold text-white">Agile CMS</p>
          <p className="mb-4">Open source • Self-hosted • Community-driven</p>
          <div className="flex justify-center gap-6 text-sm">
            <button onClick={() => handleNavigation('docs')} className="hover:text-white transition-colors">Documentation</button>
            <button onClick={() => handleNavigation('community')} className="hover:text-white transition-colors">Community</button>
            <button onClick={() => handleNavigation('support')} className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage