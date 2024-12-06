'use client'
import Image from "next/image"
import { Card } from './Card'

export function Testimonials({ viewMode, accentColor }) {
  const testimonials = [
    { name: "Alex Thompson", role: "Professional DJ", image: "/placeholder.svg", quote: "Patterned has revolutionized my career in the nightlife industry. I've secured gigs at world-renowned clubs and festivals, expanding my network beyond my wildest dreams. The platform's user-friendly interface and powerful matching algorithm have made finding and applying for high-profile opportunities a breeze." },
    { name: "Sarah Rodriguez", role: "Elite Bartender", image: "/placeholder.svg", quote: "As a mixologist, Patterned has been a game-changer. I've had the chance to work at exclusive events and collaborate with top-tier venues. The flexibility in scheduling and the ability to showcase my unique skills have significantly boosted my income and professional growth." },
    { name: "Mike Johnson", role: "Event Coordinator", image: "/placeholder.svg", quote: "Patterned has transformed how we staff our events. The quality of talent we've accessed is unparalleled, and the platform's features like 'Hot Cue' have made planning large-scale events months in advance a smooth process. It's become an indispensable tool in our event management arsenal." },
    { name: "Emily Chen", role: "Nightclub Owner", image: "/placeholder.svg", quote: "Running a successful nightclub requires having the best talent, and Patterned delivers every time. The 'Last Call' feature has been a lifesaver for last-minute staffing needs. The caliber of professionals we've hired through Patterned has elevated our venue's reputation and customer experience." },
  ]

  return (
    <section className={`w-full py-16 sm:py-20 md:py-32 ${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-white'}`} id="testimonials">
      <div className="container px-4 sm:px-6 md:px-10 mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12 sm:mb-16">Success Stories</h2>
        <div className="grid gap-6 sm:gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`${viewMode === 'talent' ? 'bg-zinc-900/50' : 'bg-gray-100'} p-6 sm:p-8 border border-orange-500/20 rounded-2xl hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300`}>
              <p className={`text-base sm:text-lg lg:text-xl ${viewMode === 'talent' ? 'text-gray-300' : 'text-gray-700'} italic mb-6`}>
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
  )
} 