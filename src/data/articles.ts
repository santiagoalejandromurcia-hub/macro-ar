// ============================================================
// MacroAR.app — Artículos / Blog
// ============================================================
// Para agregar un artículo nuevo: copiá un objeto, cambiá los
// datos, y listo. Aparece automáticamente en la web.
// ============================================================

export interface Article {
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
  readTime: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'superavit-fiscal-historico-2025',
    title: 'Por qué el superávit fiscal es histórico',
    author: 'Martín Rapetti',
    authorRole: 'Economista — CEDES',
    date: '8 de marzo de 2026',
    summary: 'Argentina logró en 2024-2025 el primer superávit fiscal primario sostenido en más de una década. Analizamos los factores detrás de este resultado y su sostenibilidad.',
    image: '📊',
    tags: ['Fiscal', 'Superávit', 'Política Económica'],
    readTime: '8 min',
    content: `## El contexto: décadas de déficit

Argentina arrastra una historia de déficit fiscal crónico que ha sido la raíz de muchas de sus crisis macroeconómicas. Desde el retorno a la democracia en 1983, el país logró superávit primario sostenido únicamente durante el período 2003-2008, impulsado por el boom de commodities y la licuación del gasto post-devaluación.

## El ajuste fiscal de 2024

El programa de estabilización implementado a partir de diciembre de 2023 priorizó el equilibrio fiscal como ancla nominal del programa. Las principales medidas incluyeron la reducción de subsidios económicos (ahorro de ~1.5% del PIB), la licuación de jubilaciones y salarios públicos en los primeros meses, y la suspensión de obra pública y transferencias discrecionales a provincias.

Por el lado de los ingresos, la reintroducción del impuesto PAIS y la suba temporal de retenciones compensaron parcialmente la caída de la recaudación real asociada a la recesión del primer semestre.

## ¿Es sostenible?

La gran pregunta es si estos resultados fiscales son sostenibles en el mediano plazo. Hay señales mixtas. La recuperación económica del segundo semestre de 2024 mejoró la recaudación real. Pero la presión política por recomponer ingresos y retomar obra pública crece a medida que se acercan las elecciones.

## Comparación regional

En perspectiva regional, el ajuste fiscal argentino fue uno de los más agresivos de la historia latinoamericana. Argentina pasó de un déficit de 3.5% del PIB a un superávit de 1.8% en apenas 18 meses — una corrección de más de 5 puntos porcentuales.

## Conclusión

El superávit es un logro importante, pero su sostenibilidad dependerá de la capacidad política de mantener la disciplina fiscal en un contexto de creciente demanda social y ciclo electoral. La clave estará en institucionalizar reglas fiscales que trasciendan la voluntad política de turno.`,
  },
  {
    slug: 'vaca-muerta-2026-boom-energetico',
    title: 'Análisis Vaca Muerta 2026: el boom energético',
    author: 'Luciana Díaz',
    authorRole: 'Analista de Energía — Economía & Energía',
    date: '2 de marzo de 2026',
    summary: 'Vaca Muerta alcanzó un récord de 450.000 barriles diarios en Q4 2025. Impacto en balanza comercial, inversiones y potencial exportador.',
    image: '⛽',
    tags: ['Energía', 'Vaca Muerta', 'Exportaciones'],
    readTime: '10 min',
    content: `## Récords de producción

Vaca Muerta cerró 2025 con cifras históricas. La producción de petróleo no convencional alcanzó los 450.000 barriles diarios en el cuarto trimestre, un crecimiento del 28% interanual. En gas, la producción superó los 95 millones de metros cúbicos diarios, consolidando a la formación neuquina como una de las cuencas shale más productivas del mundo fuera de EE.UU.

## Inversiones y desarrollo

El flujo de inversiones en 2025 superó los USD 8.500 millones, un 35% más que en 2024. YPF lideró con un plan de USD 5.000 millones anuales, enfocado en producción y la construcción del oleoducto Vaca Muerta Sur.

## Impacto en la balanza comercial

El sector energético se transformó de deficitario a superavitario. En 2025, las exportaciones de energía alcanzaron los USD 12.800 millones, generando un superávit sectorial de USD 8.600 millones — el mayor de la historia argentina. Esto fue determinante para sostener la acumulación de reservas del BCRA.

## Infraestructura: el cuello de botella

El oleoducto Vaca Muerta Sur avanza con un 40% de ejecución y se espera esté operativo en el segundo semestre de 2027. El Gasoducto Presidente Néstor Kirchner ya opera a plena capacidad en su primera etapa.

## Perspectivas 2026-2030

Las proyecciones estiman que Argentina podría alcanzar 1 millón de barriles diarios equivalentes para 2030. El proyecto ARGLNG podría convertir al país en exportador neto de gas licuado para 2028, compitiendo en mercados asiáticos.`,
  },
  {
    slug: 'corteza-prefrontal-izquierda-argentina-subdesarrollada',
    title: 'La Corteza Prefrontal: El "Centro de Control" que la Izquierda Argentina Parece Haber Olvidado',
    author: 'Santiago Murcia',
    authorRole: 'Licenciado en Economía',
    date: '21 de febrero de 2026',
    summary: 'La corteza prefrontal es el “director” del cerebro que planifica, frena impulsos y decide con cabeza. Los zurdos argentinos (kirchneristas, peronistas y sindicatos) parecen tenerla apagada: gasto descontrolado, rechazo a reformas y drama victimista los dejan sin mapa hacia la prosperidad. Un análisis satírico que une neurociencia y libertad económica.',
    image: '🧠',
    tags: ['Izquierda', 'Política', 'Neurociencia', 'Dopamina'],
    readTime: '7 min',
    content: `## La Corteza Prefrontal: El "Centro de Control" que la Izquierda Argentina Parece Haber Olvidado
'La Corteza Prefrontal: El "Centro de Control" que la Izquierda Argentina Parece Haber Olvidado

En el vasto y misterioso universo del cerebro humano, hay una región que actúa como el director de orquesta de nuestras decisiones más inteligentes: la corteza prefrontal. Situada en la parte frontal del lóbulo frontal, esta área es responsable de las funciones ejecutivas superiores, esas que nos distinguen de actuar por impulsos primitivos y nos permiten planificar, razonar y tomar decisiones racionales. 

Imaginemos por un momento que esta corteza es como el timón de un barco en medio de una tormenta económica: sin ella, el navío se deja llevar por olas de populismo, promesas vacías y reacciones emocionales. 

Ahora, aplicando un lente satírico pero revelador a la realidad política argentina, surge una hipótesis intrigante: ¿y si los “zurdos” —kirchneristas, peronistas, sindicalistas y toda la izquierda argentina— tuvieran esta corteza prefrontal subdesarrollada? 

1. Planificación a Largo Plazo: ¿Dónde Está el Mapa de los Zurdos?
Durante los gobiernos kirchneristas el Estado se infló con subsidios y planes sociales sin prever el déficit y la inflación que hoy nos ahoga. Los sindicatos bloquean la modernización laboral gritando “precariedad”, condenando a la mitad de la población al trabajo en negro. Prefieren el corto plazo de paros y piquetes antes que reformas que generen prosperidad real.

2. Inhibición de Impulsos: El “No” que Nunca Llega
Impuestos altos, expropiaciones caprichosas y defensa de indemnizaciones millonarias que ahuyentan inversiones. Ignoran que países con mercados flexibles (Chile, Singapur, Nueva Zelanda) tienen desempleo bajísimo. Su impulsividad los hace predecibles y débiles.

3. Emociones y Drama Permanente
Narrativas victimistas y lealtad tribal a Perón y Kirchner en lugar de datos duros. Por eso rechazan bajar impuestos y gasto público: lo ven como “ataque al pueblo” en vez de camino a la libertad individual.

Conclusión
La “subdesarrollo prefrontal” explica el caos argentino. Pero la neuroplasticidad existe: con exposición a ideas de Hayek, Friedman y libertad real, el cerebro puede despertar. ¡Por una Argentina con cerebros a pleno rendimiento, avancemos hacia la libertad!`
  },
  {
    slug: 'reservas-bcra-estrategia-acumulacion',
    title: 'La estrategia de acumulación de reservas del BCRA',
    author: 'Carolina Sturla',
    authorRole: 'Economista Senior — Fundación Capital',
    date: '10 de febrero de 2026',
    summary: 'El BCRA acumuló más de USD 9.000M en reservas desde dic 2023. Estrategia, flujos y desafíos por delante.',
    image: '🏦',
    tags: ['BCRA', 'Reservas', 'Sector Externo'],
    readTime: '6 min',
    content: `## De la crisis a la recomposición

En diciembre de 2023, las reservas netas del BCRA eran negativas en USD 11.000 millones. La situación era crítica con vencimientos de deuda significativos y un mercado cambiario desdoblado.

## La estrategia de acumulación

El superávit comercial fue el principal motor, impulsado por la cosecha récord y Vaca Muerta. El blanqueo de capitales aportó depósitos en dólares por más de USD 20.000 millones. El acuerdo con el FMI incluyó desembolsos por USD 5.000 millones.

## Reservas brutas vs. netas

Las reservas brutas alcanzaron USD 32.450 millones en mayo de 2025. Descontando encajes y swaps, las netas se estiman en USD 8.000-10.000 millones — positivas pero aún modestas.

## Los desafíos: cepo y deuda

La salida del cepo requiere reservas netas superiores a USD 15.000 millones. Entre 2025 y 2027, Argentina enfrenta pagos por más de USD 20.000 millones entre bonos y obligaciones con el FMI.

## Perspectiva

La trayectoria es positiva pero frágil. El éxito dependerá de mantener el superávit comercial, lograr acceso a mercados voluntarios de deuda, y gestionar una apertura cambiaria gradual.`,
  },
  {
    slug: 'riesgo-pais-convergencia-emergente',
    title: 'Riesgo país: ¿convergencia hacia niveles emergentes?',
    author: 'Pablo Guidotti',
    authorRole: 'Profesor — UTDT',
    date: '28 de enero de 2026',
    summary: 'El riesgo país cayó de 2.900 a menos de 700 pb en 15 meses. ¿Puede Argentina volver a los mercados voluntarios de deuda?',
    image: '🌍',
    tags: ['Riesgo País', 'Deuda', 'Mercados'],
    readTime: '5 min',
    content: `## La compresión de spreads

La caída del riesgo país desde los 2.900 puntos de enero de 2024 a 687 puntos básicos es una de las correcciones más significativas en la historia de mercados emergentes.

## Factores detrás de la mejora

El compromiso con el equilibrio fiscal eliminó el principal riesgo de solvencia. La desinflación redujo la incertidumbre. Las noticias positivas de Vaca Muerta mejoraron perspectivas de generación de divisas. Y el acuerdo con el FMI proporcionó un marco institucional valorado por el mercado.

## Comparación con pares

Con 687 pb, Argentina todavía tiene un spread superior al promedio de emergentes (350-400 pb). Pero la convergencia es notable considerando que hace 15 meses cotizaba como crédito en default.

## ¿Retorno a mercados voluntarios?

Para emitir deuda a tasas razonables se necesita un riesgo país inferior a 500 pb. Los catalizadores incluyen una salida ordenada del cepo, mejora en el rating crediticio, y continuidad del superávit post-elecciones.

## El camino por delante

Argentina ha tenido múltiples episodios de compresión seguidos de crisis. La diferencia esta vez podría estar en la solidez del ancla fiscal. Pero solo el tiempo y la consistencia de las políticas lo confirmarán.`,
  },
];
