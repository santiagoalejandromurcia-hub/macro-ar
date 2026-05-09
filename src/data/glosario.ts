// ============================================================
// MacroLibre — Glosario macroeconómico
// ============================================================
// Cada entrada es una página independiente en /glosario/[slug].
// Pensadas para SEO long-tail: rankean fácil porque la mayoría
// de los grandes (Ámbito, Cronista) no las explican bien.
//
// Para agregar una entrada nueva: copiá un objeto y completá.
// Aparece automáticamente en /glosario y en sitemap.xml.
// ============================================================

export interface GlossarySection {
  heading: string;
  body: string; // párrafos separados por \n\n
}

export interface GlossaryFAQ {
  q: string;
  a: string;
}

export interface GlossaryEntry {
  slug: string;
  term: string;            // título visible
  shortDef: string;        // 1-2 oraciones — usado en SERP description
  category: string;        // "Tipo de cambio", "Inflación", etc.
  source: string;          // organismo de referencia
  related: string[];       // slugs de entradas relacionadas
  relatedRoute?: { label: string; href: string }; // link al chart/calc relevante
  sections: GlossarySection[];
  faq?: GlossaryFAQ[];     // si existe, se renderiza FAQPage schema
}

export const glosario: GlossaryEntry[] = [
  // ════════════════════════════════════════════════════════════
  {
    slug: 'riesgo-pais',
    term: 'Riesgo País',
    shortDef:
      'El Riesgo País es la sobretasa, en puntos básicos, que paga la deuda soberana argentina por encima de los bonos del Tesoro de Estados Unidos. Cuanto más alto, menos confianza tiene el mercado en que Argentina pague su deuda.',
    category: 'Tipo de cambio · Mercados',
    source: 'JP Morgan EMBI+ / EMBIGD',
    related: ['inflacion-ipc', 'balanza-comercial'],
    relatedRoute: { label: 'Ver gráfico de Riesgo País en vivo', href: '/#externo' },
    sections: [
      {
        heading: '¿Qué mide exactamente?',
        body: `El Riesgo País mide la diferencia (spread) entre el rendimiento de los bonos soberanos argentinos en dólares y los bonos del Tesoro estadounidense de plazo equivalente. Se expresa en puntos básicos (pb): 100 puntos básicos = 1%.

Si Argentina tiene un Riesgo País de 600 pb, significa que sus bonos pagan 6 puntos porcentuales por encima de los del Tesoro de EE. UU. Es la prima que el inversor exige por prestarle a Argentina en lugar de a un emisor que considera "libre de riesgo".`,
      },
      {
        heading: '¿Quién lo calcula?',
        body: `El indicador más citado es el EMBI (Emerging Markets Bond Index) de JP Morgan, en sus dos variantes: EMBI+ y EMBIGD (Global Diversified). En febrero de 2026, JP Morgan reclasificó a Argentina del EMBI+ al EMBIGD por el cambio en la composición de su deuda elegible.

JP Morgan lo recalcula y publica todos los días hábiles, al cierre del mercado de Nueva York.`,
      },
      {
        heading: 'Lecturas típicas',
        body: `Para que tengas un mapa rápido:

· Menos de 200 pb: emisor de bajo riesgo (Chile, Uruguay en buenos años).
· Entre 200 y 500 pb: riesgo moderado.
· Entre 500 y 1.000 pb: riesgo alto, con dificultades para emitir deuda nueva.
· Más de 1.000 pb: el mercado ya descuenta una probabilidad significativa de default. Argentina llegó a 2.500+ en julio 2022 y a más de 1.900 en diciembre 2023.`,
      },
      {
        heading: '¿Por qué importa al ciudadano de a pie?',
        body: `Tres canales prácticos:

1. Si baja, el Estado puede emitir deuda nueva más barata, lo que en teoría libera presión sobre la emisión monetaria y la inflación.
2. Las empresas argentinas pagan más caro su financiamiento internacional cuando el Riesgo País es alto, lo que encarece la inversión.
3. Es uno de los termómetros que mira el mercado para anticipar correcciones cambiarias: caídas fuertes y sostenidas suelen anteceder una baja del dólar paralelo.`,
      },
    ],
    faq: [
      {
        q: '¿Qué Riesgo País tiene hoy Argentina?',
        a: 'Podés verlo en vivo en el dashboard de MacroLibre. JP Morgan actualiza el EMBIGD para Argentina todos los días hábiles al cierre de Nueva York.',
      },
      {
        q: '¿Qué pasa si el Riesgo País supera los 1.000 puntos?',
        a: 'A partir de 1.000 pb, emitir deuda nueva en mercados internacionales se vuelve prácticamente prohibitivo. El país queda obligado a financiarse vía organismos (FMI, BID) o vía emisión monetaria local.',
      },
      {
        q: '¿Por qué cambió de EMBI+ a EMBIGD en 2026?',
        a: 'JP Morgan reclasifica periódicamente a los emisores según el peso de su deuda y la liquidez. La migración al EMBIGD refleja un cambio en cómo el banco de inversión categoriza a Argentina dentro de su universo emergente.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'inflacion-ipc',
    term: 'Inflación e IPC',
    shortDef:
      'La inflación es el aumento generalizado y sostenido de los precios. En Argentina se mide con el Índice de Precios al Consumidor (IPC) que publica el INDEC todos los meses, midiendo la variación de una canasta representativa de bienes y servicios.',
    category: 'Inflación',
    source: 'INDEC',
    related: ['riesgo-pais', 'dolar-mep-blue-ccl'],
    relatedRoute: { label: 'Ver inflación mensual e interanual', href: '/inflacion' },
    sections: [
      {
        heading: '¿Cómo se mide?',
        body: `El INDEC releva mensualmente los precios de una canasta de aproximadamente 320.000 precios de bienes y servicios distribuidos en 6 regiones del país. La canasta refleja el patrón de consumo promedio del hogar argentino y se actualiza periódicamente con la Encuesta Nacional de Gastos de los Hogares (ENGHo).

El IPC se publica habitualmente entre el día 11 y el 14 del mes siguiente al medido. Por ejemplo, la inflación de marzo se conoce a mediados de abril.`,
      },
      {
        heading: 'Inflación mensual, interanual y núcleo',
        body: `Tres lecturas que conviene distinguir:

· Inflación mensual: variación del IPC respecto al mes anterior. Es la cifra que más se cita en titulares.
· Inflación interanual: variación contra el mismo mes del año anterior. Mide tendencia de mediano plazo.
· Inflación núcleo: excluye precios estacionales (frutas, verduras) y regulados (tarifas, naftas). Refleja mejor la presión inflacionaria "subyacente" que el Banco Central puede atacar con política monetaria.`,
      },
      {
        heading: 'Dato versus expectativa: el REM',
        body: `El BCRA publica mensualmente el Relevamiento de Expectativas de Mercado (REM), una encuesta a 40+ consultoras y bancos sobre lo que esperan que pase con inflación, PBI, tipo de cambio y otras variables.

Cuando el dato del INDEC sale por debajo del REM, el mercado lo lee como buena señal y suele bajar el riesgo país. Cuando sale por arriba, ocurre lo contrario.`,
      },
      {
        heading: 'Inflación mayorista (IPIM)',
        body: `El IPIM mide los precios al por mayor: lo que cobran productores, importadores y mayoristas antes de que los productos lleguen al consumidor final. Suele anticipar la inflación minorista por 1 a 3 meses.

Si el IPIM se acelera mientras el IPC se desacelera, suele ser señal de que vienen aumentos en el comercio minorista.`,
      },
    ],
    faq: [
      {
        q: '¿Cuánto fue la inflación de marzo 2026?',
        a: 'La inflación mensual de marzo de 2026 fue del 3.4%, con un acumulado interanual del 32.6%. Datos actualizados disponibles en MacroLibre.',
      },
      {
        q: '¿Cuál es la diferencia entre inflación mensual e interanual?',
        a: 'La mensual compara el mes contra el anterior; la interanual lo compara contra el mismo mes del año pasado. La interanual es mejor para ver tendencia, la mensual para ver el momento.',
      },
      {
        q: '¿Qué es la inflación núcleo y por qué importa?',
        a: 'Es la inflación que excluye precios muy volátiles (frutas y verduras) y regulados (tarifas). Refleja la presión inflacionaria subyacente y es la que mira el BCRA para decidir política monetaria.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'emae',
    term: 'EMAE — Estimador Mensual de Actividad Económica',
    shortDef:
      'El EMAE es el indicador con el que el INDEC mide mes a mes la actividad económica argentina. Es una aproximación rápida al PBI: usa la misma estructura sectorial pero con frecuencia mensual en lugar de trimestral.',
    category: 'Actividad económica',
    source: 'INDEC',
    related: ['inflacion-ipc', 'balanza-comercial'],
    relatedRoute: { label: 'Ver EMAE histórico desde 2017', href: '/#actividad' },
    sections: [
      {
        heading: '¿Por qué un indicador mensual?',
        body: `El PBI oficial tiene frecuencia trimestral y se publica con varios meses de rezago. Para política económica, prensa y mercados, ese delay es demasiado. El EMAE llena ese hueco: replica la estructura sectorial del PBI pero la actualiza todos los meses con un rezago de unos 60 días.

El INDEC lo publica en su informe técnico de actividad alrededor del 20 de cada mes.`,
      },
      {
        heading: '¿Qué sectores incluye?',
        body: `El EMAE pondera 15 sectores que reproducen la estructura del PBI: agro, pesca, minería, industria manufacturera, electricidad, construcción, comercio, transporte, intermediación financiera, inmobiliario, administración pública, enseñanza, salud, servicios sociales y otros servicios.

Cuando un sector clave (industria, comercio, construcción) tiene un movimiento fuerte, suele arrastrar al EMAE general porque pesan mucho en la economía.`,
      },
      {
        heading: 'Original vs. desestacionalizado',
        body: `El EMAE se publica en dos versiones:

· Serie original: el dato crudo. Tiene picos y valles propios de cada mes (los meses de cosecha siempre suben, enero por turismo siempre cae).
· Serie desestacionalizada: ajustada para remover esos efectos estacionales. Es la que se usa para detectar cambios de tendencia reales.

Cuando un titular dice "la actividad subió 0,8% mensual", casi siempre se refiere a la serie desestacionalizada.`,
      },
      {
        heading: 'Variaciones que tenés que saber distinguir',
        body: `Tres formas habituales de mirar el EMAE:

· Variación mensual desestacionalizada: cómo viene el momentum reciente.
· Variación interanual: cómo está versus el mismo mes del año pasado. Muestra si la economía está en expansión o contracción de mediano plazo.
· Variación acumulada: cómo va el año versus el mismo período del anterior.`,
      },
    ],
    faq: [
      {
        q: '¿Cuál es la diferencia entre EMAE y PBI?',
        a: 'El PBI es trimestral y oficial; el EMAE es mensual y es una estimación que usa la misma estructura sectorial. El EMAE permite ver tendencias mes a mes mientras se espera el PBI definitivo.',
      },
      {
        q: '¿Cuándo se publica el EMAE?',
        a: 'El INDEC publica el EMAE alrededor del día 20 de cada mes, con un rezago de aproximadamente 60 días respecto al período medido.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'dolar-mep-blue-ccl',
    term: 'Dólar MEP, Blue y CCL: diferencias',
    shortDef:
      'El dólar MEP, el dólar Blue y el dólar CCL son tres formas distintas de comprar dólares en Argentina. Se diferencian por el canal (legal o informal), la operación financiera detrás y, en consecuencia, el precio.',
    category: 'Tipo de cambio',
    source: 'BCRA · Bluelytics · ArgentinaDatos',
    related: ['riesgo-pais', 'inflacion-ipc'],
    relatedRoute: { label: 'Calculadora: ¿dólar, plazo fijo o bonos?', href: '/calculadora' },
    sections: [
      {
        heading: 'Dólar Oficial',
        body: `Es el tipo de cambio mayorista al que el BCRA compra y vende divisas a bancos y empresas autorizadas. El BCRA interviene activamente para que se mueva dentro de una banda o un esquema de flotación administrada.

El minorista (lo que ves en bancos y casas de cambio) suele estar unos centavos por encima del mayorista por el spread comercial.`,
      },
      {
        heading: 'Dólar MEP (Mercado Electrónico de Pagos)',
        body: `Es la operación de comprar un bono argentino que cotiza en pesos y venderlo simultáneamente en su versión en dólares. La diferencia entre las dos cotizaciones, ajustada por la cantidad, te da el "precio" implícito del dólar MEP.

Es 100% legal, se opera vía cualquier broker o banco con cuenta comitente, y los dólares se acreditan en tu cuenta bancaria local. El bono más usado para esto es el AL30. Tiene una restricción: hay que esperar 24 hs entre comprar el bono y venderlo en dólares (parking).`,
      },
      {
        heading: 'Dólar CCL (Contado con Liquidación)',
        body: `Misma idea que el MEP pero los dólares se acreditan en una cuenta bancaria en el exterior, no en Argentina. Se usa principalmente para sacar dólares del país de manera legal.

Suele cotizar un poco por arriba del MEP por el costo extra de transferencia y porque la demanda viene de quienes quieren fugar capitales legalmente.`,
      },
      {
        heading: 'Dólar Blue',
        body: `Es el tipo de cambio del mercado informal: cuevas, "arbolitos" de la City, contactos personales. Es ilegal pero ampliamente tolerado y, durante años, fue el termómetro real del mercado paralelo.

Su precio se forma por oferta y demanda libre, sin intervención. Cuando hay desconfianza fuerte, el blue es el primero en saltar. Cuando el cepo se afloja, suele converger con el MEP porque desaparece el incentivo del mercado negro.`,
      },
      {
        heading: 'La brecha cambiaria',
        body: `La "brecha" es la diferencia porcentual entre el dólar oficial y los dólares paralelos (MEP, blue, CCL). Es el indicador que más miran los economistas para evaluar la presión sobre el tipo de cambio.

· Brecha menor a 5%: el mercado está unificado en la práctica.
· Brecha 5%-20%: tensión moderada.
· Brecha mayor a 50%: situación insostenible — siempre se corrige, vía devaluación oficial o vía colapso del paralelo.`,
      },
    ],
    faq: [
      {
        q: '¿Cuál dólar conviene comprar hoy?',
        a: 'Depende de si querés legalidad, dónde necesitás los dólares (Argentina o exterior) y la brecha vigente. La calculadora de MacroLibre te muestra cuánto te habría rendido cada uno desde cualquier fecha pasada.',
      },
      {
        q: '¿Es legal operar dólar MEP?',
        a: 'Sí, es completamente legal. Se opera vía bonos a través de un broker o banco con cuenta comitente. La AFIP cruza información pero no es una operación que requiera autorización especial.',
      },
      {
        q: '¿Cuál es la diferencia entre MEP y CCL?',
        a: 'En el MEP los dólares se acreditan en tu cuenta bancaria argentina; en el CCL se acreditan en una cuenta en el exterior. El CCL suele cotizar un poco por encima del MEP.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'balanza-comercial',
    term: 'Balanza Comercial',
    shortDef:
      'La balanza comercial es la diferencia entre lo que un país exporta y lo que importa en bienes durante un período. Si exporta más de lo que importa, hay superávit comercial; si importa más, hay déficit.',
    category: 'Sector externo',
    source: 'INDEC · INTERCEX',
    related: ['riesgo-pais', 'emae'],
    relatedRoute: { label: 'Ver balanza comercial mensual', href: '/#externo' },
    sections: [
      {
        heading: '¿Qué incluye y qué no?',
        body: `La balanza comercial mide solo bienes — productos físicos que cruzan la frontera. No incluye servicios (turismo, software, fletes), ni movimientos financieros, ni transferencias.

Cuando ves "balanza de pagos" en cambio, esa sí incluye todo: bienes, servicios, ingresos del trabajo, rentas y movimientos de capital. La balanza comercial es solo el primer componente.`,
      },
      {
        heading: 'Por qué importa para Argentina',
        body: `Argentina tiene una historia recurrente de "restricción externa": cada vez que la economía crece, las importaciones suben más rápido que las exportaciones, la balanza se vuelve deficitaria, se acaban las reservas y se gatilla una crisis cambiaria.

Por eso, el saldo comercial es uno de los indicadores que más se mira para anticipar tensiones cambiarias. Un superávit comercial sólido (más de USD 1.000 M mensuales sostenidos) es la principal fuente genuina de dólares que tiene el país.`,
      },
      {
        heading: 'Composición típica',
        body: `Las exportaciones argentinas se concentran en cuatro grandes rubros: productos primarios (soja, maíz, trigo), manufacturas de origen agropecuario (harinas, aceites), manufacturas de origen industrial (autos, productos químicos) y combustibles y energía (Vaca Muerta es cada vez más relevante).

Las importaciones se dividen en bienes de capital (máquinas), insumos para la industria, energía (cuando no autoabastece), bienes de consumo y vehículos.`,
      },
      {
        heading: 'Estacionalidad: la liquidación del agro',
        body: `El segundo trimestre de cada año (marzo a junio) concentra la liquidación de divisas del agro argentino, especialmente la cosecha gruesa. Es cuando entran más dólares por exportaciones.

Si querés evaluar si un superávit es estructural o estacional, mirá el promedio de los últimos 12 meses, no el último mes solo.`,
      },
    ],
  },
];

// Helper: encontrar entrada por slug
export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glosario.find((g) => g.slug === slug);
}

// Helper: agrupar por categoría (para el índice)
export function groupGlossaryByCategory(): Record<string, GlossaryEntry[]> {
  return glosario.reduce<Record<string, GlossaryEntry[]>>((acc, entry) => {
    if (!acc[entry.category]) acc[entry.category] = [];
    acc[entry.category].push(entry);
    return acc;
  }, {});
}
