import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Codest - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-foreground">Privacy </span>
            <span className="text-gradient">Policy</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, such as
                  when you fill out a contact form, request a quote, or
                  communicate with us. This information may include your name,
                  email address, phone number, and any other information you
                  choose to provide.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you technical notices and updates</li>
                  <li>Communicate with you about projects and services</li>
                  <li>
                    Comply with legal obligations and protect our rights
                  </li>
                </ul>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties. This does not include trusted
                  third parties who assist us in operating our website,
                  conducting our business, or servicing you, as long as those
                  parties agree to keep this information confidential.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission
                  over the Internet is 100% secure.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies to enhance your experience on our website.
                  Cookies are small files that a site transfers to your
                  computer&apos;s hard drive through your web browser. You can
                  choose to disable cookies through your browser settings.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:hello@codest.in"
                    className="text-neon hover:underline"
                  >
                    hello@codest.in
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
