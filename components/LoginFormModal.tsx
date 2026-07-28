"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, X, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setSesion, autenticar } from "@/lib/plataformaData"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

interface LoginFormProps {
  variant?: "light" | "dark"
  /** Ruta a la que se redirige tras autenticarse. Si no se pasa, muestra el mensaje "próximamente". */
  redirectTo?: string
}

export function LoginForm({ variant = "light", redirectTo }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dark = variant === "dark"
  const labelClass = dark ? "text-white" : "text-[#1a3a5c]"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresa un correo electrónico válido")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)
    // Aquí iría la lógica de autenticación contra el servidor
    setTimeout(() => {
      if (redirectTo) {
        const sesion = autenticar(email, password)
        if (sesion) {
          setSesion(sesion)
          router.push(redirectTo)
          return
        }
        setLoading(false)
        setError("Credenciales incorrectas. Verifica tu correo y contraseña.")
        return
      }
      setLoading(false)
      setError("La plataforma estará disponible próximamente. Si necesitas acceso, contacta a soporte en info@tamefor.com")
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div>
        <label className={`block ${labelClass} font-semibold mb-2 text-sm`}>
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1a3a5c]/40" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
            className="w-full pl-10 bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className={`block ${labelClass} font-semibold mb-2 text-sm`}>
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1a3a5c]/40" />
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-12 bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a3a5c]/40 hover:text-[#1a3a5c] transition-colors"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {error && (
        <div className={`flex items-start gap-3 p-4 border-l-4 border-[#3d9a8b] ${dark ? "bg-white/10" : "bg-[#3d9a8b]/10"}`}>
          <AlertCircle className="w-5 h-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
          <p className={`${dark ? "text-white" : "text-[#1a3a5c]"} text-sm font-medium`}>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className={`w-full text-base font-semibold py-4 rounded-none transition-all duration-300 shadow-none border-2 disabled:opacity-60 ${
          dark
            ? "bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] border-[#3d9a8b] hover:border-white"
            : "bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white border-[#1a3a5c] hover:border-[#3d9a8b]"
        }`}
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
        {!loading && <ArrowRight className="ml-3 h-4 w-4" />}
      </Button>

      <p className={`text-center text-sm ${dark ? "text-white/60" : "text-[#1a3a5c]/60"}`}>
        ¿Olvidaste tu contraseña?{" "}
        <a href="mailto:info@tamefor.com" className="text-[#3d9a8b] font-semibold hover:underline">
          Contacta a soporte
        </a>
      </p>
    </form>
  )
}

interface LoginFormModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function LoginFormModal({
  isOpen,
  onClose,
  title = "Iniciar Sesión",
  description = "Accede con tu cuenta de TAMEFOR",
}: LoginFormModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 border-0 bg-white">
        {/* Close Button */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10">
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2a45] p-8 text-center">
          <DialogHeader>
            <div className="w-14 h-14 bg-[#3d9a8b] rounded-full mx-auto flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              {title}
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-2">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="p-8">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
