import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Codest - Read our terms and conditions for using our services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-foreground">Terms of </span>
            <span className="text-gradient">Service</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Codest website and services, you
                  accept and agree to be bound by these Terms of Service. If you
                  do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Codest provides web development, 3D design, and digital
                  solutions. The specific scope, deliverables, and terms of each
                  project will be outlined in separate project agreements
                  between Codest and the client.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos,
                  and software, is the property of Codest and is protected by
                  intellectual property laws. Client deliverables and ownership
                  rights will be specified in individual project agreements.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>
                    Not interfere with or disrupt our services
                  </li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Codest shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of our services. Our total liability shall not exceed
                  the amount paid by you for the specific service in question.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Modifications
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting to our
                  website. Your continued use of our services constitutes
                  acceptance of any modifications.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance
                  with the laws of India, without regard to its conflict of law
                  provisions.
                </p>
              </section>

              <section className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions regarding these Terms of Service, please
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
