import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
              <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: April 7, 2026</p>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Laptop Lane (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make purchases.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Please read this privacy policy carefully. By accessing or using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Personal Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">When you place an order or create an account, we may collect:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping address (street, city, state, ZIP code)</li>
                <li>Payment information (processed securely through our payment providers)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Automatically Collected Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">When you browse our site, we automatically receive:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website URLs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Shipping partners</strong> — to deliver your orders</li>
                <li><strong>Payment processors</strong> — to securely process transactions</li>
                <li><strong>Service providers</strong> — who assist in operating our website</li>
                <li><strong>Legal authorities</strong> — when required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing</li>
                <li>Data portability — receive your data in a portable format</li>
                <li>Withdraw consent at any time (where processing is based on consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookies through your browser settings. See our <Link href="/cookie-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</Link> for more details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we learn we have collected information from a child, we will take steps to delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
