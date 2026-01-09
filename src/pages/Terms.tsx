import { Link } from 'react-router-dom'

export function Terms() {
  const lastUpdated = 'January 6, 2025'
  const contactEmail = 'support@hiredoor.io'

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <p className="text-gray-700 leading-relaxed">
          Welcome to Hiredoor. These Terms of Service ("Terms") govern your access to and use of the Hiredoor web application, website, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.
        </p>
      </section>

      {/* Table of Contents */}
      <nav className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
        <ol className="list-decimal list-inside space-y-2 text-primary">
          <li><a href="#acceptance" className="hover:underline">Acceptance of Terms</a></li>
          <li><a href="#eligibility" className="hover:underline">Eligibility</a></li>
          <li><a href="#account" className="hover:underline">Account Registration</a></li>
          <li><a href="#service-description" className="hover:underline">Service Description</a></li>
          <li><a href="#acceptable-use" className="hover:underline">Acceptable Use Policy</a></li>
          <li><a href="#payments" className="hover:underline">Payments and Subscriptions</a></li>
          <li><a href="#tokens" className="hover:underline">Token System</a></li>
          <li><a href="#intellectual-property" className="hover:underline">Intellectual Property</a></li>
          <li><a href="#user-content" className="hover:underline">User Content</a></li>
          <li><a href="#third-party" className="hover:underline">Third-Party Services</a></li>
          <li><a href="#disclaimers" className="hover:underline">Disclaimers</a></li>
          <li><a href="#limitation" className="hover:underline">Limitation of Liability</a></li>
          <li><a href="#indemnification" className="hover:underline">Indemnification</a></li>
          <li><a href="#termination" className="hover:underline">Termination</a></li>
          <li><a href="#modifications" className="hover:underline">Modifications to Terms</a></li>
          <li><a href="#governing-law" className="hover:underline">Governing Law</a></li>
          <li><a href="#dispute-resolution" className="hover:underline">Dispute Resolution</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
        </ol>
      </nav>

      {/* Section 1: Acceptance of Terms */}
      <section id="acceptance" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated herein by reference.
        </p>
        <p className="text-gray-700">
          We reserve the right to update these Terms at any time. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
        </p>
      </section>

      {/* Section 2: Eligibility */}
      <section id="eligibility" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
        <p className="text-gray-700 mb-4">To use the Service, you must:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Be at least 16 years of age</li>
          <li>Have the legal capacity to enter into a binding agreement</li>
          <li>Not be prohibited from using the Service under applicable laws</li>
          <li>Provide accurate and complete registration information</li>
        </ul>
        <p className="text-gray-700 mt-4">
          If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
        </p>
      </section>

      {/* Section 3: Account Registration */}
      <section id="account" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.1 Account Creation</h3>
        <p className="text-gray-700 mb-4">
          To access certain features of the Service, you must create an account using Google OAuth authentication. You agree to provide accurate, current, and complete information during registration.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.2 Account Security</h3>
        <p className="text-gray-700 mb-4">You are responsible for:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Maintaining the security of your Google account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized access or security breach</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3.3 Account Restrictions</h3>
        <p className="text-gray-700">
          You may not share your account with others, create multiple accounts, or transfer your account to another person without our written consent.
        </p>
      </section>

      {/* Section 4: Service Description */}
      <section id="service-description" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Description</h2>
        <p className="text-gray-700 mb-4">
          Hiredoor is a job search assistance tool that helps users connect with potential employers. The Service provides:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Job Posting Analysis:</strong> Parsing and extracting information from job listing URLs</li>
          <li><strong>Contact Discovery:</strong> Finding professional contact information for company employees using third-party data providers</li>
          <li><strong>Email Generation:</strong> AI-powered personalized outreach email drafting</li>
          <li><strong>Outreach Tracking:</strong> Managing and tracking your job application outreach efforts</li>
          <li><strong>Resume Management:</strong> Uploading and storing your resume for email personalization</li>
        </ul>
        <p className="text-gray-700 mt-4">
          The Service is designed to facilitate professional networking and job seeking. We do not guarantee employment outcomes or the accuracy of contact information provided.
        </p>
      </section>

      {/* Section 5: Acceptable Use Policy */}
      <section id="acceptable-use" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">5.1 Permitted Uses</h3>
        <p className="text-gray-700 mb-4">You may use the Service only for:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Legitimate job seeking and professional networking purposes</li>
          <li>Sending personalized, professional outreach to potential employers</li>
          <li>Managing your job application process</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">5.2 Prohibited Uses</h3>
        <p className="text-gray-700 mb-4">You agree NOT to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Spam or Bulk Email:</strong> Use the Service to send unsolicited bulk emails, spam, or mass marketing messages</li>
          <li><strong>Harassment:</strong> Harass, threaten, or intimidate any individuals contacted through the Service</li>
          <li><strong>Misrepresentation:</strong> Impersonate others, misrepresent your qualifications, or provide false information</li>
          <li><strong>Data Scraping:</strong> Systematically collect, harvest, or scrape contact information for purposes other than personal job seeking</li>
          <li><strong>Reselling Data:</strong> Sell, share, or redistribute contact information obtained through the Service</li>
          <li><strong>Illegal Activities:</strong> Use the Service for any unlawful purpose or in violation of any applicable laws</li>
          <li><strong>Circumvention:</strong> Attempt to bypass, disable, or interfere with security features or access controls</li>
          <li><strong>Reverse Engineering:</strong> Decompile, reverse engineer, or attempt to extract source code from the Service</li>
          <li><strong>Automated Access:</strong> Use bots, scripts, or automated tools to access the Service without our written permission</li>
          <li><strong>Interference:</strong> Interfere with or disrupt the Service or servers/networks connected to it</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">5.3 Email Best Practices</h3>
        <p className="text-gray-700 mb-4">When using our email generation features, you agree to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Send emails only to individuals relevant to your job search</li>
          <li>Personalize and review emails before sending</li>
          <li>Respect recipients who request not to be contacted</li>
          <li>Comply with CAN-SPAM, GDPR, and other applicable email regulations</li>
          <li>Not send more than a reasonable number of outreach emails per day</li>
        </ul>
      </section>

      {/* Section 6: Payments and Subscriptions */}
      <section id="payments" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments and Subscriptions</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">6.1 Subscription Plans</h3>
        <p className="text-gray-700 mb-4">
          We offer various subscription plans with different features and token allocations. Current pricing and plan details are available on our pricing page. Prices are subject to change with notice.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">6.2 Billing</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Subscriptions are billed in advance on a monthly basis</li>
          <li>Payment is processed through Stripe, our third-party payment processor</li>
          <li>You authorize us to charge your payment method for all fees incurred</li>
          <li>All fees are non-refundable except as required by law or as stated in these Terms</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">6.3 Cancellation</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>You may cancel your subscription at any time through your account settings</li>
          <li>Cancellation takes effect at the end of your current billing period</li>
          <li>You will retain access to paid features until the end of your billing period</li>
          <li>Unused tokens do not roll over after cancellation</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">6.4 Refunds</h3>
        <p className="text-gray-700">
          We generally do not provide refunds for subscription fees. However, if you experience significant service issues, please contact us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a> to discuss your situation.
        </p>
      </section>

      {/* Section 7: Token System */}
      <section id="tokens" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Token System</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">7.1 Token Usage</h3>
        <p className="text-gray-700 mb-4">
          The Service uses a token-based system for contact discovery. Each job search that successfully returns contacts consumes one token. Token allocations vary by subscription plan.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">7.2 Token Renewal</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Subscription tokens reset monthly on your billing date</li>
          <li>Unused subscription tokens do not roll over to the next month</li>
          <li>Bonus tokens (purchased separately) do not expire while your account is active</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">7.3 Token Purchases</h3>
        <p className="text-gray-700">
          You may purchase additional token packs at any time. Token pack purchases are non-refundable. Purchased tokens remain available until used or until account termination.
        </p>
      </section>

      {/* Section 8: Intellectual Property */}
      <section id="intellectual-property" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">8.1 Our Intellectual Property</h3>
        <p className="text-gray-700 mb-4">
          The Service, including its original content, features, functionality, design, and branding, is owned by Hiredoor and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service without our written permission.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">8.2 License to Use</h3>
        <p className="text-gray-700">
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial job-seeking purposes.
        </p>
      </section>

      {/* Section 9: User Content */}
      <section id="user-content" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Content</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">9.1 Your Content</h3>
        <p className="text-gray-700 mb-4">
          You retain ownership of content you submit to the Service, including your resume, profile information, and outreach notes ("User Content"). By submitting User Content, you grant us a limited license to use, store, and process it solely to provide and improve the Service.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">9.2 Content Responsibilities</h3>
        <p className="text-gray-700 mb-4">You are solely responsible for your User Content and represent that:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>You own or have the right to use all content you submit</li>
          <li>Your content is accurate and not misleading</li>
          <li>Your content does not violate any laws or third-party rights</li>
          <li>Your content does not contain malicious code or harmful material</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">9.3 AI-Generated Content</h3>
        <p className="text-gray-700">
          Emails and other content generated by our AI are provided as suggestions. You are responsible for reviewing, editing, and approving all content before sending. We are not liable for the content of emails you choose to send.
        </p>
      </section>

      {/* Section 10: Third-Party Services */}
      <section id="third-party" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          The Service integrates with and relies on various third-party services to provide its functionality, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Authentication providers</strong> for secure account access</li>
          <li><strong>Cloud infrastructure providers</strong> for hosting and data storage</li>
          <li><strong>Payment processors</strong> for subscription and billing management</li>
          <li><strong>AI service providers</strong> for content analysis and generation</li>
          <li><strong>Data enrichment providers</strong> for contact discovery services</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the availability, accuracy, or actions of third-party services.
        </p>
      </section>

      {/* Section 11: Disclaimers */}
      <section id="disclaimers" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimers</h2>

        <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
          <p className="mb-4">
            <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
          </p>
          <p className="mb-4">We specifically disclaim:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
            <li>Any warranty that the Service will be uninterrupted, error-free, or secure</li>
            <li>Any warranty regarding the accuracy or completeness of contact information</li>
            <li>Any warranty that use of the Service will result in job offers or employment</li>
            <li>Any warranty regarding the deliverability of emails sent using information from the Service</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Contact Information Accuracy</h3>
        <p className="text-gray-700">
          Contact information is provided by third-party data sources and may be inaccurate, outdated, or incomplete. We do not verify all contact information and are not responsible for bounced emails or incorrect contacts.
        </p>
      </section>

      {/* Section 12: Limitation of Liability */}
      <section id="limitation" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>

        <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
          <p className="mb-4">
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Hiredoor shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Our total liability for any claims arising from or relating to the Service shall not exceed the amount you paid us in the 12 months preceding the claim</li>
            <li>We are not liable for any damages resulting from:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Your use or inability to use the Service</li>
                <li>Unauthorized access to your account or data</li>
                <li>Actions of third parties or third-party services</li>
                <li>Errors in contact information or failed email delivery</li>
                <li>Loss of employment opportunities</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 13: Indemnification */}
      <section id="indemnification" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
        <p className="text-gray-700">
          You agree to indemnify, defend, and hold harmless Hiredoor, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Emails you send using information obtained through the Service</li>
          <li>Your User Content</li>
        </ul>
      </section>

      {/* Section 14: Termination */}
      <section id="termination" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">14.1 Termination by You</h3>
        <p className="text-gray-700 mb-4">
          You may terminate your account at any time by contacting us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>. Upon termination, your right to use the Service will immediately cease.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">14.2 Termination by Us</h3>
        <p className="text-gray-700 mb-4">
          We may suspend or terminate your account at any time, with or without cause, with or without notice, including if we believe you have violated these Terms. Reasons for termination may include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Violation of the Acceptable Use Policy</li>
          <li>Fraudulent or illegal activity</li>
          <li>Non-payment of fees</li>
          <li>Extended periods of inactivity</li>
          <li>At our sole discretion for any reason</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">14.3 Effect of Termination</h3>
        <p className="text-gray-700">
          Upon termination, your license to use the Service terminates, your data may be deleted (subject to our data retention policies), and you will not be entitled to refunds for unused tokens or subscription periods.
        </p>
      </section>

      {/* Section 15: Modifications to Terms */}
      <section id="modifications" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Modifications to Terms</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify these Terms at any time. We will notify you of material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Posting the updated Terms on this page with a new "Last updated" date</li>
          <li>Sending an email notification for significant changes</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms. If you do not agree to the new Terms, you must stop using the Service.
        </p>
      </section>

      {/* Section 16: Governing Law */}
      <section id="governing-law" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Governing Law</h2>
        <p className="text-gray-700">
          These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Delaware for any disputes arising from these Terms or the Service.
        </p>
      </section>

      {/* Section 17: Dispute Resolution */}
      <section id="dispute-resolution" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Dispute Resolution</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">17.1 Informal Resolution</h3>
        <p className="text-gray-700 mb-4">
          Before filing any legal claim, you agree to try to resolve any dispute informally by contacting us at <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>. We will attempt to resolve the dispute within 30 days.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">17.2 Arbitration</h3>
        <p className="text-gray-700 mb-4">
          If informal resolution fails, any dispute shall be resolved by binding arbitration under the rules of the American Arbitration Association. The arbitration shall take place in Delaware or remotely, at your choice.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">17.3 Class Action Waiver</h3>
        <p className="text-gray-700">
          You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
        </p>
      </section>

      {/* Section 18: Contact Us */}
      <section id="contact" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700">
            <strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
          </p>
        </div>
      </section>

      {/* Severability & Entire Agreement */}
      <section className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Severability</h3>
        <p className="text-gray-700 mb-4">
          If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Entire Agreement</h3>
        <p className="text-gray-700 mb-4">
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and Hiredoor regarding the Service and supersede any prior agreements.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Waiver</h3>
        <p className="text-gray-700">
          Our failure to enforce any right or provision of these Terms shall not be considered a waiver of that right or provision.
        </p>
      </section>

    </div>
  )
}
