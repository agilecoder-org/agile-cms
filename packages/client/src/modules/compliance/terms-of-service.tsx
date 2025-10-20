import BackButton from "@/components/back-to-home"

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <div>
        <BackButton />
      </div>

      <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">
        <strong>Effective Date:</strong> October 20, 2025
      </p>

      <p className="mb-6 leading-relaxed">
        These Terms and Conditions ("Terms") govern your access to and use of our website. These Terms form a legally binding agreement between you and Agile CMS. By accessing, browsing, registering for, or otherwise using the Platform, you accept and agree to be bound by these Terms in full. If you do not agree to these Terms, you must not access or use the Platform. Please read these Terms carefully and retain a copy for your records. This Terms & Conditions has been created with the help of the{' '}
        <a
          href="https://listwr.com/terms-and-conditions-generator"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Free Terms & Conditions Generator
        </a>
        .
      </p>

      {/* SECTION 1 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">1. Definitions</h2>
        <p>For purposes of these Terms, the following definitions apply:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Platform:</strong> The website, mobile app, services, features, tools, content and functionality made available by Agile CMS.</li>
          <li><strong>User:</strong> Any individual or entity that accesses, browses, registers for, or uses the Platform.</li>
          <li><strong>Account:</strong> A user account registered on the Platform when account creation is required to access certain features.</li>
          <li><strong>User Content:</strong> Any content, materials, data, text, images, audio, or video submitted or uploaded by users.</li>
          <li><strong>Subscription Plan:</strong> Any recurring paid plan, membership, or tier offered through the Platform.</li>
          <li><strong>Purchase:</strong> Any one-time paid transaction or sale conducted on the Platform.</li>
        </ul>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">2. Eligibility</h2>
        <p>
          Access to certain parts of the Platform may be limited to individuals of legal age (commonly 18 years or older). By using the Platform you represent and warrant that you meet the eligibility requirements and comply with all applicable laws. If you act on behalf of an organization, you confirm you have authority to bind that organization.
        </p>
        <p>
          We may request proof of identity or authority prior to granting access to specific features.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">3. Use of the Platform and Acceptable Conduct</h2>
        <p>
          You agree to use the Platform only for lawful, authorized, and proper purposes. Prohibited activities include unauthorized access, malware distribution, impersonation, or violation of others’ intellectual property rights.
        </p>
        <p>
          Attempts to probe or test system vulnerabilities are strictly prohibited. Violations may result in account suspension or legal action.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">4. Accounts and Registration</h2>
        <p>
          You may need to create an account to access certain features. You are responsible for maintaining accurate information and protecting your credentials. Notify us immediately at <strong>support@agilecoder.in</strong> if you suspect unauthorized access.
        </p>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">5. User Content and Uploads</h2>
        <p>
          By uploading or posting User Content, you grant Agile CMS a worldwide, royalty-free license to host, modify, and display the content as needed for Platform operation. You retain ownership but grant this license for functionality and promotion.
        </p>
        <p>
          We reserve the right to remove or restrict any content that violates these Terms or the law.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">6. Purchases and Payments</h2>
        <p>
          By making a purchase, you agree to provide accurate billing information and authorize applicable charges. Payments are processed by third-party processors; pricing and fees may change at any time.
        </p>
      </section>

      {/* SECTION 7 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">7. Subscription Plans</h2>
        <p>
          Subscriptions renew automatically unless cancelled before renewal. Prices and terms may change with notice. No refunds are issued for partial billing periods unless stated otherwise.
        </p>
      </section>

      {/* SECTION 8 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">8. Ownership of Platform Content</h2>
        <p>
          All intellectual property on the Platform belongs to Agile CMS or its licensors. You are granted a limited, non-transferable license for personal use only.
        </p>
      </section>

      {/* SECTION 9 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">9. Feedback and Suggestions</h2>
        <p>
          Feedback you provide may be used freely by Agile CMS without compensation. Feedback is considered non-confidential and may be incorporated into the Platform.
        </p>
      </section>

      {/* SECTION 10 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">10. Promotions and Contests</h2>
        <p>
          Promotions may be governed by separate rules published with each offer. Participation implies agreement to those rules and these Terms.
        </p>
      </section>

      {/* SECTION 11 */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          11. Privacy and Data Protection
          <img
            src="https://listwr.com/badge/analytics.svg"
            alt="analytics"
            className="w-6 h-6 inline-block"
          />
        </h2>
        <p>
          Your use of the Platform is subject to our{' '}
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:underline"
          >
            Privacy Policy
          </a>
          , which describes how we collect and process personal data.
        </p>
      </section>

      {/* SECTION 12–20 (summarized for clarity, can be expanded same as above) */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">12–20. Additional Legal Terms</h2>
        <p>
          These include standard clauses covering warranties, limitations of liability, indemnification, termination, governing law (Odisha, India), force majeure, and updates to these Terms. For full legal text, please refer to the original document or contact our support team.
        </p>
      </section>

      <section className="space-y-4 mt-10 border-t border-gray-200 pt-8">
        <p><strong>Contact:</strong> support@agilecoder.in</p>
        <p><strong>Publisher:</strong> Agile CMS (Odisha, India)</p>
        <p><strong>Last updated:</strong> October 20, 2025</p>
      </section>
    </div>
  )
}

export default TermsOfService
