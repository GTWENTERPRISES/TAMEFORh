"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function JobAlertsForm() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para registrar la suscripción en el servidor
    console.log("Suscripción a alertas de empleo:", email)
    setSubscribed(true)
    setEmail("")
  }

  if (subscribed) {
    return (
      <div className="flex items-center justify-center gap-3 bg-white/10 border border-white/30 rounded-full px-6 py-4 max-w-xl mx-auto">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-[#3d9a8b]" />
        </div>
        <p className="text-white font-medium">
          ¡Listo! Te avisaremos cuando haya nuevas oportunidades laborales.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white border-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/60 rounded-full px-6 h-12 font-medium"
        />
      </div>
      <Button
        type="submit"
        className="bg-white hover:bg-white/90 text-[#1a3a5c] font-bold rounded-full px-8 h-12"
      >
        Suscribirse a Alertas
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
