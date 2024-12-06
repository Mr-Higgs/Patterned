'use client'
import { DollarSign, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { Card } from './Card'

export function JobOpportunities({ viewMode, accentColor, buttonBgColor, buttonTextColor }) {
  const jobOpportunities = [
    { title: "Bartender", venue: "Skyline Lounge", location: "New York, NY", salary: "$25-35/hr", type: "Full-Time" },
    { title: "DJ", venue: "Club Neon", location: "Los Angeles, CA", salary: "$200-400/night", type: "Contract" },
    { title: "Security Guard", venue: "The Grand Ballroom", location: "Chicago, IL", salary: "$20-30/hr", type: "Part-Time" },
    { title: "Event Coordinator", venue: "Sunset Beach Resort", location: "Miami, FL", salary: "$45-55k/year", type: "Full-Time" },
  ]

  return (
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
            <Card 
              key={index} 
              className={`relative overflow-hidden ${viewMode === 'talent' ? 'bg-zinc-800/50' : 'bg-white'} border border-orange-500/20 rounded-2xl group hover:scale-105 transition-all duration-300`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${accentColor}`}>{job.title}</h3>
                    <p className="mt-2 text-lg text-gray-400">{job.venue}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${viewMode === 'talent' ? 'bg-orange-500/20 text-orange-500' : 'bg-orange-100 text-orange-600'}`}>
                    {job.type}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> {job.salary}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </p>
                </div>
                <Button className={`mt-6 w-full ${buttonBgColor} ${buttonTextColor} transition-colors rounded-full`}>
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
  )
} 