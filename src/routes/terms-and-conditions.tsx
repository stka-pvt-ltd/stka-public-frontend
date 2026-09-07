import { createFileRoute } from "@tanstack/react-router";
import { useCompanyInfo } from "@/hooks/use-public-api";
import { PageIntro, SiteLayout } from "@/components/layout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Terms and conditions governing the use of the STKA pharmaceutical website, technical content, and commercial inquiries.",
      },
      { property: "og:title", content: "Terms & Conditions | STKA Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Terms and conditions governing use of the STKA pharmaceutical website and its content.",
      },
      { property: "og:url", content: "https://stkapvt.com/terms-and-conditions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Terms & Conditions | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Terms and conditions governing the use of STKA Pvt Ltd web platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/terms-and-conditions" }],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const { data: company } = useCompanyInfo();

  const legalName = company?.legalName || "STKA Pvt Ltd";
  const email = company?.email || "info@stkapvt.com";
  const phone = company?.phone || "";
  const address = company?.address
    ? `${company.address}${company.city ? `, ${company.city}` : ""}${company.state ? `, ${company.state}` : ""}`
    : "Patna, Bihar, India";

  return (
    <SiteLayout>
      <PageIntro
        align="left"
        eyebrow="Corporate Terms & Governance"
        title="Terms & Conditions"
        description={`These Terms & Conditions govern your access to and use of the official corporate website of ${legalName}.`}
      />

      <section className="py-16 sm:py-24">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-slate max-w-none space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
            
            {/* 1. Acceptance of Terms */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue use of this website immediately.
              </p>
            </div>

            {/* 2. Website Purpose */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                2. Website Purpose
              </h2>
              <p className="mt-3">
                This website is operated by {legalName} for general corporate overview, commercial product information, formulation portfolio presentation, and business-to-business (B2B) communications.
              </p>
            </div>

            {/* 3. Company and Product Information */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                3. Company and Product Information
              </h2>
              <p className="mt-3">
                Information published on this website regarding product listings, dosage forms, therapeutic categories, and manufacturing capabilities is intended for general informational purposes for commercial clients, healthcare distributors, and business partners.
              </p>
            </div>

            {/* 4. Product Information Disclaimer */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                4. Product Information Disclaimer
              </h2>
              <p className="mt-3">
                Product specifications, formulations, availability, and packaging details presented on this site are subject to change without prior notice. Availability of specific products is subject to regulatory approvals, regional availability, and commercial supply agreements.
              </p>
            </div>

            {/* 5. No Medical Advice */}
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-6 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                5. Important Disclaimer — No Medical Advice
              </h2>
              <p className="mt-3 leading-relaxed">
                The content provided on this website is for general informational and corporate inquiry purposes only. Nothing on this website constitutes medical advice, clinical diagnosis, or treatment recommendations.
              </p>
              <p className="mt-2 leading-relaxed">
                Patients and consumers should consult a qualified physician or healthcare professional regarding any medical condition, prescription medication, or treatment decision. Do not disregard professional medical advice or delay seeking medical treatment based on information on this site.
              </p>
            </div>

            {/* 6. Enquiries and Communications */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                6. Enquiries and Communications
              </h2>
              <p className="mt-3">
                Submitting an enquiry form, email, or attachment through this website does not constitute a binding commercial contract, distribution agreement, or employment contract until formally agreed upon in writing by an authorized representative of {legalName}.
              </p>
            </div>

            {/* 7. Intellectual Property */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                7. Intellectual Property
              </h2>
              <p className="mt-3">
                All content on this website—including text, graphics, brand names, product titles, logos, page layouts, images, and digital downloads—is the property of {legalName} or its licensors and is protected by applicable intellectual property and trademark laws.
              </p>
              <p className="mt-2">
                Unauthorized copying, distribution, modification, or commercial exploitation of site content without prior written permission from {legalName} is strictly prohibited.
              </p>
            </div>

            {/* 8. Website Content */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                8. Website Content and Modifications
              </h2>
              <p className="mt-3">
                {legalName} strives to ensure information on this site is accurate and current. However, we do not warrant that all content is error-free, complete, or updated at all times. We reserve the right to modify, update, or discontinue any aspect of the site without notice.
              </p>
            </div>

            {/* 9. Third-Party Links */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                9. Third-Party Links
              </h2>
              <p className="mt-3">
                This site may contain links to third-party websites or services for convenience. {legalName} does not endorse, monitor, or exercise control over external sites and is not responsible for their content, policies, or security.
              </p>
            </div>

            {/* 10. User Submissions */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                10. User Submissions
              </h2>
              <p className="mt-3">
                You are responsible for ensuring that all information, contact details, and documents (including PDF resume attachments) submitted through our web forms are accurate, truthful, and do not infringe upon the rights of any third party.
              </p>
            </div>

            {/* 11. Prohibited Use */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                11. Prohibited Use
              </h2>
              <p className="mt-3">
                You agree not to use this website to transmit malicious software, engage in unauthorized scraping or data extraction, attempt breach of security mechanisms, or submit unlawful, defamatory, or deceptive content.
              </p>
            </div>

            {/* 12. Availability and Accuracy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                12. Availability and Technical Maintenance
              </h2>
              <p className="mt-3">
                We aim to maintain site availability; however, access may be interrupted due to server maintenance, technical updates, or system events beyond our control. {legalName} is not liable for temporary website downtime.
              </p>
            </div>

            {/* 13. Limitation of Liability */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                13. Limitation of Liability
              </h2>
              <p className="mt-3">
                To the maximum extent permitted by applicable law, {legalName}, its directors, officers, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use this website.
              </p>
            </div>

            {/* 14. Indemnification */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                14. Indemnification
              </h2>
              <p className="mt-3">
                You agree to indemnify and hold harmless {legalName} and its affiliates from any claims, damages, liabilities, or expenses arising from your violation of these Terms &amp; Conditions or unauthorized use of this website.
              </p>
            </div>

            {/* 15. Privacy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                15. Privacy
              </h2>
              <p className="mt-3">
                Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our data collection and protection practices.
              </p>
            </div>

            {/* 16. Changes to These Terms */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                16. Changes to These Terms
              </h2>
              <p className="mt-3">
                {legalName} reserves the right to revise these Terms &amp; Conditions at any time. Continued use of the website following changes constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* 17. Governing Law */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                17. Governing Law
              </h2>
              <p className="mt-3">
                These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India, without giving effect to conflicts of law principles. Any legal action regarding these terms shall be subject to the jurisdiction of competent courts in India.
              </p>
            </div>

            {/* 18. Contact Information */}
            <div className="border-t border-border pt-8">
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                18. Contact Information
              </h2>
              <p className="mt-3">
                For questions or clarifications regarding these Terms &amp; Conditions, please contact us at:
              </p>
              <div className="mt-4 rounded-lg border border-border bg-card p-5 text-sm text-foreground">
                <p className="font-semibold text-primary">{legalName}</p>
                <p className="mt-1">Email: <a href={`mailto:${email}`} className="text-pharma underline">{email}</a></p>
                {phone && <p className="mt-1">Phone: <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-pharma underline">{phone}</a></p>}
                <p className="mt-1">Address: {address}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
