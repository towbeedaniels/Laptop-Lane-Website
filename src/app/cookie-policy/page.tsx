import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
              <Cookie className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: April 7, 2026</p>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences, understand how you use the site, and improve your experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Laptop Lane uses cookies for the following purposes:</p>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Essential Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">These cookies are necessary for the website to function properly:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li><strong>Session cookies</strong> — Maintain your session while browsing</li>
                <li><strong>Cart cookies</strong> — Remember items in your shopping cart</li>
                <li><strong>Authentication cookies</strong> — Keep you logged in to your account</li>
                <li><strong>Security cookies</strong> — Help protect against fraudulent activity</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Preference Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">These cookies remember your choices:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li><strong>Theme preference</strong> — Remember your light or dark mode selection</li>
                <li><strong>Language preference</strong> — Remember your chosen language</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Analytics Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">These cookies help us understand how visitors interact with our website:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Pages visited and time spent on pages</li>
                <li>Bounce rates and navigation patterns</li>
                <li>Device and browser information</li>
                <li>Traffic sources and referral URLs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Cookie Name</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Purpose</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                      <td className="px-4 py-3 font-mono">session_id</td>
                      <td className="px-4 py-3">Essential</td>
                      <td className="px-4 py-3">Maintain user session</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono">cart_items</td>
                      <td className="px-4 py-3">Essential</td>
                      <td className="px-4 py-3">Store shopping cart contents</td>
                      <td className="px-4 py-3">30 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono">auth_token</td>
                      <td className="px-4 py-3">Essential</td>
                      <td className="px-4 py-3">User authentication</td>
                      <td className="px-4 py-3">7 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono">theme</td>
                      <td className="px-4 py-3">Preference</td>
                      <td className="px-4 py-3">Remember theme preference</td>
                      <td className="px-4 py-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono">language</td>
                      <td className="px-4 py-3">Preference</td>
                      <td className="px-4 py-3">Remember language choice</td>
                      <td className="px-4 py-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono">wishlist</td>
                      <td className="px-4 py-3">Preference</td>
                      <td className="px-4 py-3">Store wishlist items</td>
                      <td className="px-4 py-3">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. These may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Payment processors</strong> — Secure payment session cookies</li>
                <li><strong>Analytics services</strong> — To help us understand website usage</li>
                <li><strong>CDN providers</strong> — To optimize content delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Managing Cookies</h2>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Browser Settings</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Most web browsers allow you to control cookies through their settings. You can usually:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete all or individual cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies entirely</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Important Note</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Please note that blocking or deleting certain cookies, especially essential cookies, may affect the functionality of our website. Some features may not work as intended.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Cookie Consent</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By using our website, you consent to the placement and use of cookies as described in this policy. You can withdraw or modify your consent at any time by adjusting your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> support@laptoplane.com</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> Tech District, Digital City</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
