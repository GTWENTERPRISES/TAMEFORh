"use client"

import { Leaf, TreePine, Flower2, Mountain, Sun } from "lucide-react"

const partners = [
  { icon: Leaf, name: "EcoLeaf" },
  { icon: TreePine, name: "GreenForest" },
  { icon: Flower2, name: "BloomNature" },
  { icon: Mountain, name: "TerraPure" },
  { icon: Sun, name: "SolarGreen" },
]

export function PartnersSection() {
  return (
    <section className="py-12 bg-[#1a3a5c] border-y border-[#3d9a8b]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-[#3d9a8b]/70 font-medium uppercase tracking-wider text-sm">Major Partners</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-2 text-[#3d9a8b]/70 hover:text-white transition-colors cursor-pointer">
              <partner.icon className="h-8 w-8" />
              <span className="font-sans text-xl font-bold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


