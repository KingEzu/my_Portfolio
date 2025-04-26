import React from "react";
import { useTheme } from "../../components/themeProvider";


const PrivacyPolicy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen px-4 py-10 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto rounded-2xl p-6 sm:p-10 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <span role="img" aria-label="lock">🔒</span> Privacy Policy
        </h1>
        <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">
          <strong>Effective Date:</strong> Jan 8, 2025 <br />
    
        </p>

        {/* Privacy Sections */}
        {[
          {
            title: "1. Introduction",
            content:
              "This Privacy Policy explains how I collect, use, and protect your personal information when you subscribe to my newsletter through my personal portfolio website. By subscribing, you agree to the practices described in this policy.",
          },
          {
            title: "2. Information I Collect",
            content:
              "When you subscribe to the newsletter, the only information I collect is your email address. I do not ask for your name, phone number, or any other personal details.",
          },
          {
            title: "3. How I Use Your Information",
            content:
              "Your email address is used exclusively for sending occasional updates about my work, new projects, personal announcements, or other content you may find interesting. I will never sell, rent, or share your email address with third parties.",
          },
          {
            title: "4. How Your Data Is Stored",
            content:
              "Your email is stored securely in a protected database. I take all reasonable steps to prevent unauthorized access. If I use a third-party service like Gmail SMTP to send emails, it's only for newsletter delivery and follows security best practices.",
          },
          {
            title: "5. Your Rights & Unsubscribing",
            content: (
              <>
                You can unsubscribe at any time by replying to an email with the word{" "}
                <span className="bg-gray-200 dark:bg-gray-700 px-1 rounded font-mono text-sm">
                  "Unsubscribe"
                </span>, or by contacting me directly. Your email will be removed promptly from the mailing list.
              </>
            ),
          },
          {
            title: "6. Contact Information",
            content: (
              <>
                If you have questions about this Privacy Policy or your data, contact me at:
                <br />
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:ezanamulugeta89@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ezanamulugeta89@gmail.com
                </a>
              </>
            ),
          },
          {
            title: "7. Consent",
            content:
              "By subscribing to the newsletter, you acknowledge that you have read and agree to this Privacy Policy.",
          },
        ].map(({ title, content }, index) => (
          <section key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">{content}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
