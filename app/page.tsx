"use client"

import { useState, useEffect, useRef } from "react"
import {
  Moon,
  Sun,
  GithubIcon,
  LinkedinIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Download,
  Instagram,
  InstagramIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentProjectSet, setCurrentProjectSet] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [darkMode])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollY(window.scrollY)

        // Determine current section based on scroll position
        const sections = ["home", "about", "projects", "contact"]
        const sectionHeight = window.innerHeight
        const currentSectionIndex = Math.floor(window.scrollY / sectionHeight)
        setCurrentSection(Math.min(currentSectionIndex, sections.length - 1))
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const scrollToNext = () => {
    const sections = ["home", "about", "projects", "contact"]
    const nextSection = Math.min(currentSection + 1, sections.length - 1)
    scrollToSection(sections[nextSection])
  }

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Chat Application",
      description:
        "A real-time chat application with user authentication, online status, and instant messaging using Socket.io. Built with MERN stack and supports dark mode + responsive UI.",
      image: "/projects/BuzzUp-chat-app.jpg",
      liveDemo: "https://mern-stack-chat-app-6w6l.onrender.com/",
      github: "https://github.com/Saransh-P/MERN-Stack-Chat-App.git",
      technologies: ["React", "Node.js", "Socket.io", "Express.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A modern, responsive personal portfolio built using Next.js and TailwindCSS. Showcases my skills, projects, and contact details, with support for dark mode and a clean, minimal UI.",
      image: "/projects/self-portfolio.jpg",
      liveDemo: "https://saranshpathak.com",
      github: "https://github.com/Saransh-P/portfolio-website.git",
      technologies: ["Next.js", "TailwindCSS", "React", "TypeScript"]
    },


    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with location-based forecasts. Built using React, TailwindCSS, and OpenWeather API integration.",
      image: "/projects/weather-dashboard.jpeg",
      liveDemo: "https://weather.saranshpathak.com",
      github: "https://github.com/saranshpathak/weather-app",
      technologies: ["React", "TailwindCSS", "OpenWeather API", "Chart.js"]
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce solution built with React and Node.js. Features include real-time inventory management and a responsive admin dashboard.",
      image: "/projects/ecommerce.jpg",
      liveDemo: "https://ecommerce.saranshpathak.com",
      github: "https://github.com/saranshpathak/ecommerce-platform",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Redux", ]
    },
  ]

  // Photography Images for the carousel
  const photographyImages = [
    "/hobby-carousal/photo1.jpg?height=450&width=450",
    "/hobby-carousal/photo2.jpg?height=450&width=450",
    "/hobby-carousal/photo3.jpg?height=450&width=450",
    "/hobby-carousal/photo4.jpg?height=450&width=450",
    "/hobby-carousal/photo5.jpg?height=450&width=450",
  ]

  // Projects per page
  const getProjectsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 768) return 2
      return 1
    }
    return 3 // Default for server-side rendering
  }

  const [projectsPerPage, setProjectsPerPage] = useState(3) // Default to 3 initially

  //resize the projects per page
  useEffect(() => {
    if (typeof window !== "undefined") {
      setProjectsPerPage(getProjectsPerPage()) // Set initial value
      
      const handleWindowResize = () => {
        setProjectsPerPage(getProjectsPerPage())
      }

      window.addEventListener("resize", handleWindowResize)
      return () => window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const totalProjectSets = Math.ceil(projects.length / projectsPerPage) //total project sets
  const currentProjects = projects.slice(currentProjectSet * projectsPerPage, (currentProjectSet + 1) * projectsPerPage) //current projects

  //next project set 
  const nextProjectSet = () => {
    setCurrentProjectSet((prev) => (prev + 1) % totalProjectSets)
  }

  //previous project set 
  const prevProjectSet = () => {
    setCurrentProjectSet((prev) => (prev - 1 + totalProjectSets) % totalProjectSets)
  }

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photographyImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [photographyImages.length])

  //next photo in the carousel
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photographyImages.length)
  }

  //previous photo in the carousel
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photographyImages.length) % photographyImages.length)
  }

  // Function to determine technology category and corresponding color classes for project cards.
  const getTechColorClasses = (tech: string) => {
    const frontend = ["React", "Next.js", "TailwindCSS", "TypeScript", "JavaScript", "HTML", "CSS", "Vue", "Angular", "Framer Motion", "Chart.js", "D3.js"];
    const backend = ["Node.js", "Express.js", "Django", "Flask", "Spring", "NestJS"];
    const database = ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite"];
    const auth = ["JWT", "OAuth", "Auth0", "Firebase Auth"];
    const tools = ["Git", "Docker", "Nginx", "AWS", "Stripe", "OpenWeather API"];
    const realtime = ["Socket.io", "WebSocket", "RabbitMQ", "Redis"];
    const state = ["Redux", "Zustand", "MobX", "Context API"];

    if (frontend.includes(tech)) {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
    } else if (backend.includes(tech)) {
      return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
    } else if (database.includes(tech)) {
      return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800";
    } else if (auth.includes(tech)) {
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800";
    } else if (realtime.includes(tech)) {
      return "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800";
    } else if (state.includes(tech)) {
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800";
    } else if (tools.includes(tech)) {
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    }
    return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`} ref={containerRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="animated-bg">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  '--move-x': `${(Math.random() - 0.5) * 200}px`,
                  '--move-y': `${(Math.random() - 0.5) * 200}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="waves">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
          </div>
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="glow glow-3" />
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ 
            width: typeof window !== 'undefined' 
              ? `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
              : '0%' 
          }}
        />
      </div>

      {/* Morphing Scroll Guide */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="scroll-guide">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`scroll-dot ${currentSection === index ? "active" : ""}`}
              onClick={() => scrollToSection(["home", "about", "projects", "contact"][index])}
            />
          ))}
        </div>
      </div>

      <div className="bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 nav-brand">
                <span className="text-2xl animate-bounce-slow">👨‍💻</span>
                <span className="font-bold text-xl">Saransh Pathak</span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {["Home", "About Me", "Projects", "Contact"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => {
                      const sectionId = item === "About Me" ? "about" : item.toLowerCase().replace(" ", "")
                      scrollToSection(sectionId)
                    }}
                    className={`nav-link ${currentSection === index ? "active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="theme-toggle hover:scale-110 transition-transform duration-300"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mobile-menu-toggle"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""} md:hidden`}>
              <div className="mobile-menu-content">
                {["Home", "About Me", "Projects", "Contact"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => {
                      const sectionId = item === "About Me" ? "about" : item.toLowerCase().replace(" ", "")
                      scrollToSection(sectionId)
                      setMobileMenuOpen(false)
                    }}
                    className={`mobile-nav-link ${currentSection === index ? "active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Home Section */}
        <section id="home" className="section-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <h1 className="text-4xl md:text-6xl font-bold gradient-text">Saransh Pathak</h1>
                <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
                  Full Stack Web Developer
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Full-stack developer (MERN) | Open to freelance & full-time opportunities | Let's build something awesome.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="interactive-btn flex items-center gap-2"
                    onClick={() => window.open('https://github.com/Saransh-P', '_blank')}
                  >
                    <GithubIcon className="h-5 w-5" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="interactive-btn flex items-center gap-2"
                    onClick={() => window.open('https://www.linkedin.com/in/saransh-pathak/', '_blank')}
                  >
                    <LinkedinIcon className="h-5 w-5" />
                    LinkedIn
                  </Button>
                  <Button
                    size="lg"
                    className="interactive-btn-primary flex items-center gap-2"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  >
                    <Download className="h-5 w-5" />
                    Resume
                  </Button>
                </div>
              </div>

              <div className="flex justify-center animate-slide-in-right">
                <div className="profile-container">
                  <div className="profile-ring">
                    <div className="profile-image">
                      <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="section-full flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">About Me</h2>
            <div className="section-divider"></div>

            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="glass-tabs mx-auto">
                <TabsTrigger value="skills" className="tab-trigger">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="hobby" className="tab-trigger">
                  Hobby
                </TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="animate-fade-in about-tab-content">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-4">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm a passionate full-stack web developer with a focus on building responsive, real-time web applications using the MERN stack (MongoDB, Express.js, React, Node.js). I love turning ideas into functional, user-friendly interfaces and scalable backends.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Even as a fresher, I've built hands-on projects like a real-time chat application and modern, responsive websites — with features like authentication, dark mode, and mobile-first design.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm currently open to full-time roles, freelance opportunities, and collaborations where I can bring value through clean code and creative problem-solving.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed ">
                    I love discovering UI/UX patterns, playing with animations, and refining how I work. Let's build something great together!  
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <Button
                        size="lg"
                        className="interactive-btn-primary flex items-center gap-2"
                        onClick={() => window.open('/resume.pdf', '_blank')}
                      >
                        <Download className="h-5 w-5" />
                        Download Resume
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="interactive-btn flex items-center gap-2"
                        onClick={() => scrollToSection('projects')}
                      >
                        <ExternalLink className="h-5 w-5" />
                        View Projects
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="skill-category">
                      <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                        {["HTML", "CSS", "JavaScript", "React.js","TypeScript", "Next.js", "Bootstrap", "TailwindCSS", "DaisyUI",].map(
                          (skill) => (
                            <span key={skill} className="skill-tag skill-tag-blue">
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="skill-category">
                      <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Backend</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Node.js", "Express.js", "Django"].map((skill) => (
                          <span key={skill} className="skill-tag skill-tag-green">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="skill-category">
                      <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                        Authentication & State
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["JWT", "Zustand", "RESTful API", "Django Rest Framework"].map((skill) => (
                          <span key={skill} className="skill-tag skill-tag-purple">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="skill-category">
                      <h3 className="text-xl font-semibold mb-3 text-orange-600 dark:text-orange-400">Other Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Git", "Nginx", "RabbitMQ", "Socket.io"].map((skill) => (
                          <span key={skill} className="skill-tag skill-tag-orange">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hobby" className="animate-fade-in about-tab-content">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm a passionate hobbyist photographer who finds joy in capturing everyday moments through a creative lens. Photography, for me, is more than just a hobby—it's a way to observe the world more closely, appreciate the details, and tell stories without words.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I enjoy exploring streets, light, and mood to frame shots that evoke emotion and atmosphere. Whether it's a fleeting expression, a quiet corner, or the rhythm of urban life, I love the challenge of preserving those moments in a meaningful way.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Though self-taught, I'm always learning—experimenting with composition, lighting, and post-processing to refine my style and grow as a visual storyteller. Photography keeps me grounded, inspired, and constantly curious.
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="interactive-btn-insta flex items-center gap-2"
                      onClick={() => window.open('https://www.instagram.com/subtlestray?igsh=Y2dpN3ZubnU2Nmxr', '_blank')}
                    >
                      <InstagramIcon className="h-4 w-4" />
                      @subtlestray
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="photo-carousel">
                      <div className="carousel-image-container">
                        {photographyImages.map((image, index) => (
                          <div
                            key={index}
                            className={`carousel-image ${index === currentPhotoIndex ? 'active' : ''}`}
                          >
                            <img
                              src={image}
                              alt={`Photography ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="carousel-btn carousel-btn-left"
                        onClick={prevPhoto}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="carousel-btn carousel-btn-right"
                        onClick={nextPhoto}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <div className="carousel-dots">
                        {photographyImages.map((_, index) => (
                          <button
                            key={index}
                            className={`carousel-dot ${index === currentPhotoIndex ? "active" : ""}`}
                            onClick={() => setCurrentPhotoIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">Projects</h2>
            <div className="section-divider"></div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <Card key={project.id} className="project-card h-[500px] flex flex-col" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="project-image-container">
                      <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs rounded-full border ${getTechColorClasses(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <Button
                          size="sm"
                          className="interactive-btn-primary flex items-center gap-2"
                          onClick={() => window.open(project.liveDemo, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="interactive-btn flex items-center gap-2"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <GithubIcon className="h-4 w-4" />
                          GitHub
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalProjectSets > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevProjectSet}
                    disabled={currentProjectSet === 0}
                    className="interactive-btn"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {currentProjectSet + 1} of {totalProjectSets}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextProjectSet}
                    disabled={currentProjectSet === totalProjectSets - 1}
                    className="interactive-btn"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="section-full flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Get in touch</h2>
            <div className="section-divider"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              I'm always open to discussing new opportunities and interesting projects. 
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="contact-card">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-lg">+91 93070 37321</span>
              </div>
              <div className="contact-card">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-lg">saranshp510@gmail.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 dark:text-gray-300">© 2025 Saransh Pathak. All rights reserved.</p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="interactive-btn"
                  onClick={() => window.open('https://github.com/Saransh-P', '_blank')}
                >
                  <GithubIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="interactive-btn"
                  onClick={() => window.open('https://www.linkedin.com/in/saransh-pathak/', '_blank')}
                >
                  <LinkedinIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
