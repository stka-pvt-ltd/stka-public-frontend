import { createFileRoute } from "@tanstack/react-router";
import { useCompanyInfo } from "@/hooks/use-public-api";
import { PageIntro, SiteLayout } from "@/components/layout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Privacy information for the STKA pharmaceutical website, including enquiries, communications, data handling, and submitted information.",
      },
      { property: "og:title", content: "Privacy Policy | STKA Pvt Ltd" },
      {
        property: "og:description",
        content:
          "Privacy information for the STKA pharmaceutical website, including enquiries, communications, and data protection.",
      },
      { property: "og:url", content: "https://stkapvt.com/privacy-policy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Privacy information and data handling policy for STKA Pvt Ltd.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
        eyebrow="Corporate Governance & Privacy"
        title="Privacy Policy"
        description={`This Privacy Policy describes how ${legalName} collects, uses, and safeguards information provided through our corporate website, product enquiry channels, and communication forms.`}
      />

      <section className="py-16 sm:py-24">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-slate max-w-none space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
            
            {/* 1. Introduction */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                1. Introduction
              </h2>
              <p className="mt-3">
                {legalName} (&quot;STKA&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy governs our information collection, usage, and protection practices across our official website, product inquiry forms, and corporate communication channels.
              </p>
              <p className="mt-2">
                By accessing or using our website and submitting information through our digital forms, you acknowledge the terms outlined in this Privacy Policy.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                We collect information directly provided by users as well as standard information generated automatically through web interactions.
              </p>
            </div>

            {/* 3. Information You Provide */}
            <div>
              <h3 className="font-display text-lg font-semibold text-primary">
                3. Information You Provide Voluntarily
              </h3>
              <p className="mt-2">
                When you interact with our website, request product information, submit business inquiries, or apply for career openings, we may collect:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Contact details such as your full name, email address, phone number, and organization name.</li>
                <li>Inquiry details including message subject, formulation inquiries, or specific product requirements.</li>
                <li>Career information and application data, including attached resume documents (PDF format).</li>
              </ul>
            </div>

            {/* 4. Information Collected Automatically */}
            <div>
              <h3 className="font-display text-lg font-semibold text-primary">
                4. Information Collected Automatically
              </h3>
              <p className="mt-2">
                Like most corporate websites, our server logs automatically collect limited technical data to ensure site stability and performance, such as internet protocol (IP) addresses, browser type, operating system, referring URL, date/time stamps, and page navigation metrics.
              </p>
            </div>

            {/* 5. How We Use Information */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                5. How We Use Information
              </h2>
              <p className="mt-3">
                Information collected through our website is used strictly for legitimate corporate and operational purposes, including:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Responding to product, formulation, and commercial inquiries.</li>
                <li>Processing and evaluating employment applications and candidate resumes.</li>
                <li>Communicating corporate, product, or operational updates to inquiring parties.</li>
                <li>Maintaining website security, preventing unauthorized activity, and evaluating technical performance.</li>
              </ul>
            </div>

            {/* 6. Product and Business Enquiries */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                6. Product and Business Enquiries
              </h2>
              <p className="mt-3">
                Information submitted through product detail pages or general contact forms is routed internally to relevant commercial or technical representatives at {legalName}. We do not use commercial enquiry details for automated third-party marketing or spam operations.
              </p>
            </div>

            {/* 7. Career Enquiries and Resume Attachments */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                7. Career Enquiries and Resume Attachments
              </h2>
              <p className="mt-3">
                Users applying for positions at {legalName} may voluntarily attach PDF curriculum vitae (CV) or resume documents through our digital application form.
              </p>
              <p className="mt-2">
                All submitted resume documents are treated as confidential human-resources information. They are stored within restricted administrative storage, are not made available through public website links, and are reviewed exclusively by authorized internal staff for recruitment evaluation.
              </p>
            </div>

            {/* 8. How We Protect Information */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                8. How We Protect Information
              </h2>
              <p className="mt-3">
                We employ appropriate technical, administrative, and organizational safeguards to protect submitted personal data against unauthorized access, disclosure, alteration, or destruction. Access to private communications and application attachments is restricted to authorized personnel with a legitimate business need.
              </p>
            </div>

            {/* 9. Data Storage and Service Providers */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                9. Data Storage and Service Providers
              </h2>
              <p className="mt-3">
                We may utilize trusted third-party cloud service providers, hosting platforms, and infrastructure partners to facilitate website operation, data storage, and security. These partners process information under strict confidentiality standards consistent with this Privacy Policy.
              </p>
            </div>

            {/* 10. Cookies and Similar Technologies */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                10. Cookies and Similar Technologies
              </h2>
              <p className="mt-3">
                Our website uses essential session tokens and standard analytics tools to ensure consistent browsing experiences. You may manage cookie preferences through your web browser settings; however, disabling certain cookies may affect website functionality.
              </p>
            </div>

            {/* 11. Sharing of Information */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                11. Sharing of Information
              </h2>
              <p className="mt-3">
                {legalName} does not sell, rent, or trade personal information to third parties. We disclose personal information only:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>To authorized service providers assisting our business operations under confidentiality obligations.</li>
                <li>When required by law, regulation, subpoena, or government authority.</li>
                <li>To protect the rights, property, or safety of {legalName}, our clients, or the public.</li>
              </ul>
            </div>

            {/* 12. Data Retention */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                12. Data Retention
              </h2>
              <p className="mt-3">
                We retain submitted information for as long as reasonably necessary for the purpose for which it was collected, subject to applicable legal, regulatory, statutory, and operational requirements.
              </p>
            </div>

            {/* 13. Your Choices and Rights */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                13. Your Choices and Rights
              </h2>
              <p className="mt-3">
                You may contact us at any time to update, verify, or request the deletion of personal information provided through our website forms. We will review and address your request in accordance with applicable laws.
              </p>
            </div>

            {/* 14. Third-Party Links */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                14. Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may contain links to external third-party sites. {legalName} is not responsible for the privacy practices or content of third-party websites. We encourage users to review the privacy statements of any external site visited.
              </p>
            </div>

            {/* 15. Children's Privacy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                15. Children&apos;s Privacy
              </h2>
              <p className="mt-3">
                Our website and products are directed toward corporate clients, healthcare professionals, and commercial entities. We do not knowingly collect personal information from individuals under the age of 18.
              </p>
            </div>

            {/* 16. Changes to This Privacy Policy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                16. Changes to This Privacy Policy
              </h2>
              <p className="mt-3">
                We reserve the right to update this Privacy Policy periodically to reflect changes in legal, regulatory, or operational practices. Updated versions will be posted on this page with a revised effective date.
              </p>
            </div>

            {/* 17. Contact Us */}
            <div className="border-t border-border pt-8">
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                17. Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at:
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
