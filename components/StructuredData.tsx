/**
 * Componente para inyectar datos estructurados JSON-LD en el HTML
 * Mejora el SEO y la aparición en resultados de búsqueda enriquecidos
 */

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function StructuredData({ data }: StructuredDataProps) {
  // Si es un array, renderizar múltiples scripts
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </>
    )
  }

  // Si es un objeto, renderizar un solo script
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
