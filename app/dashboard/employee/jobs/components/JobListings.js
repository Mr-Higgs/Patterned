'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../../../lib/supabase'
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react'

export default function JobListings() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    date: '',
    payRate: '',
  })
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')

      if (error) {
        console.error('Error fetching jobs:', error)
      } else {
        setJobs(data)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(filters.role.toLowerCase()) &&
        job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (filters.date === '' || job.created_at.startsWith(filters.date)) &&
        (filters.payRate === '' || job.pay_rate >= filters.payRate)
      )
    })
    setFilteredJobs(filtered)
  }, [jobs, filters])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleApply = async (jobId) => {
    // Add your apply logic here
    console.log('Applying for job:', jobId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={filters.role}
            onChange={handleFilterChange}
            className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="payRate"
            placeholder="Minimum Pay Rate"
            value={filters.payRate}
            onChange={handleFilterChange}
            className="pl-10 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>${job.pay_rate}/hr</span>
            </div>
            <button
              onClick={() => handleApply(job.id)}
              className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

