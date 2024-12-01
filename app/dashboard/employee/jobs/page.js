import JobListings from './components/JobListings'

export default function JobsPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
      <JobListings />
    </div>
  )
}

