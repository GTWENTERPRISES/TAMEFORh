# Optimización Móvil - TAMEFOR

## Problemas Identificados y Soluciones

### 1. Header / Navegación
**Problemas:**
- Top bar muy densa en móvil
- Texto "Soluciones Forestales y Ambientales" demasiado largo
- Iconos sociales pueden ser pequeños para touch
- Espaciado insuficiente

**Soluciones:**
- ✅ Top bar responsive con elementos apilados en móvil
- ✅ Texto más corto en móvil o escondido
- ✅ Íconos sociales más grandes (mínimo 44x44px)
- ✅ Espaciado táctil adecuado (min 8px entre elementos)

### 2. Hero Section
**Problemas:**
- Títulos muy grandes en móvil (text-7xl)
- Padding excesivo
- Botones pueden sobrepasar el contenedor
- Imágenes flotantes ocultas pero pueden afectar layout

**Soluciones:**
- ✅ Escala de texto responsive: mobile (text-4xl) → tablet (text-5xl) → desktop (text-7xl)
- ✅ Padding reducido en móvil: py-12 móvil vs py-32 desktop
- ✅ Botones en column en móvil, row en desktop
- ✅ Min-height ajustado para móvil

### 3. About Section
**Problemas:**
- Tabs pueden hacer wrap feo
- Imágenes con posiciones absolutas problemáticas
- Stats en 2 columnas puede ser apretado

**Soluciones:**
- ✅ Tabs scrollables horizontalmente en móvil
- ✅ Imágenes decorativas ocultas en móvil
- ✅ Stats en 1 columna en móvil pequeño

### 4. Courses Section
**Problemas:**
- Cards de 3 columnas demasiado estrechas en tablet
- Texto puede ser pequeño
- Espaciado inconsistente

**Soluciones:**
- ✅ Grid responsive: 1col móvil → 2col tablet → 3col desktop
- ✅ Padding interno aumentado para móvil
- ✅ Font sizes ajustados para legibilidad

### 5. Contact Section
**Problemas:**
- Form fields pueden ser pequeños para touch
- Labels pueden necesitar más contraste
- Grid layout complejo

**Soluciones:**
- ✅ Inputs altura mínima 48px
- ✅ Labels bold y spacing aumentado
- ✅ Layout simplificado en móvil (1 columna)

### 6. Footer
**Problemas:**
- 4 columnas muy apretadas
- Links pequeños para touch
- Mucho contenido vertical

**Soluciones:**
- ✅ Grid: 1col móvil → 2col tablet → 4col desktop
- ✅ Links con padding aumentado (min 44px altura)
- ✅ Spacing entre secciones incrementado

## Breakpoints Tailwind
```
sm: 640px   - Móvil grande
md: 768px   - Tablet
lg: 1024px  - Desktop pequeño
xl: 1280px  - Desktop grande
2xl: 1536px - Desktop extra grande
```

## Touch Target Guidelines
- Mínimo: 44x44px (iOS) / 48x48px (Material Design)
- Recomendado: 48x48px con 8px de spacing

## Checklist de Optimización

### Tipografía Móvil
- [ ] Títulos h1: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
- [ ] Títulos h2: text-2xl sm:text-3xl md:text-4xl lg:text-5xl
- [ ] Títulos h3: text-xl sm:text-2xl md:text-3xl
- [ ] Body text: text-base (16px mínimo)
- [ ] Small text: text-sm (14px mínimo)

### Espaciado Móvil
- [ ] Section padding: py-12 md:py-16 lg:py-24
- [ ] Container padding: px-4 md:px-6 lg:px-8
- [ ] Gap entre elementos: gap-4 md:gap-6 lg:gap-8

### Interacciones Táctiles
- [ ] Botones: min-h-12 (48px)
- [ ] Links: py-3 (min 44px height)
- [ ] Form inputs: h-12 md:h-14
- [ ] Iconos clicables: w-11 h-11 (44px)

### Layout Responsive
- [ ] Grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- [ ] Flex direction: flex-col md:flex-row
- [ ] Hidden elements: hidden lg:block
- [ ] Aspect ratios preservados

### Imágenes
- [ ] Next Image con priority en hero
- [ ] Sizes attribute configurado
- [ ] Lazy loading para imágenes below fold
- [ ] WebP format cuando posible
