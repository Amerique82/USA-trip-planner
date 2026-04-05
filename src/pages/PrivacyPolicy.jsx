import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="container-custom py-14 max-w-4xl mx-auto">

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: December 2024</p>
      </div>

      <div className="space-y-10 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Who We Are</h2>
          <p>
            USA Trip Planner ("we", "our", or "us") is a travel planning platform operated from Spain. 
            We are committed to protecting your personal data and handling it in accordance with the General Data 
            Protection Regulation (GDPR) of the European Union, the Spanish Organic Data Protection Law (LOPD), 
            and other applicable data protection regulations.
          </p>
          <p className="mt-3">
            For any data-related enquiries, you can contact us at:{' '}
            <a href="mailto:privacy@usatripplanner.com" className="text-accent-500 hover:underline font-medium">privacy@usatripplanner.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">What Data We Collect</h2>
          <p className="mb-4">Depending on how you interact with our website, we may collect the following types of personal data:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm pl-2">
            <li><span className="font-medium text-gray-600">Contact Information</span> — name and email address, if you subscribe to our newsletter or contact us directly.</li>
            <li><span className="font-medium text-gray-600">Usage Data</span> — pages visited, time spent on site, referring URLs, and browser/device type, collected via analytics cookies (with your consent).</li>
            <li><span className="font-medium text-gray-600">Travel Preferences</span> — favorite destinations, saved itineraries, and search preferences when using our planning tools.</li>
            <li><span className="font-medium text-gray-600">Technical Information</span> — IP address, device type, browser information, and technical diagnostic data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Legal Basis for Processing</h2>
          <p>We only process your personal data when we have a valid legal basis under GDPR:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm pl-2 mt-3">
            <li><span className="font-medium text-gray-600">Consent</span> — when you give us explicit consent to process your data (e.g., newsletter subscription).</li>
            <li><span className="font-medium text-gray-600">Legitimate Interest</span> — when we need to process data for our legitimate commercial interests (e.g., website analytics).</li>
            <li><span className="font-medium text-gray-600">Contract Performance</span> — when we process data to deliver our services (e.g., personalized itineraries).</li>
            <li><span className="font-medium text-gray-600">Legal Obligation</span> — when we are legally required to maintain certain data (e.g., tax records).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">How We Use Your Information</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Internal Use and Service Improvement</h3>
              <p className="text-sm">We use your data exclusively for internal purposes to improve our services, personalize your experience, and maintain our platform functionality.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Customer Communication</h3>
              <p className="text-sm">To respond to your inquiries, send newsletters (with your consent), and provide relevant information about our services.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Analytics and Statistics</h3>
              <p className="text-sm">We collect anonymous and aggregated usage data through Google Analytics to understand how you interact with our site and improve our services.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Security and Fraud Prevention</h3>
              <p className="text-sm">We use your data to maintain our platform security, prevent fraudulent activities, and comply with legal obligations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Google Analytics and Cookies</h2>
          <p>
            We use Google Analytics to collect statistical information about how users use our website. 
            Google Analytics uses cookies to collect information anonymously, including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-500 text-sm pl-2 mt-3">
            <li>Pages visited and time on each page</li>
            <li>Bounce rate and visit frequency</li>
            <li>Anonymized demographic information</li>
            <li>Device type and browser used</li>
          </ul>
          <p className="mt-3">
            You can opt out of Google Analytics by installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>
            {' '}for your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">We Do Not Share or Sell Your Information</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium mb-2">🔒 Our Privacy Commitment</p>
            <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
              <li><strong>NEVER</strong> sell your personal information to third parties</li>
              <li><strong>NEVER</strong> share your data with marketing companies</li>
              <li><strong>NEVER</strong> use your information for unauthorized purposes</li>
              <li><strong>ALWAYS</strong> keep your data secure and protected</li>
            </ul>
          </div>
          <p className="mt-3 text-sm">
            We may only share your data in limited circumstances: (1) when you give us explicit consent, 
            (2) when we require service providers to process data on our behalf (e.g., data hosting), 
            or (3) when we are legally obligated to do so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
            alteration, disclosure, or destruction. These include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-500 text-sm pl-2 mt-3">
            <li>SSL/TLS encryption for all data transmissions</li>
            <li>Secure storage on GDPR-compliant servers</li>
            <li>Restricted access to personal data for authorized personnel only</li>
            <li>Regular security reviews and protection updates</li>
            <li>Automatic backups and data recovery plans</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Your Rights under GDPR</h2>
          <p>As an EU resident, you have the following rights:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm pl-2 mt-3">
            <li><span className="font-medium text-gray-600">Right of Access</span> — Request a copy of your personal data.</li>
            <li><span className="font-medium text-gray-600">Right of Rectification</span> — Correct inaccurate or incomplete data.</li>
            <li><span className="font-medium text-gray-600">Right of Erasure</span> — Request deletion of your personal data.</li>
            <li><span className="font-medium text-gray-600">Right of Restriction</span> — Limit how we process your data.</li>
            <li><span className="font-medium text-gray-600">Right of Portability</span> — Receive your data in a structured format.</li>
            <li><span className="font-medium text-gray-600">Right of Objection</span> — Object to processing of your data.</li>
            <li><span className="font-medium text-gray-600">Right to Withdraw Consent</span> — Withdraw consent at any time.</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@usatripplanner.com" className="text-accent-500 hover:underline font-medium">privacy@usatripplanner.com</a>. 
            We will respond within 30 days as required by GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Data Retention</h2>
          <p>
            We only retain your personal data for as long as necessary to fulfill the purposes for which it was collected, 
            including any required legal retention periods. When we no longer need your data, we will securely delete it 
            in accordance with our data retention policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">International Transfers</h2>
          <p>
            As a company operated from Spain, we comply with EU international data transfer regulations. 
            Any transfer of data outside the European Economic Area is made under adequate protection mechanisms 
            such as EU Standard Contractual Clauses or European Commission adequacy decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Minors</h2>
          <p>
            Our services are not directed at individuals under 18 years of age. We do not intentionally collect personal information from minors. 
            If we discover we have accidentally collected information from a minor, we will take steps to delete it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Changes to This Policy</h2>
          <p>
            We may update this privacy policy occasionally to reflect changes in our practices or for operational, 
            legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our website 
            and, where appropriate, by sending you an email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary-900 mb-3">Contact</h2>
          <p>
            If you have questions, concerns, or requests related to this privacy policy or your data protection rights, 
            please do not hesitate to contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <p className="text-sm"><strong>Email:</strong> <a href="mailto:privacy@usatripplanner.com" className="text-accent-500 hover:underline">privacy@usatripplanner.com</a></p>
            <p className="text-sm"><strong>Data Protection Officer:</strong> privacy@usatripplanner.com</p>
            <p className="text-sm"><strong>Location:</strong> Spain (Operating within the EU)</p>
          </div>
        </section>

      </div>
    </div>
  )
}
