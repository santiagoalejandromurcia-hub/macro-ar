// ============================================================
// MacroLibre — Artículos / Blog
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
    slug: 'universidad-gratuita-negocio-caro-argentina',
    title: 'La Universidad Gratuita Que Nadie Termina: El Negocio Más Caro de Argentina',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '17 de mayo de 2026',
    summary: 'Cada graduado de una universidad nacional le cuesta al Estado USD 40.000. Solo 2 de cada 10 ingresantes termina la carrera. El sistema universitario público argentino enfrenta una paradoja: es gratuito para quien entra, pero carísimo para quien lo financia.',
    image: '🎓',
    tags: ['Universidad', 'Educación', 'Gasto Público', 'Política Económica'],
    readTime: '9 min',
    content: `## El restaurante que no te cobra la cuenta

Hay un restaurante en Argentina que no te cobra la cuenta. Podés entrar, sentarte, pedir lo que quieras. El menú es extenso, el local es grande, la cocina trabaja todo el año. El problema es que solo 2 de cada 10 clientes terminan de comer. Los otros 8 se van a mitad del plato — o nunca llegan a la mesa principal.

¿Y quién paga? Todos los argentinos. Incluso los que nunca entraron al restaurante.

Eso es, en esencia, el sistema universitario público argentino.

## El Número que Nadie Quiere Ver

En mayo de 2026, el Subsecretario de Políticas Universitarias Alejandro Álvarez difundió una cifra que generó escándalo: cada graduado de una universidad nacional le cuesta al Estado argentino $57 millones de pesos — aproximadamente **USD 40.000 por egresado**.

No es un cálculo de un think tank opositor. Es el número oficial del Ministerio de Capital Humano, calculado sobre 1.980.136 estudiantes y 93.321 egresados de pregrado y grado en universidades nacionales durante 2024.

¿Por qué es tan alto ese número? Porque el denominador es pequeño.

Según el informe *Radiografía de las universidades argentinas* de la Fundación Libertad (2024), solo **20,7 de cada 100 ingresantes terminan la carrera** — calculado como el cociente entre ingresantes 2018 y egresados 2023. En las universidades privadas, ese número trepa al 41,7%.

La analogía es simple: si tenés una fábrica donde entran 100 materias primas y solo salen 20 productos terminados, el costo por unidad no es bajo aunque la producción sea "gratuita". Es altísimo — porque pagás el 100% de los insumos para obtener el 20% de los resultados.

Y la tendencia empeora: desde 2013 la cantidad de estudiantes creció un 39,1%, mientras que la de egresados aumentó tan solo un 10,3%. Más entrada, menos salida. La fábrica crece pero produce menos proporcionalmente.

## El CBC: El Filtro que Nadie Llama Filtro

En la UBA el fenómeno tiene nombre propio: el Ciclo Básico Común.

Según datos de la propia Secretaría Académica de la UBA, el 33% de los ingresantes se gradúa si contamos desde el CBC. Pero el 62% lo hace si medimos solo a quienes superaron el CBC. La ex secretaria de Políticas Universitarias Danya Tavela lo describió con precisión: "un 30% lo supera y sigue en carrera; otro 30% lo deja y otro 30% se queda dando vueltas sin avanzar".

Dicho en términos de costo real: una porción significativa del presupuesto universitario financia años de cursada de estudiantes que el propio sistema ya sabe estadísticamente que no van a terminar.

El CBC funciona como la capa superficial de un filtro de agua: retiene las impurezas más grandes. Pero nadie lo diseñó para eso — y nadie en el sistema universitario tiene incentivos para optimizarlo, porque más alumnos inscriptos significa más presupuesto.

## El Caso Medicina y el Debate Que Sí Importa

Ningún dato encendió más el debate en 2026 que los extranjeros en la Facultad de Medicina de la UBA. El dato verificado por Chequeado: **13.403 estudiantes extranjeros** sobre 34.387 argentinos en Medicina — el 27,9% del total.

Para contextualizar: en el sistema universitario nacional en su conjunto, los extranjeros representan solo el 4,2% de la matrícula total. El 95,83% proviene de países latinoamericanos: Perú, Bolivia, Paraguay, Brasil, Colombia.

Medicina UBA es la excepción estadística, no la regla. Y ahí es donde el debate se complejiza.

El gobierno habilitó el cobro de aranceles a extranjeros con residencia temporaria mediante el Decreto 366/2025. La paradoja es llamativa: las mismas universidades que invocan la autonomía universitaria cuando se trata de recibir fondos del Estado, se niegan a usar esa misma autonomía para generar recursos propios. Como si un inquilino reclamara el derecho a decidir cómo decorar el departamento — pero rechazara pagar una parte del alquiler aunque pudiera hacerlo.

## El Presupuesto: El Piso Más Bajo en 20 Años

El ajuste en el presupuesto universitario durante el gobierno de Javier Milei es significativo. Según datos de Chequeado y CONADU, el presupuesto universitario como porcentaje del PBI bajó de 0,72% en 2023 a 0,47% en 2025, el registro más bajo desde 2005. En términos reales, el gasto en universidades se contrajo un 30,4% durante los primeros ocho meses de 2025 en comparación con el mismo período de 2023.

Los salarios docentes registraron la mayor caída: una pérdida real acumulada del 34,5% entre noviembre de 2023 y mayo de 2026, según CONADU. Esto equivale a la pérdida de aproximadamente 8,6 sueldos completos en poco más de dos años. 

Un profesor titular con dedicación exclusiva percibe actualmente alrededor de $150.000 por encima de la canasta básica familiar.A nivel regional, la diferencia es notable: la Universidad de Buenos Aires (UBA) recibe unos USD 1.485 por alumno al año, mientras que la Universidad Nacional Autónoma de México (UNAM) recibe USD 8.180 y la Universidad de São Paulo (USP) USD 17.942, más de diez veces el monto de la UBA.

Sin embargo, hay un detalle que la oposición omite con descaro: cuando Sergio Massa era ministro de Economía en 2023, el gobierno recortó más de 70.000 millones de dólares del gasto público en términos reales para financiar un deficit enorme. En ese momento, ni los rectores, ni los gremios universitarios, ni los mismos dirigentes que hoy gritan “ajuste recesivo” dijeron absolutamente nada. Guardaron silencio total.

El ajuste existía, era brutal y lo aceptaban sin chistar. La diferencia no está en el ajuste mismo, sino en quién lo hace y con qué objetivo.

## La Pregunta Que Nadie Hace: ¿Gratuito Para Quién?

La universidad "gratuita" en Argentina la paga, en gran medida, gente que nunca va a ir a la universidad. El sistema tributario argentino es regresivo: el IVA del 21% lo paga tanto el repositor de supermercado como el médico. Ambos financian el sistema universitario. Pero solo uno — estadísticamente — va a mandar a sus hijos.

Aldo Abram de la Fundación Libertad y Progreso lo formuló con precisión: "La gratuidad universitaria universal no contribuye, sino que contradice la igualdad de oportunidades. Lo que se debe lograr es darle razonabilidad al sistema de financiamiento universitario, con equidad y con una mejor asignación de los escasos recursos públicos."

No se trata de cobrarle a todos. Se trata de no cobrarle al que no puede y sí cobrarle al que puede — exactamente lo contrario de lo que hace hoy el sistema.

## El Modelo Alternativo: Competencia, No Solo Ajuste

La crítica liberal al sistema universitario argentino no se agota en el ajuste presupuestario. Friedrich Hayek ya planteaba que era posible dejar la organización de la educación a esfuerzos privados, con el Estado garantizando financiamiento básico — lo que hoy conocemos como sistema de vouchers.

En Argentina, el economista Adrián Ravier propone un sistema descentralizado con vouchers que garanticen el acceso sin monopolio estatal. La advertencia es relevante: un voucher mal diseñado puede ser un caballo de Troya regulatorio. El Estado financia y luego regula. El diseño importa tanto como el principio.

## Conclusión: La Eficiencia Que No Aparece en el Ranking

Argentina tiene una de las universidades más baratas del mundo por alumno. Y una de las tasas de graduación más bajas. Esa combinación no es eficiencia — es el síntoma de un sistema que optimiza la entrada y descuida la salida, que financia la inscripción y no el egreso, que mide su éxito en matrículas y no en graduados.

El debate universitario argentino en 2026 tiene dos trampas simétricas: la derecha que solo habla de ajuste sin propuesta de modelo, y la izquierda que defiende el statu quo como si el statu quo fuera equitativo.

El restaurante que no te cobra la cuenta puede ser generoso o puede ser un mal negocio colectivo. Depende de si alguien termina de comer.

---
*Fuentes: Ministerio de Capital Humano, Fundación Libertad (2024), Secretaría Académica UBA, Chequeado, CONADU, BCRA REM.*`,
  },
  {
    slug: 'inflacion-argentina-2026-desaceleracion',
    title: 'La inflación argentina en 2026: del 25% mensual al 3% — ¿qué pasó y qué falta?',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '2 de junio de 2026',
    summary: 'Argentina recorrió en 18 meses uno de los procesos desinflacionarios más abruptos de su historia. El IPC bajó del 25% mensual de diciembre 2023 al 3.4% de abril 2026. Qué funcionó, qué riesgos persisten y cuándo podría llegarse a un dígito anual.',
    image: '🏷️',
    tags: ['Inflación', 'IPC', 'Estabilización', 'INDEC'],
    readTime: '7 min',
    content: `## Del caos al orden: 18 meses que cambiaron el mapa

El 27 de diciembre de 2023, el INDEC publicó el dato de inflación de noviembre: 12.8% mensual. Un mes después, el dato de diciembre sería peor: **25.5%**, el registro más alto desde la hiperinflación de 1990. Para mucha gente, esa cifra representó el punto de máximo miedo. Para la macroeconomía argentina, fue el pico de una crisis que ya venía acumulándose.

Hoy, en junio de 2026, el IPC mensual se ubica en torno al **3.4%**. La variación interanual cerró 2025 en torno al 117% y se proyecta para fin de 2026 en el rango del 25-35%, según las expectativas del REM del BCRA. No es poca cosa. Es el proceso desinflacionario más rápido en décadas.

¿Qué explica esta caída? ¿Es sostenible? ¿Y cuánto falta para llegar a una inflación "normal"?

## Las tres anclas que frenaron la inflación

El proceso desinflacionario descansó sobre tres pilares que se retroalimentaron:

**1. El ancla fiscal.** El programa de Milei priorizó el equilibrio presupuestario como señal de credibilidad. Al eliminar el déficit fiscal, se cortó la principal fuente de emisión monetaria que alimentaba la inflación. Argentina pasó de un déficit del 2.7% del PIB en 2023 a un superávit del 1.8% en 2024 — la corrección fiscal más rápida de su historia reciente. Sin déficit que monetizar, el BCRA dejó de imprimir pesos para financiar al Tesoro.

**2. El ancla cambiaria.** El tipo de cambio oficial se movió dentro de bandas controladas, funcionando como referencia para la formación de precios. Cuando los empresarios saben que el dólar no va a saltar abruptamente, tienen menos incentivo a remarcar preventivamente. La reducción de la brecha cambiaria —del 180% en 2023 a menos del 5% en 2026— eliminó un elemento clave de presión inflacionaria.

**3. La recesión del primer semestre 2024.** Dolorosa pero efectiva: la caída del consumo y la actividad redujo la presión de demanda sobre los precios. Con menos plata circulando y menos gente dispuesta a pagar más, los precios se moderaron. Fue la parte más costosa del ajuste.

## Lo que funcionó diferente a otros planes

Argentina tiene una larga historia de planes de estabilización fallidos: el Plan Austral (1985), la Convertibilidad (1991-2001), el Plan Bonex. ¿Por qué este proceso desinflacionario se sostuvo más tiempo?

La respuesta más honesta es que todavía es temprano para saberlo con certeza. Pero hay algunas diferencias notables. A diferencia de la Convertibilidad, no hay tipo de cambio fijo atado a una ley: hay bandas que pueden moverse. A diferencia del Plan Austral, el ancla no fue solo el congelamiento de precios, sino el equilibrio fiscal real. Y a diferencia de muchos planes anteriores, el contexto externo es favorable: precios de commodities razonables, ingreso de divisas del agro y de Vaca Muerta, y una renegociación del FMI sin mayores turbulencias.

## Los riesgos que persisten

Sería ingenuo pintar un cuadro solo de éxito. Hay al menos tres riesgos que los analistas siguen de cerca:

**La inercia inflacionaria.** Cuando la inflación lleva años alta, se vuelve parte de los contratos, los salarios y las expectativas. Bajar del 3% mensual al 1% es mucho más difícil que bajar del 25% al 3%. La inflación "residual" se resiste porque está incorporada en los mecanismos de indexación de la economía.

**Las tarifas pendientes.** El proceso de normalización de tarifas de servicios públicos (luz, gas, transporte) no está terminado. Cada ronda de aumentos tarifarios agrega entre 0.3 y 0.8 puntos porcentuales al IPC del mes en que se aplica. Queda camino por recorrer.

**El ciclo electoral.** Las elecciones legislativas de octubre 2025 pasaron sin grandes sobresaltos, pero el calendario electoral 2027 (presidencial) comienza a influir en las decisiones de política. La tentación de aflojar el ajuste antes de una elección es histórica en Argentina.

## ¿Cuándo llegamos a inflación de un dígito anual?

Las proyecciones del REM ubican la inflación de 2026 entre 25% y 35% anual. Para llegar a un dígito anual —menos del 10%— el consenso de los analistas ve al menos 2-3 años más de proceso desinflacionario sostenido, es decir, llegar al rango de 1-2% mensual de forma consistente.

El camino importa tanto como el destino. Argentina ya demostró que puede bajar la inflación abruptamente. El desafío inédito es mantenerse abajo.

---

*Los datos de inflación son los publicados por el INDEC. Las proyecciones corresponden al Relevamiento de Expectativas de Mercado (REM) del BCRA de mayo 2026. Los datos actualizados están disponibles en [MacroLibre — Indicadores de Inflación](/indicadores/inflacion-argentina).*`,
  },

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
    slug: 'Breakeven inflacionario argentino señala que la desinflación se estancó',
    title: 'Breakeven inflacionario argentino señala que la desinflación se estancó',
    author: 'Santiago Murcia',
    authorRole: 'Est. Lic en Economia',
    date: '23 de abril de 2026',
    summary: 'El breakeven inflacionario argentino',
    image: '📈',
    tags: ['Argentina', 'BreakEven', 'Inflacion'],
    readTime: '15 min',
    content: `## La compresión de variables.

# Breakeven inflacionario argentino señala que la desinflación se estancó

**El mercado de bonos argentino descuenta una inflación de 25–29% anual para los próximos 12 meses, muy por encima de las proyecciones oficiales pero alineada con el REM del BCRA de 29,1%.** La reaceleración inflacionaria de marzo 2026 (3,4% mensual, la más alta en 10 meses) recalibró todas las expectativas y empinó las curvas de pesos. Tras el acuerdo con el FMI de abril 2025 y la introducción de bandas cambiarias, Argentina transita un régimen monetario-cambiario novedoso cuya credibilidad se está midiendo en tiempo real por el diferencial entre letras LECAP y bonos CER. En paralelo, en Estados Unidos los breakevens de los TIPS también subieron por el shock energético derivado de la guerra con Irán, ubicándose en 2,38% a 10 años y 2,61% a 5 años — niveles modestos comparados con Argentina pero incómodos para la Fed.

## Qué es el break-even inflation y cómo se lee

El **break-even inflation rate (BEIR)** es la tasa de inflación promedio anualizada a la cual un bono nominal y un bono indexado a inflación del mismo emisor y vencimiento rinden lo mismo. Es el "empate técnico" entre un inversor que apuesta a tasa fija y otro que se cubre de la inflación. Si la inflación efectiva supera el BEIR, gana el bono indexado (CER en Argentina, TIPS en EE.UU.); si es menor, gana el bono a tasa fija.

La fórmula exacta deriva de la ecuación de Fisher: **BEIR = [(1 + yield nominal) / (1 + yield real)] − 1**. En la práctica se usa la aproximación lineal **BEIR ≈ yield nominal − yield real**, válida cuando las tasas son bajas. Con un Treasury 10Y al 4,32% y un TIPS 10Y al 1,90%, la aproximación da 2,42% y la fórmula exacta 2,37% — casi idéntico al valor publicado por FRED (T10YIE = 2,38%).

**El BEIR es un termómetro de mercado, no un pronóstico puro de inflación.** Incorpora al menos tres componentes no observables que lo distorsionan: la **prima de riesgo de inflación** (los tenedores de bonos nominales exigen compensación extra por soportar el riesgo de inflación mayor a la esperada, lo que tiende a sobreestimar E[π]); la **prima de liquidez** (los bonos indexados son menos líquidos y su yield real incorpora un premio que empuja el BEIR a la baja, en dirección contraria); y **efectos técnicos** de oferta, demanda, estacionalidad y flujos de fondos de pensiones. La descomposición teórica es: **BEIR = E[π] + IRP + (LRP_nominal − LRP_indexado)**. En EE.UU. los estudios del D'Amico-Kim-Wei de la Fed estiman el IRP entre 0 y 50 pb en régimen normal.

En Argentina, el ruido es mayor: el cepo cambiario segmenta mercados, las intervenciones del BCRA y el Tesoro mueven precios artificialmente, la liquidez está concentrada en pocas emisiones, y algunos bonos tienen cláusulas embebidas (duales con piso). Por eso el breakeven local debe leerse como **indicador direccional**, no como cuantificación precisa de expectativas. Comparado con las encuestas (REM, Michigan, SPF), el breakeven tiene la ventaja de ser diario, con dinero real en juego, pero la desventaja de incluir esas primas — por eso la mejor práctica es **triangular ambos tipos de medidas**.

## Cálculo del breakeven argentino en abril 2026

La curva de pesos argentina ofrece pares de instrumentos con mismo vencimiento para aplicar la fórmula. El cuadro siguiente muestra los rendimientos al 21–22 de abril de 2026:

| Instrumento | Tipo | Vencimiento | TIR (TEA) | TEM aprox |
|---|---|---|---|---|
| S30A6 (LECAP) | Tasa fija | 30-abr-2026 | ~19,6% | 1,50% |
| S31L6 (LECAP) | Tasa fija | 31-jul-2026 | ~23,0% | 1,74% |
| **T30A7 (BONCAP)** | **Tasa fija** | **30-abr-2027** | **~35,3%** | **2,55%** |
| T31Y7 (BONCAP) | Tasa fija | 31-may-2027 | ~33,8% | 2,45% |
| TZX26 (BONCER) | CER | 30-jun-2026 | CER −10,97% | — |
| TZXO6 (BONCER) | CER | oct-2026 | CER −3,5% | — |
| TZX27 (BONCER) | CER | 30-jun-2027 | CER +1,5% | — |
| TZXD7 (BONCER) | CER | 15-dic-2027 | CER +5 a 6% | — |
| TZX28 (BONCER) | CER | 30-jun-2028 | CER +7 a 8% | — |

El **T30A7 (BONCAP abril 2027)** es el instrumento nominal de referencia que pidió el usuario: cotiza a $108,85, con paridad del 108,85%, y rinde TIR del 35,28% efectivo anual — el "top pick" de Portfolio Personal Inversiones para el tramo largo de tasa fija.

Aplicando la fórmula exacta al par T30J6/TZX26 (ambos vencimiento junio 2026), con TEA nominal ≈ 24% y TIR real ≈ −11%: **breakeven = (1,24/0,89) − 1 = 39,3% anual ≈ 2,8% mensual**. Esto implica que el mercado está descontando que abril 2026 cerrará con IPC cercano a 2,8% m/m, coherente con el dato de marzo de 3,4% y la proyección REM de 2,6%. Para el par T30J7/TZX27 (junio 2027), con TIR nominal 33% y real +1,5%, el **breakeven es 31% anual (~2,3% mensual promedio)**. Para el tramo largo (T15E7 vs TZXD7), el breakeven cae a **24% anual o ~1,8% mensual**.

El **sendero completo** resultante es: 2,6–2,8% mensual para abril, ~2,3% para los siguientes 3 meses, ~1,9% promedio para los próximos 12 meses, y ~1,5% hacia 2028. Esta inflación implícita saltó 5 puntos tras la modificación de bandas cambiarias de diciembre 2025, pasando de ~22% a 27–28% anual. **Las curvas dejaron de estar invertidas** (como en mediados de 2025, cuando anticipaban desinflación rápida) y hoy muestran **pendiente positiva empinada**, reflejando que el mercado ya no espera bajas agresivas de tasas ni normalización inmediata.

## La inflación argentina se resiste a perforar el 3% mensual

El INDEC publicó el 14 de abril de 2026 el IPC de marzo: **3,4% mensual, núcleo 3,2%, interanual 32,6%**, el décimo mes consecutivo de aceleración desde el piso de 1,5% de mayo 2025. El acumulado del primer trimestre 2026 fue **9,4%**, casi un tercio de la meta anual oficial (10,1% en el Presupuesto 2026) superada en tres meses. El rubro que más aportó fue Educación (+12,1% por inicio de clases), seguido de Transporte (+4,1%, empujado por combustibles tras el shock petrolero por la guerra Israel/EEUU-Irán) y Vivienda y servicios (+3,7%). La carne vacuna acumula +55% interanual, muy por encima del promedio.

La serie mensual de 2025 muestra un proceso de desinflación con piso en mayo y reaceleración posterior: enero 2,2%, febrero 2,4%, marzo 3,7%, abril 2,8%, mayo 1,5% (piso), junio 1,6%, julio 1,9%, agosto 1,9%, septiembre 2,1%, octubre 2,3%, noviembre 2,5%, diciembre 2,8%. El **acumulado 2025 fue 31,5%**, el menor en ocho años y una fracción del 117,8% de 2024. Enero 2026 marcó 2,9%, febrero 2,9% y marzo 3,4%.

El **REM de marzo 2026** (publicado por el BCRA el 8 de abril, con 46 participantes) proyecta inflación anual de **29,1% para 2026** (+3,1 puntos vs REM febrero) y **23,8% para 2027**. El Top-10 más certero proyecta 27,8%. El FMI, en su WEO de abril 2026, elevó su proyección para Argentina de 16,4% (octubre 2025) a **30,4%**. Las consultoras privadas muestran rango amplio: Allianz 18%, S&P Global 19,5%, Equilibra y Ecolatina cerca de 28%, Standard Chartered 38%. La mediana del panel FocusEconomics es 23,9%.

Para los meses próximos, el REM proyecta: abril 2,6%, mayo 2,3%, junio 2,0%, y piso del ciclo en agosto-septiembre con 1,8% mensual. **La inflación de un dígito anual no se ve antes de 2029** según el consenso. El rezago tarifario post-electoral, el shock energético externo, y un componente núcleo sin carnes que subió de 1,7% (julio 2025) a 2,5% (marzo 2026) según Invecq, sugieren un piso estructural de al menos 2% mensual en el corto plazo.

## Bandas cambiarias y reservas bajo vigilancia del FMI

Al 22 de abril de 2026, las cotizaciones del dólar son: **mayorista $1.377-1.381, MEP $1.419, CCL $1.473, blue $1.415**. Las brechas son históricamente bajas: 2,7% el blue, 3,1% el MEP y 6,9% el CCL respecto al mayorista. El mayorista acumula una **caída de 5,4% en 2026** — el peso argentino está entre las 12 monedas que más se apreciaron en el mundo según Bloomberg. El ITCRM (tipo de cambio real multilateral) cayó de 94,3 (cierre 2025) a 84,07 en abril 2026, encendiendo alarmas de atraso cambiario.

El **régimen de bandas de flotación** se implementó el 11 de abril de 2025 junto con el nuevo acuerdo FMI, reemplazando el crawling peg del 1% mensual. Las bandas iniciales fueron piso $1.000 y techo $1.400, ajustadas diariamente a ritmo de 1% mensual hasta fin de 2025. Desde **enero 2026 (Fase 4)**, las bandas se actualizan mensualmente según el IPC del INDEC con rezago T-2. Los ajustes aplicados fueron: enero 2,5%, febrero 2,42%, marzo 2,9%, abril 2,9%. El **techo actual está en ~$1.690, a 22% del mayorista** — la banda superior es casi irrelevante en lo operativo. El BCRA compra dólares dentro de la banda con tope del 5% del volumen diario del MULC (~USD 400 millones/día). En octubre 2025, previo a las elecciones, el techo fue testeado cuatro veces y el BCRA vendió reservas.

El **cepo cambiario fue parcialmente levantado en abril 2025 para personas humanas**, pero persiste para empresas: prohibición total de atesoramiento, parking MEP/CCL de un día, giro de dividendos solo para ejercicios cerrados desde 2025, obligación de liquidar exportaciones. Las personas humanas tienen restricción cruzada (declaración jurada de 90 días sin operar MEP/CCL) reinstaurada pre-elecciones y mantenida. Bausili declaró en marzo 2026 que **no se prevé levantar el cepo a corto plazo**.

El **nuevo EFF con el FMI por USD 20.000 millones** fue aprobado el 11 de abril de 2025. Se desembolsaron USD 12.000 M iniciales, USD 2.000 M en junio 2025, USD 2.000 M en la primera revisión (julio 2025, con waiver por incumplir meta de reservas), y aproximadamente **USD 1.000 M en la segunda revisión (staff-level agreement del 15 de abril de 2026)**, totalizando ~USD 15.000 M de los USD 20.000 M pactados. La segunda revisión flexibilizó nuevamente la meta: **superávit primario de 1,4% del PBI para 2026** y recomposición mínima de **USD 8.000 millones de reservas netas** en el año. El BCRA debe comprar al menos USD 10.000 M en el MLC durante 2026.

Las **reservas brutas al 22 de abril suman USD 45.779 millones**, tras crecer USD 2.079 M en tres semanas y con el BCRA comprando 72 jornadas consecutivas (USD 6.386 M acumulados en 2026). Las **reservas netas están apenas positivas en ~USD 800 millones** bajo la metodología del FMI más estricta (Eco Go calcula −USD 9.856 M excluyendo repos y FMI). La distancia con la meta FMI de fin de 2025 (−USD 2.600 M) dejó una brecha de USD 6.532 M que obligó al waiver. Caputo viajó a Washington en abril negociando financiamiento adicional: garantía del Banco Mundial por USD 2.000 M, BID/CAF por USD 1.000 M, repo con bancos internacionales por USD 3.000 M.

## Breakevens en EE.UU. suben por shock energético

El **breakeven inflation de los TIPS** estadounidenses en abril 2026 es **2,38% a 10 años (T10YIE) y 2,61% a 5 años (T5YIE)** — el nivel más alto en varios meses, por encima del objetivo de 2% de la Fed. El forward 5Y5Y se mantiene más anclado en 2,15-2,20%. La brecha entre T5YIE y T10YIE implica que el mercado ve el shock inflacionario como **front-loaded** (concentrado en el corto plazo y parcialmente reversible).

El **CPI de marzo 2026** publicado por el BLS fue **3,3% interanual headline** (vs 2,4% en febrero) — el mayor desde mayo 2024 — y **2,6% core**. El salto mensual fue 0,9%, el mayor desde junio 2022, impulsado por energía +10,9% m/m y gasolina +21,2% tras el inicio de la guerra Israel/EEUU-Irán el 28 de febrero. El PCE de febrero (publicado el 9 de abril con retraso por el shutdown de octubre-noviembre 2025) fue 2,8% headline y **3,0% core** interanual. La Fed estima en un FEDS Note de abril que los aranceles implementados hasta noviembre 2025 aportaron 0,8 puntos al core PCE.

El **SEP de marzo 2026** de la Fed revisó al alza la PCE 2026 de 2,4% a **2,7%** y el core PCE de 2,5% a **2,7%** — la mayor revisión en años. El dot plot mantiene ~100 pb de cortes en 2026 y la tasa terminal en 3,1%. La Fed mantuvo el rango en **3,50-3,75%** el 18 de marzo. Los rendimientos del UST 10Y están en 4,32% nominal y 1,90% real (TIPS), con condiciones financieras aún restrictivas.

Las encuestas muestran divergencia: **University of Michigan subió a 4,8% a 1 año y 3,4% a 5 años**, máximo desde agosto 2025, mientras el SPF del Philly Fed se mantiene más anclado en 2,5-2,7%. La inflación también repuntó en la zona euro (HICP 2,6%), Reino Unido (3,3%) y Japón (1,3%), con el ECB revisando su proyección 2026 al alza a 2,6% y Lagarde advirtiendo que podría subir tasas "aun si el shock es de corto plazo".

## Qué revela el contraste entre Argentina y el mundo

La comparación cuantitativa es ilustrativa: **el breakeven argentino a 12 meses (25-29%) es aproximadamente 10 veces el breakeven estadounidense a 10 años (2,38%)**. Sin embargo, ambos sufrieron presiones al alza en los últimos meses por shocks reales (combustibles y aranceles en EE.UU., tarifas y carne en Argentina). En ambos casos, los bancos centrales enfrentan el dilema de "mirar a través" del shock versus reaccionar para evitar desanclaje de expectativas.

Para Argentina, el dato relevante es que **el mercado de bonos está alineado con el REM del BCRA** (29,1% vs breakeven implícito de ~27-29%), pero ambos están muy por encima del **10,1% del Presupuesto 2026 oficial**. Esto sugiere que el gobierno de Milei enfrentará una discusión creciente sobre la credibilidad de su meta fiscal-inflacionaria, en un contexto donde el tipo de cambio real se aprecia y las reservas netas apenas son positivas. El acuerdo con el FMI ya acumuló dos waivers o flexibilizaciones, y la tercera revisión — prevista originalmente para enero-febrero 2026 — aún no tiene fecha firme al 22 de abril.

El **trade de mercado recomendado por la mayoría de los brokers (Cohen, Mariva, IOL)** es **sobreponderar CER corto (TZX26, TZXO6) aprovechando que su tasa real negativa compensa con inflación más alta que la breakeven implícita**. PPI y Adcap sugieren rotación hacia tasa fija (T30A7) para quien cree que abril cerrará mejor que lo descontado. La decisión depende de la hipótesis sobre si el shock inflacionario de marzo es transitorio (convendría tasa fija) o el piso de una nueva meseta (convendría CER). El hecho de que las curvas se hayan re-empinado tras meses invertidas es la señal más clara de que el mercado ya no confía en una desinflación lineal y rápida.

## Conclusiones clave para el análisis económico

La síntesis del diagnóstico argentino en abril 2026 revela una tensión entre tres fuerzas. Primero, el **ancla nominal del régimen de bandas está perdiendo tracción** porque el mayorista opera 22% por debajo del techo y las bandas se ajustan con rezago por el IPC — lo que retroalimenta la apreciación real. Segundo, el **proceso de desinflación se estancó**: marzo 3,4% fue el décimo mes consecutivo de aceleración, empujado por shocks de oferta (energía, tarifas) pero con núcleo sin carnes también subiendo, sugiriendo componente estructural. Tercero, las **reservas netas siguen siendo el cuello de botella**: apenas USD 800 M positivas bajo metodología FMI, con waivers sucesivos, y dependencia crítica de nuevos préstamos (Banco Mundial, BID, repos) para cumplir las metas de 2026.

El breakeven inflacionario implícito en el par T30A7/TZX27, cercano al 31% anual, es **la métrica de mercado más honesta disponible** sobre las expectativas, por encima de encuestas y proyecciones oficiales. Leído junto con el REM (29,1%) y las proyecciones privadas (23-30%), delimita un rango de consenso de **25-30% para 2026**, muy lejos del 10,1% del Presupuesto y con trayectoria convergente al 16-24% en 2027. La apuesta del mercado sobre el éxito del plan Milei-Caputo es, por ahora, **moderadamente optimista pero sin euforia**: reconoce que la desinflación continúa pero duda de su velocidad y del costo cambiario necesario para sostenerla.
`,
  },
  {
    slug: 'homeostasis-argentina-dolares-escondidos',
    title: 'Homeostasis Argentina: por qué tenemos USD 250.000 millones escondidos',
    author: 'Santiago Murcia',
    authorRole: 'Economista — MacroLibre',
    date: '9 de mayo de 2026',
    summary: 'La desconfianza argentina hacia el sistema bancario no es un capricho: es una respuesta aprendida tras décadas de inflación, cepos, confiscaciones y defaults.',
    image: '📊',
    tags: ['Economía Conductual', 'Dólar', 'Sistema Bancario', 'Milei', 'Política Económica', 'Ahorro'],
    readTime: '9 min',
    content: `# La homeostasis y la mentalidad argentina: por qué tenemos USD 250.000 millones escondidos

Hay un concepto del libro *Mastery*, de George Leonard, que explica la economía argentina mejor que muchos manuales de macroeconomía: la homeostasis.

La homeostasis es la tendencia natural de todo sistema vivo a resistir el cambio para mantener su equilibrio interno. Cuando intentás mejorar algo de forma significativa —tu cuerpo, tu mente, una cultura o una economía— el sistema genera resistencia para volver al estado conocido. Aunque ese estado sea disfuncional. Aunque ese estado te esté haciendo daño.

En Argentina, esa homeostasis tiene nombre, apellido y número: cientos de miles de millones de dólares guardados fuera del sistema bancario. No es solo una estadística financiera. Es una radiografía de la psicología económica de un país.

## El número que explica todo

No es una metáfora. Es una cifra concreta que define la relación de los argentinos con el dinero, el Estado y los bancos.

A principios de 2025, los argentinos conservaban cerca de USD 245.687 millones en billetes fuera del sistema financiero: efectivo en casas, cajas de seguridad y cuentas no declaradas en el exterior. Al cierre de 2025, el número estimado rondaba los USD 254.898 millones.

Para dimensionarlo: esa cifra equivale a varias veces las reservas brutas del Banco Central y supera ampliamente el total de depósitos privados en dólares dentro de los bancos. Es decir, hay más dólares inmovilizados por desconfianza que dólares trabajando dentro del sistema productivo.

El propio presidente Javier Milei habló de un rango todavía más amplio: entre USD 200.000 millones y USD 400.000 millones fuera del sistema. Cualquiera sea la cifra exacta, el mensaje es el mismo: Argentina no tiene solo un problema de escasez de capital. Tiene un problema de confianza.

Eso es la homeostasis hecha número.

## La desconfianza no es un capricho: es una cicatriz

Imaginá que de chico te quemaste la mano tocando una estufa. De adulto, aunque la estufa esté apagada, tu mano se retira sola. No es irracionalidad. Es memoria muscular de dolor real.

Algo parecido pasa con los argentinos y los bancos.

La desconfianza acumulada no nació de la nada. Es una respuesta aprendida después de décadas de traiciones institucionales: el Corralito de 2001, la pesificación asimétrica, inflaciones descontroladas, defaults repetidos, cepos cambiarios y reglas que cambiaron demasiadas veces en mitad del partido.

El sistema colectivo aprendió una lección brutal y la internalizó: "el banco no es seguro; el dólar bajo el colchón es la única reserva de valor verdadera".

Esa es nuestra homeostasis económica. Dolorosa, ineficiente y empobrecedora, pero conocida. Y lo conocido, aunque duela, muchas veces parece más seguro que lo desconocido.

## La homeostasis también resiste los incentivos formales

Si todavía quedaban dudas sobre la fuerza de este fenómeno, el gobierno de Milei acaba de mostrarlo empíricamente.

A fines de 2024 se impulsó la llamada Ley de Inocencia Fiscal: una invitación a ingresar dólares no declarados al sistema con garantías legales, menor carga burocrática y promesas explícitas de seguridad jurídica. También se facilitaron mecanismos para abrir cuentas y operar en dólares.

El resultado fue limitado frente al stock total de dólares fuera del sistema. Hubo exteriorización de capitales, sí, pero no un cambio masivo de comportamiento. Los argentinos probaron el nuevo marco, miraron de reojo y, en gran parte, conservaron el viejo hábito.

En términos de homeostasis: el sistema ofreció resistencia, volvió al equilibrio conocido y ganó la primera ronda.

Esto no es solamente un fracaso o un éxito parcial de una política económica. Es la homeostasis cultural haciendo exactamente lo que Leonard describía: cuando un comportamiento nuevo compite contra un hábito arraigado, el hábito suele ganar en el corto plazo.

## Las tres formas de lidiar con la homeostasis

### 1. Reconocerla sin juzgarla

El primer paso es dejar de insultar a la gente por "no confiar". Esa desconfianza no es un defecto cultural: es una respuesta adaptativa a décadas de mala información institucional. El Estado argentino sí confiscó, sí pesificó, sí defaulteó y sí cambió reglas de forma arbitraria.

Cualquier estrategia de reconstrucción que empiece con "los argentinos son tontos por guardar dólares en el colchón" está condenada. La homeostasis no se rompe insultando al sistema que la generó.

### 2. Negociar con el cambio, no decretarlo

"Confíen" no alcanza. La confianza se construye con tiempo, consistencia y hechos repetidos. No con discursos, leyes aisladas ni garantías verbales.

Para que el sistema perciba que el nuevo equilibrio es más seguro que el anterior, hacen falta señales sostenidas:

- Superávit fiscal que no ceda ante presiones electorales.
- Inflación bajando mes a mes, trimestre a trimestre, año a año.
- Reglas que no cambien cuando cambia el gobierno.
- Nunca más un cepo, nunca más una pesificación.

La homeostasis se negocia con tiempo y consistencia, no con una ley. Incluso después de un blanqueo relevante, el saldo neto de dólares fuera del sistema apenas se mueve si la confianza profunda todavía no cambió. El proceso va a ser largo.

### 3. Construir un entorno que refuerce el cambio

Para romper una homeostasis no alcanza con fuerza de voluntad individual. Necesitás un ecosistema que empuje en la misma dirección.

En términos económicos, eso implica reducir burocracia, ampliar la oferta de productos financieros en dólares, fortalecer la seguridad jurídica, proteger la propiedad privada y permitir que el ahorro formal tenga una recompensa visible.

Pero hay algo más profundo que las reformas técnicas: necesitamos una cultura que premie el ahorro formal. Que quien deposita sus dólares en el banco sea visto como alguien racional, no como un ingenuo que "no aprendió la lección del 2001".

Cuando Caputo dice que los argentinos pierden plata teniendo dólares inmóviles en sus casas, pero que también pierde el país, apunta a una idea correcta: conectar el interés individual con el interés colectivo. No desde la amenaza ni desde el control, sino desde la conveniencia.

## Conclusión: la apuesta más importante no es fiscal

La batalla del superávit está avanzada. La batalla contra la inflación muestra progresos, aunque todavía no está terminada. Pero la batalla más larga, la que va a definir si Argentina puede crecer de verdad, es esta: que los argentinos vuelvan a confiar en el sistema bancario.

Si una parte relevante de esos dólares ingresara al sistema financiero, Argentina tendría más crédito, más inversión, más profundidad de mercado y más capacidad para financiar crecimiento sin depender siempre del endeudamiento externo.

La homeostasis siempre resiste. No se vence en el primer intento ni en el segundo. Pero si las reglas se mantienen, si el superávit no cede, si la inflación sigue bajando y si la propiedad privada sigue siendo respetada, llegará el día en que el nuevo equilibrio sea más cómodo que el viejo.

El día que un argentino deposite sus dólares en el banco sin calcular cuánto tiempo tiene antes del próximo corralito no será solo un dato del BCRA.

Será la prueba de que cambiamos una de las homeostasis más profundas de nuestra historia.`,
  },
];
