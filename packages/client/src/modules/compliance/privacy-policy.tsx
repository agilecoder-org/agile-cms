import BackButton from "@/components/back-to-home"

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      {/* Back to Home */}
      <div>
        <BackButton />
      </div>

      {/* Title and Effective Date */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        <strong>Effective Date:</strong> October 20, 2025
      </p>

      {/* Intro Paragraph */}
      <p className="mb-6 leading-relaxed">
        This Privacy Policy explains how we collect, use, disclose, and protect the personal
        information you provide or that we collect when you access or use our services on{' '}
        <a
          href="https://cms.agilecoder.in"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          cms.agilecoder.in
        </a>
        . It explains your privacy rights and choices, and how to contact us about our privacy
        practices. Please read this Policy carefully. By using our Platform, you consent to the data
        practices described in this Policy. This Privacy Policy has been created with the help of
        the{' '}
        <a
          href="https://listwr.com/privacy-policy-generator"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Free Privacy Policy Generator
        </a>
        .
      </p>

      {/* Section 1 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 text-gray-900">Entity and Contact Information</h2>
        <p>
          This Privacy Policy is published on behalf of an individual operator located in Odisha,
          India. Business names and registered addresses are not applicable in this case. All
          references to “I”, “me”, or “my” refer to the individual operator.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-gray-800">How to Contact Us</h3>
        <p>
          If you have questions, requests, or concerns about this Privacy Policy, please contact us
          at: <strong>support@agilecoder.in</strong>.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
        <p>
          We collect multiple types of information to operate effectively and provide you the best
          experience. The categories of information we collect include:
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">1.1. Information You Provide Directly</h3>
          <p>
            When you register, create an account, fill forms, contact us, or otherwise communicate
            with us, you may provide personal information such as your name, email address, phone
            number, billing and payment information, and other identifiers.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            1.2. Automatically Collected Information
          </h3>
          <p>
            We automatically collect technical and usage data when you interact with the Platform,
            which may include IP address, device identifiers, device model and operating system,
            browser type, language preferences, access times, and performance metrics.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">1.3. Location Data</h3>
          <p>
            We may collect approximate or precise location data from your device if you grant
            permissions. You can control location access in your device settings.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">1.4. Payment and Transaction Data</h3>
          <p>
            When you make purchases or use paid features, we collect payment data processed by
            secure third-party payment processors. We do not store full payment card numbers on our
            servers unless explicitly required and disclosed.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">1.5. Communications and Support Data</h3>
          <p>
            We maintain records of communications and support interactions to provide assistance,
            detect abuse, and improve service quality.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">1.6. Derived and Aggregated Data</h3>
          <p>
            We may derive non-identifying or aggregated data from the information we collect for
            analytics, performance measurement, and research purposes.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Information</h2>
        <p>We use collected information for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide, operate, maintain, and improve the Platform and related services.</li>
          <li>To authenticate users, manage accounts, and communicate updates.</li>
          <li>To process payments, prevent fraud, and enforce our Terms of Service.</li>
          <li>To personalize content, recommendations, and advertising where allowed.</li>
          <li>To comply with legal obligations and protect rights and safety.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          3. Advertising and Analytics
          <img
            src="https://listwr.com/badge/analytics.svg"
            alt="analytics"
            className="w-6 h-6 inline-block"
          />
        </h2>
        <p>
          Our platform may display advertisements and use analytics tools to collect anonymized
          usage data. Learn more about Google Analytics privacy here:{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Partner Sites Policy
          </a>
          .
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">4. Data Retention and Security</h2>
        <p>
          We retain personal data as long as necessary for business or legal reasons. We use
          administrative, technical, and physical safeguards — including encryption and access
          controls — to protect your information.
        </p>
      </section>

      {/* Section 6 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">5. Children’s Privacy</h2>
        <p>
          Our Platform is not directed to children under 13. We do not knowingly collect data from
          minors. If you believe a child has provided information, please contact us to remove it.
        </p>
      </section>

      {/* Section 7 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights</h2>
        <p>
          You may have the right to access, correct, delete, or restrict your personal data, and to
          withdraw consent where applicable. Contact us at{' '}
          <strong>support@agilecoder.in</strong> to exercise these rights.
        </p>
      </section>

      {/* Footer */}
      <section className="space-y-4 mt-10 border-t border-gray-200 pt-8">
        <p>
          <strong>Publisher:</strong> Agile CMS (Odisha, India)
        </p>
        <p>
          <strong>Last updated:</strong> October 20, 2025
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
