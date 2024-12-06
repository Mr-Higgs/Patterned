'use client'
import { DollarSign, Flame, Clock, Zap } from 'lucide-react'
import { Card } from './Card'

export function Features({ viewMode, accentColor }) {
  const features = [
    {
      icon: viewMode === 'talent' ? DollarSign : Flame,
      title: viewMode === 'talent' ? 'Premium Opportunities' : 'Hot Cue',
      description: viewMode === 'talent' 
        ? 'Access high-paying gigs at top-tier venues and exclusive events. Elevate your career with opportunities that match your expertise and ambition.'
        : 'Plan your staffing needs well in advance. Hot Cue allows you to post and fill positions months ahead, ensuring you have the best talent lined up for your biggest events.'
    },
    {
      icon: Clock,
      title: viewMode === 'talent' ? 'Flexible Scheduling' : 'Last Call',
      description: viewMode === 'talent'
        ? 'Take control of your work-life balance. Choose shifts that align perfectly with your lifestyle and career goals, maximizing both your earnings and personal time.'
        : 'Need talent ASAP? Last Call feature connects you with available professionals in your area for immediate staffing needs. Never be left short-handed again.'
    },
    {
      icon: Zap,
      title: viewMode === 'talent' ? 'Instant Connections' : 'Talent Insights',
      description: viewMode === 'talent'
        ? 'Network effortlessly with industry leaders and top venues. Build meaningful professional relationships that can open doors to exciting new opportunities.'
        : 'Gain valuable insights into your talent pool. Access performance metrics, reviews, and analytics to make data-driven decisions and build your dream team.'
    }
  ]

  return (
    <section className={`w-full py-16 sm:py-20 md:py-32 ${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-gray-100'}`} id="features">
      <div className="container px-4 sm:px-6 md:px-10 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center mb-12 sm:mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Unlock Your Full Potential</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-[900px]">
              {viewMode === 'talent' 
                ? "Discover why top talent chooses Patterned to skyrocket their careers in the dynamic nightlife industry."
                : "Experience the power of Patterned's innovative features designed to revolutionize your talent acquisition and management."}
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} p-8 border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}
            >
              <feature.icon className={`h-16 w-16 ${accentColor} group-hover:scale-110 transition-transform duration-300`} />
              <h3 className={`mt-6 text-2xl font-bold ${accentColor}`}>{feature.title}</h3>
              <p className="mt-4 text-lg text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 