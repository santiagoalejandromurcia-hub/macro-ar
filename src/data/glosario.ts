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
    slug: 'fob',
    term: 'FOB — Free on Board',
    shortDef:
      'FOB (Free on Board, "libre a bordo") es el precio al que se vende una mercadería puesta a bordo del barco en el puerto de origen, sin incluir flete ni seguro internacionales. En Argentina, es el precio de referencia oficial para la exportación de granos que publica el MAGyP.',
    category: 'Sector externo · Agro',
    source: 'MAGyP — Subsecretaría de Mercados Agropecuarios',
    related: ['djve', 'balanza-comercial'],
    relatedRoute: { label: 'Ver precios FOB de granos en vivo', href: '/granos' },
    sections: [
      {
        heading: '¿Qué incluye y qué no incluye el precio FOB?',
        body: `El FOB cubre todos los costos hasta que la mercadería es puesta físicamente a bordo del barco: el precio del producto, el flete terrestre hasta el puerto, los gastos de carga y estiba, y los derechos de exportación (retenciones). A partir de ahí, los costos corren por cuenta del comprador.

Si a FOB le sumás el flete marítimo, obtenés el precio CFR (Cost and Freight). Si además incluís el seguro, llegás al CIF (Cost, Insurance and Freight). Son los tres Incoterms más usados en el comercio de granos.`,
      },
      {
        heading: 'Por qué importa en Argentina',
        body: `El Estado argentino cobra las retenciones (derechos de exportación) sobre el precio FOB de cada tonelada embarcada. Si el FOB de la soja es USD 305/tn y la retención es del 33%, el productor tributa USD 100,65 por tonelada al momento de exportar.

El MAGyP publica diariamente los precios FOB de referencia para cada grano en su API pública (magyp.gob.ar). Estos valores sirven también para calcular el "precio pizarra" que reciben los productores — que es el FOB menos retenciones, gastos de comercialización y flete campo-puerto.`,
      },
      {
        heading: 'Precio FOB vs. precio pizarra',
        body: `Pensá el FOB como el precio "de cabecera": lo que paga el comprador internacional puesto en el barco en Argentina. El precio pizarra es lo que efectivamente llega al productor, que es bastante menos:

· Se descuentan las retenciones (33% en soja, 12% en maíz y trigo).
· Se descuentan los costos de flete campo-puerto (USD 15-30/tn según la distancia).
· Se descuentan los gastos de comercialización (corredores, acondicionamiento, almacenaje).

Esa cadena de descuentos explica por qué cuando el FOB sube, el productor no percibe el 100% de la mejora.`,
      },
    ],
    faq: [
      {
        q: '¿Dónde consulto el precio FOB de la soja hoy?',
        a: 'El MAGyP publica los precios FOB de referencia en su sitio oficial y vía API. En MacroLibre también los publicamos en la sección Mercado de Granos con evolución histórica mensual.',
      },
      {
        q: '¿Es lo mismo precio FOB que precio en Chicago (CBOT)?',
        a: 'No. Chicago (CBOT) es el mercado de futuros de referencia global. El FOB argentino se calcula ajustando el precio de Chicago por el diferencial de base (basis), que refleja la prima o descuento que paga el mercado por la soja argentina específicamente.',
      },
      {
        q: '¿Por qué el FOB argentino puede diferir del de Brasil?',
        a: 'Cada origen tiene su propia oferta, logística y condiciones de contrato. Brasil y Argentina son los dos grandes exportadores de soja: cuando Argentina tiene buena cosecha y Brasil tiene problemas logísticos, el basis argentino puede mejorar y viceversa.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'djve',
    term: 'DJVE — Declaración Jurada de Ventas al Exterior',
    shortDef:
      'Una DJVE (Declaración Jurada de Ventas al Exterior) es el instrumento legal con el que un exportador argentino registra ante el MAGyP un contrato de venta de granos al exterior. Es el paso previo a embarcar y es el indicador clave que anticipa la liquidación futura de divisas del agro.',
    category: 'Sector externo · Agro',
    source: 'MAGyP — Dirección Nacional de Mercados y Estadística',
    related: ['fob', 'balanza-comercial'],
    relatedRoute: { label: 'Ver DJVE mensuales en el Mercado de Granos', href: '/granos' },
    sections: [
      {
        heading: '¿Para qué sirve?',
        body: `La DJVE tiene dos funciones principales:

1. Permite al Estado controlar el flujo de exportaciones y recaudar retenciones. Al momento de registrar la DJVE, se fija la alícuota que corresponde al precio FOB vigente. Esto protege al exportador de eventuales cambios de retenciones entre la firma del contrato y el embarque.

2. Es el principal indicador adelantado de cuántos dólares va a liquidar el agro en las próximas semanas. Los economistas y el BCRA la miran como termómetro de la oferta de divisas futura.`,
      },
      {
        heading: 'DJVE vs. embarques efectivos',
        body: `La DJVE es la promesa de venta; el embarque es la ejecución. Hay siempre un lag entre ambos: una empresa registra la DJVE cuando firma el contrato con el comprador exterior, pero los granos pueden embarcarse días, semanas o meses después.

Cuando los exportadores registran muchas DJVE pero no embarcan, puede ser señal de que especulan con que bajen las retenciones, o de que esperan el pico de cosecha para tener la mercadería disponible.`,
      },
      {
        heading: 'Cómo leer las DJVE semanales',
        body: `El MAGyP publica un reporte semanal de DJVE (el "Compras y DJVE de granos") que detalla:
· DJVE registradas en la semana (toneladas y USD).
· Acumulado del año versus el mismo período del año anterior.
· Desglose por grano (soja, maíz, trigo, girasol, cebada) y subproductos.

Un acumulado de DJVE muy por arriba del año anterior en abril o mayo suele indicar que los exportadores anticipan una buena cosecha y ya han colocado el grano con compradores externos.`,
      },
    ],
    faq: [
      {
        q: '¿Cuándo vence una DJVE?',
        a: 'Las DJVE tienen un plazo de embarque que varía según el tipo de grano y las condiciones del contrato, normalmente entre 90 y 180 días desde el registro. Vencida sin embarcar, el exportador pierde el tipo de cambio y la alícuota fijados al momento del registro.',
      },
      {
        q: '¿Las DJVE implican que el productor ya vendió?',
        a: 'No directamente. Las DJVE las registran los exportadores (acopios, cooperativas, exportadoras). El productor puede haber vendido su grano al exportador, pero también puede haber entregado en acopio y esperar el precio. Las DJVE miden la venta al exterior, no la venta en el mercado interno.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'merma',
    term: 'Merma (en granos y comercio)',
    shortDef:
      'La merma es la pérdida de peso, volumen o calidad que sufre una mercadería entre el momento de producción y el de entrega o venta. En el negocio de los granos, puede ocurrir por secado, venteo, manipulación, transporte o almacenaje. Se expresa en porcentaje del peso original.',
    category: 'Sector externo · Agro',
    source: 'SENASA / Bolsa de Cereales / MAGyP',
    related: ['fob', 'djve'],
    relatedRoute: { label: 'Ver Mercado de Granos', href: '/granos' },
    sections: [
      {
        heading: '¿Cuándo se produce la merma?',
        body: `Las mermas ocurren en múltiples etapas de la cadena de granos:

· Cosecha: pérdidas en el campo por caída del grano o daño mecánico de la cosechadora.
· Secado: al bajar la humedad del grano del 14-16% a los 13-13,5% que exige el mercado, se pierde peso por evaporación de agua.
· Almacenaje: respiración biológica del grano, ataques de hongos o insectos si las condiciones no son las adecuadas.
· Transporte: derrames durante la carga, descarga o el tránsito en camión o ferrocarril.

En general, el mercado acepta mermas de hasta 0,5-1% por grano en el transporte terrestre. Valores superiores generan disputas entre productor y acopiador/exportador.`,
      },
      {
        heading: 'Merma por secado: la más importante',
        body: `El grano se negocia a una humedad de referencia (13% para soja, 14% para maíz). Si el productor entrega soja con 16% de humedad, el acopiador aplica un descuento por secado que tiene dos componentes:

1. Merma por agua: la pérdida real de peso al secar. Una fórmula simple: merma % = (humedad entregada − humedad base) / (100 − humedad base) × 100.
2. Gasto de secado: el costo operativo de la secadora, que se descuenta por separado en pesos por tonelada.

Para el productor, es vital entregar el grano lo más cerca posible de la humedad base para evitar estos descuentos.`,
      },
      {
        heading: 'Merma en la liquidación de exportaciones',
        body: `En la exportación también hay mermas a tener en cuenta. El exportador puede recibir una penalidad del comprador externo si el grano llega con más impurezas, menor proteína o mayor humedad de lo pactado en el contrato FOB.

Asimismo, el diferencial entre lo que el productor entregó al acopio y lo que el exportador embarcó efectivamente puede ser fuente de conflictos y de ajustes en la liquidación final.`,
      },
    ],
    faq: [
      {
        q: '¿Quién paga la merma?',
        a: 'Depende de la etapa y del contrato. La merma por humedad al ingreso al acopio suele ser a cargo del productor; la merma por almacenaje prolongado puede ser responsabilidad compartida; la merma en transporte puede estar cubierta por el seguro de carga.',
      },
      {
        q: '¿Cómo se calcula la merma por secado?',
        a: 'Merma (%) = (humedad inicial − humedad base) / (100 − humedad base) × 100. Por ejemplo, con soja al 16% de humedad vs. base del 13%: (16-13)/(100-13) = 3/87 ≈ 3,45%. Eso significa que de 100 kg entregados, solo se pagan 96,55 kg.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    slug: 'brecha-cambiaria',
    term: 'Brecha Cambiaria',
    shortDef:
      'La brecha cambiaria es la diferencia porcentual entre el tipo de cambio oficial del BCRA y los tipos de cambio paralelos o financieros (dólar MEP, CCL, blue). Cuanto mayor es la brecha, más distorsionada está la economía y más difícil resulta para el sector exportador liquidar divisas sin perder competitividad.',
    category: 'Tipo de cambio',
    source: 'BCRA · Bluelytics · ArgentinaDatos',
    related: ['dolar-mep-blue-ccl', 'inflacion-ipc', 'balanza-comercial'],
    relatedRoute: { label: 'Ver dólar blue y brecha en vivo', href: '/#dashboard' },
    sections: [
      {
        heading: '¿Cómo se calcula?',
        body: `La fórmula es simple:

Brecha (%) = (dólar paralelo / dólar oficial − 1) × 100

Por ejemplo, si el oficial cotiza a $1.100 y el blue a $1.200: brecha = (1200/1100 − 1) × 100 = 9,1%.

Dependiendo de qué paralelo usés (blue, MEP o CCL), obtenés brechas ligeramente distintas. La brecha oficial con el blue suele ser la más citada por ser la más visible al ciudadano de a pie.`,
      },
      {
        heading: 'Por qué importa',
        body: `Una brecha alta desincentiva las exportaciones: el exportador recibe pesos al tipo de cambio oficial (más bajo), pero para reponer insumos importados tiene que ir al paralelo. Eso reduce el margen del negocio.

Simultáneamente, incentiva la subfacturación de exportaciones y la sobrefacturación de importaciones — prácticas que erosionan las reservas del BCRA. Por eso los economistas consideran que la brecha es uno de los principales indicadores de presión cambiaria.`,
      },
      {
        heading: 'Historia reciente de la brecha en Argentina',
        body: `La brecha ha vivido episodios extremos en Argentina:

· En 2022 llegó al 150-200% (oficial en $150, blue en $370).
· En diciembre 2023, tras la devaluación de Milei, colapsó del 180% a menos del 30% en pocos días.
· En 2025-2026, con el nuevo esquema de bandas cambiarias del BCRA, la brecha se mantuvo por debajo del 10%, lo que el mercado interpreta como una señal de normalización del mercado de cambios.

Una brecha menor al 5% es considerada prácticamente equivalente a un mercado unificado. Cuando supera el 20-30%, vuelven los problemas de formación de activos externos y presión sobre reservas.`,
      },
      {
        heading: 'Brecha y el campo: el "dólar agro"',
        body: `El sector agropecuario es especialmente sensible a la brecha. Cuando es alta, los productores prefieren retener el grano antes de liquidar dólares al tipo de cambio oficial, esperando una eventual devaluación o la implementación de un "dólar agro" (un tipo de cambio diferencial más alto para el sector).

Por eso reducir la brecha es condición necesaria para que el BCRA pueda acumular reservas genuinas: si los exportadores no liquidan, el Banco Central no compra divisas.`,
      },
    ],
    faq: [
      {
        q: '¿Cuál es la brecha cambiaria hoy?',
        a: 'Podés ver la brecha en tiempo real en el dashboard de MacroLibre. Al 12 de mayo de 2026, la brecha entre el dólar blue y el oficial se ubica por debajo del 1%, reflejando la convergencia dentro del esquema de bandas cambiarias vigente.',
      },
      {
        q: '¿Una brecha de 0% es posible y buena?',
        a: 'Es posible y es el objetivo de cualquier plan de unificación cambiaria. Con brecha cero no hay incentivo para maniobras de arbitraje entre mercados y los precios relativos se alinean. El riesgo es que requiere reservas suficientes para sostener el tipo de cambio oficial ante ataques especulativos.',
      },
      {
        q: '¿La brecha afecta la inflación?',
        a: 'Sí, indirectamente. Una brecha alta hace que las empresas formadoras de precios usen el tipo de cambio paralelo como referencia para sus costos de reposición, lo que genera inflación incluso sin devaluación oficial. Esto se llama "pass-through del tipo de cambio paralelo".',
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
