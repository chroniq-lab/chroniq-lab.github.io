import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
              At <span className="font-bold">Chroniq Lab</span>, we ask two questions.
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>

          {/* Main Questions */}
          <div className="space-y-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Who is your metabolic look-alike?
              </h2>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                What are you at risk for?
              </h2>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-center sm:items-center">
            <Link
              href="/tools"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              Explore our tools
            </Link>
            <Link
              href="/team"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              Meet our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
