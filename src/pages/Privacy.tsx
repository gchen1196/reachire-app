import { Link } from 'react-router-dom'

export function Privacy() {
  const lastUpdated = 'January 6, 2025'
  const contactEmail = 'support@hiredoor.io'

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <p className="text-gray-700 leading-relaxed">
          Hiredoor ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application and services (collectively, the "Service"). Please read this policy carefully. By using Hiredoor, you consent to the practices described in this Privacy Policy.
        </p>
      </section>

      {/* Table of Contents */}
      <nav className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
        <ol className="list-decimal list-inside space-y-2 text-primary">
          <li><a href="#information-we-collect" className="hover:underline">Information We Collect</a></li>
          <li><a href="#how-we-use" className="hover:underline">How We Use Your Information</a></li>
          <li><a href="#information-sharing" className="hover:underline">Information Sharing and Disclosure</a></li>
          <li><a href="#third-party-services" className="hover:underline">Third-Party Services</a></li>
          <li><a href="#data-retention" className="hover:underline">Data Retention</a></li>
          <li><a href="#data-security" className="hover:underline">Data Security</a></li>
          <li><a href="#your-rights" className="hover:underline">Your Rights and Choices</a></li>
          <li><a href="#gdpr" className="hover:underline">GDPR Compliance (EU Users)</a></li>
          <li><a href="#ccpa" className="hover:underline">CCPA Compliance (California Users)</a></li>
          <li><a href="#cookies" className="hover:underline">Cookies and Tracking</a></li>
          <li><a href="#children" className="hover:underline">Children's Privacy</a></li>
          <li><a href="#international" className="hover:underline">International Data Transfers</a></li>
          <li><a href="#changes" className="hover:underline">Changes to This Policy</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
        </ol>
      </nav>

      {/* Section 1: Information We Collect */}
      <section id="information-we-collect" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1.1 Information You Provide Directly</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Account Information:</strong> When you sign up via Google OAuth, we receive your name and email address from your Google account.</li>
          <li><strong>Profile Information:</strong> You may optionally provide your LinkedIn profile URL.</li>
          <li><strong>Resume Data:</strong> If you upload a resume (PDF, DOCX, DOC, or TXT format, up to 5MB), we store the file and extract professional information including your current role, company, skills, achievements, and professional summary.</li>
          <li><strong>Job URLs:</strong> Job posting URLs you submit for contact discovery.</li>
          <li><strong>Outreach Notes:</strong> Any notes you add to track your outreach activities.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1.2 Information Collected Automatically</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Usage Data:</strong> We log token usage, including the action type, job URLs searched, company domains queried, and number of contacts found.</li>
          <li><strong>Authentication Tokens:</strong> Session tokens stored in your browser's local storage for authentication purposes.</li>
          <li><strong>Timestamps:</strong> Account creation date, subscription changes, and outreach activity timestamps.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1.3 Information from Third Parties</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Google OAuth:</strong> Basic profile information (name, email, profile picture) from your Google account.</li>
          <li><strong>Hunter.io:</strong> Business contact information including professional email addresses, job titles, LinkedIn URLs, seniority levels, and departments for contacts at companies you search.</li>
          <li><strong>Stripe:</strong> Payment processing data including your Stripe customer ID and subscription status. We do not store your credit card details directly.</li>
        </ul>
      </section>

      {/* Section 2: How We Use Your Information */}
      <section id="how-we-use" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Provide the Service:</strong> Parse job postings, discover relevant contacts, and generate personalized outreach emails.</li>
          <li><strong>Personalize Your Experience:</strong> Use your resume and profile data to craft more relevant and personalized email drafts.</li>
          <li><strong>Process Payments:</strong> Manage subscriptions, token purchases, and billing through Stripe.</li>
          <li><strong>Track Your Outreach:</strong> Maintain your outreach history and contact statuses in your personal dashboard.</li>
          <li><strong>Improve the Service:</strong> Analyze usage patterns to enhance features, fix bugs, and optimize performance.</li>
          <li><strong>Communicate with You:</strong> Send service-related notifications, updates, and support responses.</li>
          <li><strong>Ensure Security:</strong> Detect and prevent fraud, abuse, and unauthorized access.</li>
        </ul>
      </section>

      {/* Section 3: Information Sharing and Disclosure */}
      <section id="information-sharing" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
        <p className="text-gray-700 mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.1 Service Providers</h3>
        <p className="text-gray-700 mb-4">We share data with third-party service providers who perform services on our behalf (see Section 4 for details).</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.2 Legal Requirements</h3>
        <p className="text-gray-700 mb-4">We may disclose your information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.3 Business Transfers</h3>
        <p className="text-gray-700 mb-4">If Hiredoor is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.4 With Your Consent</h3>
        <p className="text-gray-700">We may share your information for other purposes with your explicit consent.</p>
      </section>

      {/* Section 4: Third-Party Services */}
      <section id="third-party-services" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          To provide the Service, we work with trusted third-party service providers in the following categories:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Authentication Providers:</strong> We use industry-standard OAuth providers to securely authenticate your account. This may include sharing your email, name, and profile information.</li>
          <li><strong>Cloud Infrastructure:</strong> We use cloud service providers for hosting, database storage, and file storage to securely store your account data and uploaded files.</li>
          <li><strong>Payment Processing:</strong> We use PCI-compliant payment processors to handle subscription billing and purchases. Your payment information is processed directly by these providers and is not stored on our servers.</li>
          <li><strong>AI Services:</strong> We use artificial intelligence providers to analyze job postings and generate personalized email content. Job posting content and your profile information may be processed by these services.</li>
          <li><strong>Data Enrichment:</strong> We use professional data providers to discover contact information at companies you search. Company names and domains you submit may be shared with these providers.</li>
        </ul>

        <p className="text-gray-700 mt-4">
          All third-party service providers are contractually obligated to protect your data and use it only for the purposes we specify. Each provider maintains their own privacy policy governing their data practices.
        </p>
      </section>

      {/* Section 5: Data Retention */}
      <section id="data-retention" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
        <p className="text-gray-700 mb-4">We retain your data as follows:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Account Data:</strong> Retained for as long as your account is active. Upon account deletion, your personal data is deleted within 30 days.</li>
          <li><strong>Resume Files:</strong> Stored until you delete them or close your account.</li>
          <li><strong>Outreach History:</strong> Retained for as long as your account is active to provide you with historical tracking.</li>
          <li><strong>Usage Logs:</strong> Retained for up to 12 months for analytics and service improvement purposes.</li>
          <li><strong>Payment Records:</strong> Retained as required by law and for financial record-keeping (typically 7 years).</li>
        </ul>
      </section>

      {/* Section 6: Data Security */}
      <section id="data-security" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
        <p className="text-gray-700 mb-4">We implement appropriate technical and organizational measures to protect your personal data, including:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is encrypted using TLS/HTTPS.</li>
          <li><strong>Encryption at Rest:</strong> Sensitive data stored in our databases is encrypted.</li>
          <li><strong>Access Controls:</strong> Strict access controls limit who can access your data within our organization.</li>
          <li><strong>Secure Authentication:</strong> We use industry-standard OAuth 2.0 via Google for authentication.</li>
          <li><strong>Payment Security:</strong> Credit card information is handled entirely by Stripe (PCI-DSS compliant) and never touches our servers.</li>
          <li><strong>Regular Security Reviews:</strong> We regularly review and update our security practices.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          While we strive to protect your personal data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
        </p>
      </section>

      {/* Section 7: Your Rights and Choices */}
      <section id="your-rights" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
        <p className="text-gray-700 mb-4">You have the following rights regarding your personal data:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements).</li>
          <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format.</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where consent is the legal basis.</li>
          <li><strong>Object to Processing:</strong> Object to processing of your data for certain purposes.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          To exercise any of these rights, please contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>. We will respond to your request within 30 days.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Account Management</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>You can update your profile information in your Account settings.</li>
          <li>You can delete your uploaded resume at any time from the Resume page.</li>
          <li>You can delete individual outreach records from your Dashboard.</li>
          <li>To delete your entire account, contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.</li>
        </ul>
      </section>

      {/* Section 8: GDPR Compliance */}
      <section id="gdpr" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. GDPR Compliance (EU Users)</h2>
        <p className="text-gray-700 mb-4">If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR):</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Legal Basis for Processing</h3>
        <p className="text-gray-700 mb-4">We process your personal data based on:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Contract Performance:</strong> Processing necessary to provide you with the Service you requested.</li>
          <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests (e.g., fraud prevention, service improvement), balanced against your rights.</li>
          <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities.</li>
          <li><strong>Legal Obligation:</strong> Processing required to comply with applicable laws.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your GDPR Rights</h3>
        <p className="text-gray-700 mb-4">In addition to the rights listed in Section 7, EU users have the right to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Lodge a Complaint:</strong> File a complaint with your local data protection authority.</li>
          <li><strong>Restrict Processing:</strong> Request restriction of processing in certain circumstances.</li>
          <li><strong>Object to Automated Decisions:</strong> Object to decisions made solely through automated processing.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Data Controller</h3>
        <p className="text-gray-700">
          Hiredoor is the data controller for your personal data. For any GDPR-related inquiries, contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.
        </p>
      </section>

      {/* Section 9: CCPA Compliance */}
      <section id="ccpa" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. CCPA Compliance (California Users)</h2>
        <p className="text-gray-700 mb-4">If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your CCPA Rights</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
          <li><strong>Right to Delete:</strong> Request deletion of your personal information (subject to exceptions).</li>
          <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of your personal information. Note: We do not sell your personal information.</li>
          <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Categories of Personal Information Collected</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Identifiers (name, email address)</li>
          <li>Professional information (job title, employer, skills from resume)</li>
          <li>Commercial information (subscription status, purchase history)</li>
          <li>Internet activity (usage logs, job URLs searched)</li>
        </ul>

        <p className="text-gray-700 mt-4">
          To exercise your CCPA rights, contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.
        </p>
      </section>

      {/* Section 10: Cookies and Tracking */}
      <section id="cookies" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">Hiredoor uses minimal cookies and tracking technologies:</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Essential Cookies</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Authentication:</strong> We use local storage to maintain your authentication session. This is essential for the Service to function.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">What We Don't Use</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>We do not use third-party analytics services (e.g., Google Analytics, Mixpanel).</li>
          <li>We do not use advertising cookies or tracking pixels.</li>
          <li>We do not track you across other websites.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Managing Cookies</h3>
        <p className="text-gray-700">
          You can control cookies through your browser settings. Note that disabling essential cookies may prevent the Service from functioning properly.
        </p>
      </section>

      {/* Section 11: Children's Privacy */}
      <section id="children" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
        <p className="text-gray-700">
          Hiredoor is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>, and we will delete such information.
        </p>
      </section>

      {/* Section 12: International Data Transfers */}
      <section id="international" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. International Data Transfers</h2>
        <p className="text-gray-700 mb-4">
          Your data may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Use of service providers that comply with applicable data protection frameworks.</li>
          <li>Standard contractual clauses approved by relevant authorities.</li>
          <li>Ensuring adequate levels of data protection regardless of where data is processed.</li>
        </ul>
      </section>

      {/* Section 13: Changes to This Policy */}
      <section id="changes" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date. For significant changes, we may also notify you via email. We encourage you to review this policy periodically.
        </p>
      </section>

      {/* Section 14: Contact Us */}
      <section id="contact" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700">
            <strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days.
          </p>
        </div>
      </section>

    </div>
  )
}
