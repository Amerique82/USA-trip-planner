import { Link } from 'react-router-dom'

export default function CookiePolicy() {
  return (
    <div className="container-custom py-14 max-w-4xl mx-auto">

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-3">Cookie Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: December 2024</p>
      </div>

      <div className="space-y-10 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, mobile, or tablet) 
            when you visit a website. They allow the website to remember information about your visit, such as your language 
            preferences, login settings, and other personalizations.
          </p>
          <p className="mt-3">
            Cookies are essential for the functionality of many websites and enhance the user experience 
            by making navigation more efficient and personalized.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">How We Use Cookies</h2>
          <p>At USA Trip Planner, we use different types of cookies for various purposes:</p>
          
          <div className="space-y-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🔐 Essential Cookies</h3>
              <p className="text-sm text-blue-700">
                These cookies are necessary for the basic functioning of the website. They cannot be disabled in our systems 
                because they are essential for enabling basic functions like secure navigation, access to secure areas, and consent management.
              </p>
              <ul className="list-disc list-inside text-xs text-blue-600 mt-2 pl-4">
                <li>Authentication and security</li>
                <li>Cookie preference management</li>
                <li>Basic site functionalities</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">📊 Analytics Cookies</h3>
              <p className="text-sm text-green-700">
                We use Google Analytics to collect anonymous information about how users interact with our site. 
                This helps us understand what works well and what needs improvement, but we <strong>never</strong> collect personally identifiable information.
              </p>
              <ul className="list-disc list-inside text-xs text-green-600 mt-2 pl-4">
                <li>Pages visited and time on site</li>
                <li>Device and browser used</li>
                <li>Anonymized geographical location</li>
                <li>Bounce rate and user behavior</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">⚙️ Functional Cookies</h3>
              <p className="text-sm text-purple-700">
                These cookies allow the website to remember choices you make to provide a more personalized experience.
              </p>
              <ul className="list-disc list-inside text-xs text-purple-600 mt-2 pl-4">
                <li>Destination search preferences</li>
                <li>Saved itineraries</li>
                <li>Display settings</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Third-Party Cookies</h2>
          <p>
            We use third-party services that also use cookies on our site. These include:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800">Google Analytics</h4>
                <p className="text-sm text-gray-600">
                  Collects anonymous usage data for website analysis. You can opt out by installing the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Managing Cookies</h2>
          <p>You have several options to manage cookies:</p>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
              <div>
                <h4 className="font-semibold text-gray-800">Through Our Cookie Banner</h4>
                <p className="text-sm text-gray-600">
                  When you first visit our site, you'll see a banner where you can accept or reject non-essential cookies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
              <div>
                <h4 className="font-semibold text-gray-800">Browser Settings</h4>
                <p className="text-sm text-gray-600">
                  You can configure your browser to reject cookies or notify you when cookies are sent. 
                  Please note that disabling cookies may affect site functionality.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
              <div>
                <h4 className="font-semibold text-gray-800">Preferences at Any Time</h4>
                <p className="text-sm text-gray-600">
                  You can change your cookie preferences at any time through our site's privacy settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Cookie Duration</h2>
          <p>The cookies we use have different retention periods:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm pl-2 mt-3">
            <li><span className="font-medium text-gray-600">Session cookies</span> — Deleted when you close your browser</li>
            <li><span className="font-medium text-gray-600">Persistent cookies</span> — Remain on your device for a specific period (typically 30 days to 2 years)</li>
            <li><span className="font-medium text-gray-600">Analytics cookies</span> — Usually 2 years, though anonymized after 26 months</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Your Cookie Rights</h2>
          <p>Under GDPR and other privacy regulations, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm pl-2 mt-3">
            <li><span className="font-medium text-gray-600">Informed consent</span> — Give or withdraw consent for non-essential cookies</li>
            <li><span className="font-medium text-gray-600">Control and choice</span> — Decide which types of cookies to accept</li>
            <li><span className="font-medium text-gray-600">Transparency</span> — Know what cookies we use and why</li>
            <li><span className="font-medium text-gray-600">Withdraw consent</span> — Change your preferences at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Updates to This Policy</h2>
          <p>
            We may update this cookie policy occasionally to reflect changes in our cookie practices 
            or for operational, legal, or regulatory reasons. We will notify you of any significant changes 
            by posting the new policy on our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Contact</h2>
          <p>
            If you have questions about our cookie policy or how we handle your data, 
            please do not hesitate to contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <p className="text-sm"><strong>Email:</strong> <a href="mailto:privacy@usatripplanner.com" className="text-accent-500 hover:underline">privacy@usatripplanner.com</a></p>
            <p className="text-sm"><strong>Website:</strong> <Link to="/" className="text-accent-500 hover:underline">usatripplanner.com</Link></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Useful Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Google Privacy Policy</h4>
              <p className="text-sm text-gray-600">Information about how Google uses data</p>
            </a>
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Google Analytics Opt-out</h4>
              <p className="text-sm text-gray-600">Browser add-on to disable Analytics</p>
            </a>
          </div>
        </section>

        <section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-medium mb-2">📌 Quick Summary</p>
            <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
              <li>Essential cookies <strong>always</strong> enabled for basic functionality</li>
              <li>Analytics cookies are optional and only collect anonymous data</li>
              <li>You can manage your preferences at any time</li>
              <li>We do not sell or share your data with third parties for marketing</li>
              <li>We comply with all European privacy regulations (GDPR)</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  )
}
