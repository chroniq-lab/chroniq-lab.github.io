import Link from 'next/link'

const tools = [
  {
    slug: 'spatial-deidentifier',
    name: 'Spatial De-identifier',
    description:
      'Turns county- and ZIP-level variables into categories so that no combination of categories identifies a State-ZIP or State-County. Runs locally on your machine.',
    tags: ['Python', 'Privacy', 'Geospatial data'],
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Tools</h1>
        <p className="text-lg text-gray-600 mb-10">
          Open-source tools from Chroniq Lab. Email the PI at jvargh7 [at] emory.edu if you have
          any suggestions.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 p-6 transition-shadow"
            >
              <h2 className="text-xl font-medium text-gray-900 mb-2">{tool.name}</h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
