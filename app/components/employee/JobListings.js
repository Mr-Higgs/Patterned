'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../lib/supabase'

export default function JobListings() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    date: '',
    payRate: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    const { data, error } = await supabase.from('jobs').select('*')
    if (error) console.error('Error fetching jobs:', error)
    else setJobs(data)
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      return (
        (!filters.role || job.role.toLowerCase().includes(filters.role.toLowerCase())) &&
        (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.date || new Date(job.date) >= new Date(filters.date)) &&
        (!filters.payRate || job.pay_rate >= parseFloat(filters.payRate))
      )
    })
  }, [jobs, filters])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleApply = async (jobId) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('applications')
      .insert({ job_id: jobId, user_id: user.id, status: 'pending' })

    if (error) console.error('Error applying for job:', error)
    else console.log('Successfully applied for job')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={filters.role}
          onChange={handleFilterChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border rounded p-2"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border rounded p-2"
        />
        <input
          type="number"
          name="payRate"
          placeholder="Minimum Pay Rate"
          value={filters.payRate}
          onChange={handleFilterChange}
          className="border rounded p-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="border rounded p-4 space-y-2">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Pay Rate: ${job.pay_rate}/hr</p>
            <button
              onClick={() => handleApply(job.id)}
              className="bg-primary text-background px-4 py-2 rounded hover:bg-primary-dark"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

