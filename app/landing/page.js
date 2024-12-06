'use client'

import { Star, Music, Calendar, Users, Zap, DollarSign, Clock, ArrowRight, Menu, ChevronLeft, ChevronRight, Flame, Bell } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

const Button = ({ children, className = '', variant, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center transition-colors'
  const variantStyles = variant === 'outline' 
    ? 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white' 
    : 'bg-orange-500 hover:bg-orange-600 text-white'
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const Input = ({ className = '', ...props }) => {
  return (
    <input 
      className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
      {...props}
    />
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('talent')

  const roles = ["DJs", "Bartenders", "Event Staff", "Security", "Promoters"]
  const logos = Array(10).fill("/placeholder-logo.svg") // Replace with actual logo paths

  const slides = [
    { title: "Create Your Profile", description: "Showcase your skills and experience in the nightlife industry.", image: "/placeholder.svg" },
    { title: "Discover Opportunities", description: "Browse through exclusive events and high-profile gigs.", image: "/placeholder.svg" },
    { title: "Apply with Ease", description: "One-click applications for positions that match your expertise.", image: "/placeholder.svg" },
    { title: "Perform & Impress", description: "Deliver exceptional service and build your professional network.", image: "/placeholder.svg" },
  ]

  const businessSlides = [
    { title: "Post Your Gig", description: "Easily create and post job listings for your venue or event.", image: "/placeholder.svg" },
    { title: "Browse Top Talent", description: "Access our curated pool of skilled nightlife professionals.", image: "/placeholder.svg" },
    { title: "Schedule Interviews", description: "Efficiently manage and conduct interviews with potential hires.", image: "/placeholder.svg" },
    { title: "Hire with Confidence", description: "Make informed decisions and build your dream team.", image: "/placeholder.svg" },
  ]

  const testimonials = [
    { name: "Alex Thompson", role: "Professional DJ", image: "/placeholder.svg", quote: "Patterned has revolutionized my career in the nightlife industry. I've secured gigs at world-renowned clubs and festivals, expanding my network beyond my wildest dreams. The platform's user-friendly interface and powerful matching algorithm have made finding and applying for high-profile opportunities a breeze." },
    { name: "Sarah Rodriguez", role: "Elite Bartender", image: "/placeholder.svg", quote: "As a mixologist, Patterned has been a game-changer. I've had the chance to work at exclusive events and collaborate with top-tier venues. The flexibility in scheduling and the ability to showcase my unique skills have significantly boosted my income and professional growth." },
    { name: "Mike Johnson", role: "Event Coordinator", image: "/placeholder.svg", quote: "Patterned has transformed how we staff our events. The quality of talent we've accessed is unparalleled, and the platform's features like 'Hot Cue' have made planning large-scale events months in advance a smooth process. It's become an indispensable tool in our event management arsenal." },
    { name: "Emily Chen", role: "Nightclub Owner", image: "/placeholder.svg", quote: "Running a successful nightclub requires having the best talent, and Patterned delivers every time. The 'Last Call' feature has been a lifesaver for last-minute staffing needs. The caliber of professionals we've hired through Patterned has elevated our venue's reputation and customer experience." },
  ]

  const jobOpportunities = [
    { title: "Bartender", venue: "Skyline Lounge", location: "New York, NY", image: "/placeholder.svg" },
    { title: "DJ", venue: "Club Neon", location: "Los Angeles, CA", image: "/placeholder.svg" },
    { title: "Security Guard", venue: "The Grand Ballroom", location: "Chicago, IL", image: "/placeholder.svg" },
    { title: "Event Coordinator", venue: "Sunset Beach Resort", location: "Miami, FL", image: "/placeholder.svg" },
  ]

  const logoRef = useRef(null)

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % (viewMode === 'talent' ? slides.length : businessSlides.length))
    }, 5000)

    return () => clearInterval(slideTimer)
  }, [viewMode])

  useEffect(() => {
    const logoContainer = logoRef.current
    if (logoContainer) {
      const animateLogo = () => {
        logoContainer.style.transition = 'none'
        logoContainer.style.transform = 'translateX(0)'
        setTimeout(() => {
          logoContainer.style.transition = 'transform 30s linear'
          logoContainer.style.transform = 'translateX(-50%)'
        }, 50)
      }

      animateLogo()
      const interval = setInterval(animateLogo, 30000)

      return () => clearInterval(interval)
    }
  }, [])

  const bgColor = viewMode === 'talent' ? 'bg-black' : 'bg-white'
  const textColor = viewMode === 'talent' ? 'text-white' : 'text-gray-900'
  const accentColor = 'text-orange-500'
  const buttonBgColor = viewMode === 'talent' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'
  const buttonTextColor = 'text-white'

  const toggleViewMode = (mode) => {
    if (mode === 'talent' || mode === 'business') {
      setViewMode(mode)
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${bgColor} ${textColor} font-['Montserrat',sans-serif] transition-colors duration-300`}>
      <header className={`px-6 lg:px-10 h-20 flex items-center fixed w-full ${viewMode === 'talent' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md z-50 transition-colors duration-300`}>
        <Link className="flex items-center justify-center" href="#">
          <Image src="/edit logog o ball 2.png" alt="Patterned Logo" width={40} height={40} />
          <span className={`ml-2 text-2xl font-bold ${textColor}`}>Patterned</span>
        </Link>
        <nav className="ml-auto hidden lg:flex items-center space-x-8">
          {['Features', 'How It Works', 'Testimonials'].map((item) => (
            <Link 
              key={item}
              className={`text-sm font-medium ${textColor} hover:${accentColor} transition-colors relative group`}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${accentColor} transition-all group-hover:w-full`}></span>
            </Link>
          ))}
          <Link href="/auth/signup">
            <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-sm px-6 py-2 rounded-full`}>
                Sign Up
            </Button>
          </Link>
          
        </nav>
        <button 
          className={`ml-auto lg:hidden ${textColor}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {isMenuOpen && (
        <div className={`fixed inset-0 ${viewMode === 'talent' ? 'bg-black' : 'bg-white'} z-40 lg:hidden pt-20`}>
          <nav className="flex flex-col items-center gap-8 p-8">
            {['Features', 'How It Works', 'Testimonials'].map((item) => (
              <Link 
                key={item}
                className={`text-xl font-medium ${textColor} hover:${accentColor} transition-colors`}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-lg px-8 py-3 rounded-full mt-4`}>
              Sign Up
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1 pt-20">
        <section className="w-full py-20 md:py-32 lg:py-48 xl:py-64 relative overflow-hidden">
          <div className={`absolute inset-0 ${viewMode === 'talent' ? 'bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]' : 'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)]'}`} />
          <div className="container px-6 md:px-10 relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_700px] items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center mb-6 space-x-4">
                    <Button
                      className={`${viewMode === 'talent' ? buttonBgColor : 'bg-gray-200 hover:bg-gray-300'} ${viewMode === 'talent' ? buttonTextColor : 'text-gray-800'} transition-colors text-lg px-8 py-3 rounded-full`}
                      onClick={() => toggleViewMode('talent')}
                    >
                      For Talent
                    </Button>
                    <Button
                      className={`${viewMode === 'business' ? buttonBgColor : 'bg-gray-200 hover:bg-gray-300'} ${viewMode === 'business' ? buttonTextColor : 'text-gray-800'} transition-colors text-lg px-8 py-3 rounded-full`}
                      onClick={() => toggleViewMode('business')}
                    >
                      For Businesses
                    </Button>
                  </div>
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight">
                    <span className={accentColor}>Elevate</span> Your
                    <br />
                    {viewMode === 'talent' ? 'Nightlife Career' : 'Venue Experience'}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-[700px]">
                    {viewMode === 'talent' 
                      ? `Patterned is the premier platform connecting exceptional ${roles.join(", ")} with prestigious opportunities in the vibrant world of nightlife and entertainment. Showcase your talents, access exclusive gigs, and take your career to new heights.`
                      : "Patterned empowers nightlife businesses to discover, hire, and manage top-tier talent effortlessly. Elevate your venue's performance, streamline staffing, and create unforgettable experiences for your patrons."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-xl px-10 py-6 rounded-full`}>
                    {viewMode === 'talent' ? 'Create Your Profile' : 'Post a Job'}
                  </Button>
                  <Button variant="outline" className={`border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors text-xl px-10 py-6 rounded-full`}>
                    {viewMode === 'talent' ? 'Explore Opportunities' : 'Browse Talent'}
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex -space-x-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 w-12 rounded-full border-2 border-orange-500 overflow-hidden">
                        <Image
                          src="/placeholder.svg"
                          alt={`Profile ${i + 1}`}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-lg text-gray-400">Join 10,000+ {viewMode === 'talent' ? 'professionals' : 'venues'}</span>
                </div>
              </div>
              <div className="relative">
                <div className={`absolute -top-8 -right-8 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl`} />
                <div className={`absolute -bottom-8 -left-8 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl`} />
                <Image
                  alt={viewMode === 'talent' ? "Nightlife Professional" : "Nightlife Venue"}
                  className="mx-auto relative z-10 rounded-3xl object-cover"
                  height={800}
                  src="/placeholder.svg"
                  width={700}
                />
                <div className={`absolute top-8 -right-8 ${viewMode === 'talent' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-4 shadow-lg`}>
                  <p className={`text-xl font-medium ${textColor}`}>{viewMode === 'talent' ? 'DJ' : 'Club Owner'}</p>
                </div>
                <div className={`absolute bottom-8 -left-8 ${viewMode === 'talent' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-4 shadow-lg`}>
                  <p className={`text-xl font-medium ${textColor}`}>{viewMode === 'talent' ? 'Promoter' : 'Event Planner'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`w-full py-16 border-t ${viewMode === 'talent' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="container px-6 md:px-10 overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-8">
              <p className="text-lg text-gray-500 uppercase tracking-wide">Trusted by leading venues and brands</p>
              <div className="w-full overflow-hidden">
                <div ref={logoRef} className="flex gap-12 items-center" style={{width: '200%'}}>
                  {[...logos, ...logos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={logo}
                        alt={`Partner Logo ${index + 1}`}
                        width={180}
                        height={90}
                        className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`w-full py-20 md:py-32 ${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-gray-100'}`} id="features">
          <div className="container px-6 md:px-10 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Unlock Your Full Potential</h2>
                <p className="text-xl md:text-2xl text-gray-400 max-w-[900px]">
                  {viewMode === 'talent' 
                    ? "Discover why top talent chooses Patterned to skyrocket their careers in the dynamic nightlife industry."
                    : "Experience the power of Patterned's innovative features designed to revolutionize your talent acquisition and management."}
                </p>
              </div>
            </div>
            <div className="grid gap-12 lg:grid-cols-3">
              <Card className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} p-8 border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}>
                {viewMode === 'talent' ? <DollarSign className={`h-16 w-16 ${accentColor} group-hover:scale-110 transition-transform duration-300`} /> : <Flame className={`h-16 w-16 ${accentColor} group-hover:scale-110 transition-transform duration-300`} />}
                <h3 className={`mt-6 text-2xl font-bold ${accentColor}`}>{viewMode === 'talent' ? 'Premium Opportunities' : 'Hot Cue'}</h3>
                <p className="mt-4 text-lg text-gray-400">
                  {viewMode === 'talent' 
                    ? 'Access high-paying gigs at top-tier venues and exclusive events. Elevate your career with opportunities that match your expertise and ambition.'
                    : 'Plan your staffing needs well in advance. Hot Cue allows you to post and fill positions months ahead, ensuring you have the best talent lined up for your biggest events.'}
                </p>
              </Card>
              <Card className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} p-8 border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}>
                <Clock className={`h-16 w-16 ${accentColor} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className={`mt-6 text-2xl font-bold ${accentColor}`}>{viewMode === 'talent' ? 'Flexible Scheduling' : 'Last Call'}</h3>
                <p className="mt-4 text-lg text-gray-400">
                  {viewMode === 'talent'
                    ? 'Take control of your work-life balance. Choose shifts that align perfectly with your lifestyle and career goals, maximizing both your earnings and personal time.'
                    : 'Need talent ASAP? Last Call feature connects you with available professionals in your area for immediate staffing needs. Never be left short-handed again.'}
                </p>
              </Card>
              <Card className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} p-8 border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}>
                <Zap className={`h-16 w-16 ${accentColor} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className={`mt-6 text-2xl font-bold ${accentColor}`}>{viewMode === 'talent' ? 'Instant Connections' : 'Talent Insights'}</h3>
                <p className="mt-4 text-lg text-gray-400">
                  {viewMode === 'talent'
                    ? 'Network effortlessly with industry leaders and top venues. Build meaningful professional relationships that can open doors to exciting new opportunities.'
                    : 'Gain valuable insights into your talent pool. Access performance metrics, reviews, and analytics to make data-driven decisions and build your dream team.'}
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className={`w-full py-20 md:py-32 ${viewMode === 'talent' ? 'bg-gradient-to-b from-black to-zinc-900' : 'bg-gradient-to-b from-white to-gray-100'}`} id="how-it-works">
          <div className="container px-6 md:px-10 mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">How Patterned Works</h2>
            <div className="relative overflow-hidden">
              <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {(viewMode === 'talent' ? slides : businessSlides).map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col items-center space-y-6 text-center px-4">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={600}
                        height={400}
                        className="rounded-xl object-cover mb-6"
                      />
                      <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-white text-4xl font-bold`}>
                        {index + 1}
                      </div>
                      <h3 className="text-3xl font-bold">{slide.title}</h3>
                      <p className="text-xl text-gray-400 max-w-2xl">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <button
                className={`mr-4 p-2 rounded-full ${buttonBgColor} ${buttonTextColor}`}
                onClick={() => setCurrentSlide((prev) => (prev - 1 + (viewMode === 'talent' ? slides.length : businessSlides.length)) % (viewMode === 'talent' ? slides.length : businessSlides.length))}
              >
                <ChevronLeft size={24} />
              </button>
              {(viewMode === 'talent' ? slides : businessSlides).map((_, index) => (
                <button
                  key={index}
                  className={`h-4 w-4 rounded-full mx-2 ${currentSlide === index ? 'bg-orange-500' : 'bg-gray-400'}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
              <button
                className={`ml-4 p-2 rounded-full ${buttonBgColor} ${buttonTextColor}`}
                onClick={() => setCurrentSlide((prev) => (prev + 1) % (viewMode === 'talent' ? slides.length : businessSlides.length))}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        <section className={`w-full py-20 md:py-32 ${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-white'}`} id="job-opportunities">
          <div className="container px-6 md:px-10 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Featured Opportunities</h2>
                <p className="text-xl md:text-2xl text-gray-400 max-w-[900px]">
                  Explore exciting job openings in the nightlife industry. Your next big break could be just a click away!
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {jobOpportunities.map((job, index) => (
                <Card key={index} className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}>
                  <Image
                    src={job.image}
                    alt={job.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold ${accentColor}`}>{job.title}</h3>
                    <p className="mt-2 text-lg text-gray-400">{job.venue}</p>
                    <p className="mt-1 text-sm text-gray-500">{job.location}</p>
                    <Button className={`mt-4 ${buttonBgColor} ${buttonTextColor} transition-colors`}>
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/job-search">
                <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-xl px-10 py-4 rounded-full`}>
                  View All Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className={`w-full py-20 md:py-32 ${viewMode === 'talent' ? 'bg-black' : 'bg-white'}`} id="testimonials">
          <div className="container px-6 md:px-10 mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">Success Stories</h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={`${viewMode === 'talent' ? 'bg-zinc-900/50' : 'bg-gray-100'} p-8 border border-orange-500/20 rounded-2xl hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300`}>
                  <p className={`text-xl ${viewMode === 'talent' ? 'text-gray-300' : 'text-gray-700'} italic mb-6`}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className={`text-xl font-bold ${accentColor}`}>{testimonial.name}</p>
                      <p className="text-lg text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className={`w-full py-20 md:py-32 ${viewMode === 'talent' ? 'bg-gradient-to-t from-zinc-900 to-black' : 'bg-gradient-to-t from-gray-100 to-white'}`}>
          <div className="container px-6 md:px-10 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Ready to Transform Your {viewMode === 'talent' ? 'Career' : 'Venue'}?</h2>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                  {viewMode === 'talent'
                    ? "Join thousands of top professionals finding their next big opportunity in the nightlife industry. Your dream gig is just a click away."
                    : "Connect with exceptional talent and revolutionize your staffing process. Elevate your venue's performance and create unforgettable experiences for your patrons."}
                </p>
              </div>
              <div className="w-full max-w-2xl space-y-4">
                <form className="flex space-x-4">
                  <Input
                    className={`flex-1 ${viewMode === 'talent' ? 'bg-zinc-800/50 border-orange-500/20' : 'bg-white border-orange-500/20'} text-lg placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 h-16 rounded-full`}
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-xl px-10 h-16 rounded-full`}>
                    Get Started
                  </Button>
                </form>
                <p className="text-sm text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className={`underline underline-offset-2 hover:${accentColor} transition-colors`} href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-gray-100'} py-12 px-6 md:px-10 border-t ${viewMode === 'talent' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center mb-8 lg:mb-0">
            <Image src="/edit logog o ball 2.png" alt="Patterned Logo" width={40} height={40} />
            <span className={`text-3xl font-bold ml-2 ${textColor}`}>Patterned</span>
          </div>
          <nav className="flex flex-wrap justify-center lg:justify-end gap-8">
            <Link href="#" className={`${textColor} hover:${accentColor} transition-colors`}>About Us</Link>
            <Link href="#" className={`${textColor} hover:${accentColor} transition-colors`}>Careers</Link>
            <Link href="#" className={`${textColor} hover:${accentColor} transition-colors`}>Contact</Link>
            <Link href="#" className={`${textColor} hover:${accentColor} transition-colors`}>Privacy Policy</Link>
            <Link href="#" className={`${textColor} hover:${accentColor} transition-colors`}>Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

