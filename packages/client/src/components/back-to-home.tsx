import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BackButton = () => (
  <div className="mb-5">
    <Link
      to="/"
      className="group inline-flex items-center gap-2 font-medium"
    >
      <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
      Back to Home
    </Link>
  </div>
)

export default BackButton
