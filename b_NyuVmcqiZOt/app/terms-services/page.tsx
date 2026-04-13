import Link from "next/link"

export default function TermsServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0b1222] text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-[2rem] bg-card/90 border border-border/50 p-10 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/10">
            Terms & Services
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            PowerFit Gym Terms & Services
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-7">
            These Terms & Services outline the policies, membership expectations, and responsibilities when using PowerFit Gym.
            Please read them carefully before joining or using our facilities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:scale-[1.01]">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid gap-8">
          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Welcome to PowerFit Gym. These Terms & Services govern your use of our facilities, services, website, and membership.
              By accessing or using PowerFit Gym, you agree to comply with these terms and any posted policies.
            </p>
          </section>

          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">2. Membership Terms</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Membership privileges are granted upon acceptance of membership terms and payment of applicable fees. Memberships are personal and non-transferable.
              Members are responsible for maintaining accurate contact information and complying with all gym policies.
            </p>
            <ul className="mt-4 space-y-3 list-inside list-disc text-muted-foreground">
              <li>Membership access subject to facility hours and availability.</li>
              <li>Members must present valid identification when requested.</li>
              <li>PowerFit Gym reserves the right to suspend or terminate membership for policy violations.</li>
            </ul>
          </section>

          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">3. Payment & Refund Policy</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              All membership and service fees must be paid in full before access is granted. Pricing is subject to change with notice.
              Refund requests are evaluated on a case-by-case basis and may require approval from gym management.
            </p>
            <p className="mt-3 text-muted-foreground leading-7">
              Refunds are not guaranteed and will be issued only in accordance with our refund policy. Promotional packages, discounts, or special offers may have separate terms.
            </p>
          </section>

          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">4. Code of Conduct</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Members and guests are expected to act respectfully, safely, and professionally inside the gym.
              The following behavior is prohibited:
            </p>
            <ul className="mt-4 space-y-3 list-inside list-disc text-muted-foreground">
              <li>Harassment, discrimination, or abusive language.</li>
              <li>Damage to equipment, property, or facilities.</li>
              <li>Unauthorized photography or video recording.</li>
              <li>Any behavior that interferes with other members’ enjoyment.</li>
            </ul>
          </section>

          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">5. Liability Disclaimer</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Use of PowerFit Gym is at your own risk. We are not responsible for personal injury, loss, or damage resulting from gym activities.
              Members should consult a physician before starting any exercise program and use equipment properly.
            </p>
            <p className="mt-3 text-muted-foreground leading-7">
              PowerFit Gym does not guarantee results and is not liable for injuries caused by improper training or failure to follow instructions.
            </p>
          </section>

          <section className="rounded-[2rem] bg-card/80 border border-border/40 p-8 shadow-xl shadow-primary/10">
            <h2 className="text-2xl font-semibold text-white">6. Privacy Policy Reference</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              We collect and process personal information to provide membership services, improve gym operations, and maintain safety.
              Your data is handled in accordance with our Privacy Policy and applicable data protection laws.
            </p>
            <p className="mt-3 text-muted-foreground leading-7">
              For more details, please review our Privacy Policy or contact our support team for any privacy-related questions.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
