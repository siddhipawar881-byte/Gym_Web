import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkingHoursSection } from "@/components/working-hours-section"
import { MembershipSection } from "@/components/membership-section"
import { TrainersSection } from "@/components/trainers-section"
import { ClassScheduleSection } from "@/components/class-schedule-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorkingHoursSection />
      <MembershipSection />
      <TrainersSection />
      <ClassScheduleSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
