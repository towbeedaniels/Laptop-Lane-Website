import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: April 7, 2026</p>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing and using Laptop Lane&apos;s website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Services Description</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Laptop Lane is an e-commerce platform that sells technology products including laptops, keyboards, mice, external hard drives, and flash drives. We provide online ordering, order tracking, and customer support services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Account Registration</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>You must be at least 18 years old to create an account or place an order</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree to provide accurate and complete information when registering</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Orders and Payments</h2>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Placing Orders</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Orders are subject to product availability</li>
                <li>We reserve the right to refuse or cancel any order for any reason</li>
                <li>Order confirmation does not constitute acceptance of your order</li>
                <li>We will notify you if any items in your order are unavailable</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Pricing</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>All prices are listed in Nigerian Naira (₦)</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to correct pricing errors</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Payment</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Payment is required at the time of order placement</li>
                <li>We accept payments through our authorized payment processors</li>
                <li>You are responsible for all charges made using your payment method</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Shipping costs are calculated at checkout</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>You are responsible for providing a correct shipping address</li>
                <li>We are not liable for delays caused by shipping carriers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Returns and Refunds</h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Returns must be initiated within the return period specified on the product page</li>
                <li>Products must be in original condition with all packaging and accessories</li>
                <li>Refunds will be processed to the original payment method</li>
                <li>Shipping costs for returns may be the responsibility of the customer unless the product is defective</li>
                <li>Contact customer support to initiate a return</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Product Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We strive to provide accurate product descriptions, specifications, and images. However:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Product images are for illustrative purposes and may not exactly match the actual product</li>
                <li>We do not warrant that product descriptions are error-free</li>
                <li>Manufacturer specifications may change without notice</li>
                <li>Product availability is subject to change</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Warranties and Disclaimers</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Products sold on Laptop Lane may come with manufacturer warranties. Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To the maximum extent permitted by law, Laptop Lane shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">10. Prohibited Conduct</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Use our website for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper working of the website</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Resell products purchased from Laptop Lane for commercial purposes without authorization</li>
                <li>Submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">11. Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300">
                All content on this website, including text, graphics, logos, images, and software, is the property of Laptop Lane or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved in the appropriate courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">14. Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">
                For questions about these Terms of Service, contact us at:
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
