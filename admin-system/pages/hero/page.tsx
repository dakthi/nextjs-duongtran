import { redirect } from 'next/navigation';

export default function AdminHeroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Hero Content Management</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            <strong>Static Site Mode:</strong> Hero content is currently managed via static data. 
            To enable dynamic CMS functionality, you'll need to:
          </p>
          <ul className="mt-2 list-disc list-inside text-yellow-700 text-sm space-y-1">
            <li>Set up a database connection</li>
            <li>Run the hero content migration</li>
            <li>Remove the static export configuration</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Hero Content (Static)</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value="West Acton Residents Association"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value="Your Voice in the Community"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value="WARA has been the voice of residents for decades. We work tirelessly to protect and enhance our neighborhood, ensuring that West Acton remains a wonderful place to live for all residents."
                disabled
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value="Join WARA"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value="/membership"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">To Enable Dynamic CMS:</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              <li>Run the database migration: <code className="bg-gray-200 px-1 rounded">node scripts/run-migration.js add_hero_content_migration.sql</code></li>
              <li>Remove <code className="bg-gray-200 px-1 rounded">output: 'export'</code> from next.config.js</li>
              <li>Update homepage to fetch from database instead of static data</li>
              <li>Implement hero content API routes</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}