import Link from 'next/link'

const REPO = 'https://github.com/chroniq-lab/spatial-deidentifier'

const outputs = [
  ['run_summary.json', 'One-page overview of the run, including the top-ranked subset.'],
  ['top_subset_cells.csv', 'One row per cell of the top-ranked subset, with counts and pass flags.'],
  ['all_top_subsets_cells.csv', 'The same cell table for every subset tied at the largest size.'],
  ['county_binned.csv / zip_binned.csv', 'Input files with each surviving variable replaced by its final category.'],
  ['bin_defs_final.json', 'Final category definitions, for applying the same categories to new data.'],
  ['search_log.csv, marginal_summary.csv, config.json', 'Diagnostics: every set tested, Phase 1 results and the exact configuration used.'],
]

export default function SpatialDeidentifierPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/tools" className="text-sm text-gray-500 hover:text-gray-700">
          ← Tools
        </Link>

        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-4">
          Spatial De-identifier
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Turns county- and ZIP-level variables into categories so that no combination of
          categories identifies a State-ZIP or State-County. The app then finds the largest set of
          variables that can be released together.
        </p>
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          View on GitHub
        </a>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/tools/spatial-deidentifier-demo.gif"
          alt="Demo: loading county, ZIP and crosswalk files, choosing variables, running, and viewing the top subset"
          className="mt-8 w-full rounded-lg border border-gray-200 shadow-sm"
        />
        <p className="text-sm text-gray-500 mt-2">
          Demo: load the files, pick variables, run, and review the top subset and output files.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-light text-gray-900 mb-3">The pass rule</h2>
          <p className="text-gray-700 mb-3">
            Every cell (one combination of categories) must contain either:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>at least 2 ZIPs in each of at least 2 states, <strong>or</strong></li>
            <li>at least 2 counties in each of at least 2 states.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-light text-gray-900 mb-3">How it works</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900">Phase 1: categorise each variable on its own</h3>
              <p>
                Continuous variables start from the 10/25/50/75/90th percentiles (or your own
                percentiles or cutoffs), and ordinal variables from their levels. Failing
                categories are merged with a neighbour, keeping at least 4. Binary variables are
                never merged. A variable that still fails is excluded.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Phase 2: combine variables</h3>
              <p>
                Sets of variables are tested in increasing size. A set is skipped if a smaller set
                inside it already failed, and failing sets are coarsened by one merge where
                possible. The search stops when no set of the next size passes. Ties are ranked
                county + ZIP first, then ZIP only, then county only.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-light text-gray-900 mb-3">Getting started</h2>
          <p className="text-gray-700 mb-3">
            Everything runs on your machine; nothing is uploaded. You need Python 3.9 or newer.
          </p>
          <ol className="list-decimal pl-6 text-gray-700 space-y-1 mb-4">
            <li>Clone the repository from GitHub.</li>
            <li>
              Launch the app: double-click <code>app/launch.bat</code> (Windows) or run{' '}
              <code>bash app/launch.sh</code> (macOS/Linux). It opens at{' '}
              <code>http://127.0.0.1:8765</code>.
            </li>
            <li>Load the county file, the ZIP file and the ZIP↔county crosswalk (.csv, .xlsx or .parquet).</li>
            <li>Choose the output folder, the ID and state columns, and the variables and their types.</li>
            <li>Run. The app shows the top subset and download links for every output file.</li>
          </ol>
          <p className="text-gray-700 mb-2">Or use the command line (requires numpy, pandas and openpyxl):</p>
          <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
            python app/deidentify.py --config app/example_config.json [--workers N]
          </pre>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-light text-gray-900 mb-3">Output files</h2>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            {outputs.map(([file, desc]) => (
              <div key={file} className="p-4 sm:flex sm:gap-4">
                <code className="text-sm text-gray-900 sm:w-72 shrink-0 break-words">{file}</code>
                <p className="text-gray-600 mt-1 sm:mt-0">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">
            Only the variables in a top subset are guaranteed safe together. The binned files
            include every variable that passed Phase 1, so keep only the columns of the chosen
            subset before releasing data.
          </p>
        </section>
      </div>
    </div>
  )
}
