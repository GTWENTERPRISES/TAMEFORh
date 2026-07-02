import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function VolunteerBanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#1a3a5c]">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(26,58,92,0.95), rgba(61,154,139,0.85)), url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2027')`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-white/70 font-medium uppercase tracking-wider text-sm">We Are Volunteers</span>
        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-8 text-balance">
          Together For The Planet
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          If you want to join us, you can become a volunteer and help make a difference in protecting our environment.
        </p>
        <Button size="lg" className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full px-8 group">
          Become a Volunteer
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}


