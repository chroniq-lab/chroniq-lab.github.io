import Image from 'next/image'

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Image */}
        <div className="mb-8">
          <div className="relative w-80 h-80 mx-auto rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/tools/tired_professor.jpg"
              alt="Tools Coming Soon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Coming Soon Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-lg text-gray-600">
            Email the PI at jvargh7 [at] emory.edu if you have any suggestions.
          </p>
        </div>
      </div>
    </div>
  )
}
