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
    slug: 'consumo-argentina-abril-2026',
    title: '¿Es verdad que el consumo cae como dicen? La economía a dos velocidades',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '23 de mayo de 2026',
    summary:
      'CAME marca 12 meses consecutivos de caída en ventas minoristas pyme (-3.5% acumulado) y los supermercados retroceden entre 5% y 13% real. Pero el consumo privado de cuentas nacionales tocó un máximo histórico (+4.1% YoY), el e-commerce crece más de 20% real y las billeteras virtuales explotaron +47.5%. ¿Quién tiene razón? Ninguno completamente: el consumo no cae, se mudó de canal.',
    image: '🛒',
    tags: ['Consumo', 'E-commerce', 'Salarios', 'EMAE', 'Política Económica'],
    readTime: '8 min',
    content: `## Resumen ejecutivo

Los datos permiten sostener que mientras CAME registra 12 meses consecutivos de caída en ventas minoristas pyme (-3.5% acumulado al cuatrimestre) y supermercados y shoppings medidos por INDEC muestran bajas reales de entre 5.1% y 13.3% interanual, el consumo privado de cuentas nacionales alcanzó un máximo histórico en el cuarto trimestre de 2025 (+4.1% interanual) y el e-commerce crece a más de 20% real interanual.

La estadística minorista tradicional está capturando sobre todo un canal, no el consumo total: el e-commerce ya representa 25% de las ventas de muchas empresas (Mid-Term CACE-Kantar), el canal online en supermercados crece 26.2% interanual contra 20.3% del salón físico, la vacancia comercial en CABA subió 30% interanual según la CAC y las billeteras virtuales y pagos con QR avanzaron 47.5% interanual en supermercados.

La división relevante no es simplemente si hay o no hay consumo, sino **quién consume y a través de qué canales**: con salarios públicos 17% por debajo de noviembre de 2023, empleo público nacional -6% interanual y empresas estatales con 18.278 puestos menos, el ajuste se concentra en un segmento, mientras los bienes durables, el turismo emisivo y el comercio digital muestran expansión o niveles récord.

## Hallazgos principales

**1. La foto del comercio minorista tradicional es negativa, pero no agota el cuadro.** Según CAME, las ventas minoristas pyme cayeron 3.2% interanual real en abril de 2026 — el duodécimo mes consecutivo en baja — y acumulan un retroceso de 3.5% en el primer cuatrimestre. INDEC registra para marzo de 2026 caídas de 5.1% en supermercados, 7.2% en autoservicios mayoristas y 13.3% en shoppings (en este último caso la peor performance desde abril 2024).

**2. Al mismo tiempo, el propio INDEC muestra que el consumo privado agregado está en máximos.** Las cuentas nacionales del 4T 2025 reportan +4.1% interanual y +1.7% desestacionalizado respecto del trimestre previo, alcanzando el máximo de toda la serie histórica iniciada en 2004. En el acumulado de 2025, el consumo privado creció 7.9%, impulsado por bienes durables, turismo emisivo y comercio online.

**3. El e-commerce explica buena parte.** CACE facturó $35.3 billones en 2025 (+60% nominal contra inflación de 31.5%). En el primer cuatrimestre de 2026 Tiendanube reporta crecimiento del 20% interanual real. Mercado Libre tuvo en el 1T 2026 su mejor trimestre en cuatro años, con GMV en Argentina +41% real e ítems vendidos +35%.

**4. Las estadísticas oficiales son honestas sobre lo que miden.** El INDEC informa que las ventas online en supermercados crecieron 26.2% nominal interanual en marzo, contra 20.3% del salón físico; pero ese canal online en grandes cadenas solo representa el 3.1% de la facturación total. El relevamiento de CAME se hace sobre 1.153 comercios físicos pyme, no captura el e-commerce puro.

**5. La transformación de medios de pago confirma la migración digital.** En supermercados, la tarjeta de crédito ya explica el 44.9% de la facturación ($1.107 billones en marzo), el débito 24.8%, el efectivo solo 16.6% y "otros medios" (billeteras virtuales, QR, transferencias) 13.7% — pero esos otros medios crecieron 47.5% i.a., el segmento de mayor expansión. En mayoristas, billeteras y QR ya son el principal medio de pago.

**6. Digitalización masiva.** Las extracciones en cajeros cayeron al piso histórico de 41.3 millones mensuales en febrero (-65.5% en cinco años). Según el BCRA, 29.5 millones de personas hicieron pagos digitales en el último trimestre de 2025. Las billeteras virtuales concentran ya $8 billones (6.3% de los depósitos del sistema, +60% i.a. nominal).

**7. El reverso del e-commerce es la vacancia comercial.** Según el economista jefe de la Cámara Argentina de Comercio y Servicios, Matías Bolis Wilson: "Hay cada vez más locales vacíos en CABA. Aumentó 30% interanual la vacancia y eso tiene que ver con la lógica de cambio de forma de vender de los comerciantes, que se están volcando más al ecommerce".

**8. El sector público es el ajuste; el privado y los durables, la otra cara.** El empleo en la Administración Pública Nacional cayó 6% i.a. en marzo de 2026, con 65.528 puestos menos desde diciembre 2023 (13% de la planta). Los salarios públicos están 17% por debajo del nivel pre-Milei. En contraste, el EMAE de marzo creció 5.5% i.a. con Pesca (+30.9%), Agro (+17.9%), Minas y Canteras (+16.3%, traccionado por Vaca Muerta) e Intermediación Financiera (+8.8%) liderando.

## El e-commerce que no aparece en las mediciones tradicionales

Mientras los canales tradicionales muestran retrocesos, el comercio digital exhibe una dinámica claramente expansiva:

- **CACE Estudio Anual 2025**: facturación de $35.3 billones (+60% nominal, +27 puntos por encima de la inflación), 645 millones de unidades vendidas (+28%), ticket promedio $143.128, 1.34 millones de nuevos compradores online sumados al universo de 25 millones.
- **Mid-Term CACE-Kantar (1S 2025)**: e-commerce con peso del 25% en ventas totales (vs. 15% en 2023).
- **Mercado Libre 1T 2026**: USD 8.845 millones (+49% interanual). Argentina: GMV +41% en moneda constante, TPV de Mercado Pago +55%. Plan 2026: USD 3.400 millones de inversión y 1.900 nuevos puestos.
- **Hot Sale 2026**: facturación de $673.000 millones, +19% nominal interanual, 93.4% de compras desde dispositivos móviles.
- **Tiendanube 1C 2026**: crecimiento interanual del 20% real (la mitad del 40% del 1C 2025, pero muy por encima del minorista físico).
- **Scentia consumo masivo - canal e-commerce**: +34.3% i.a. en marzo 2026. Participación del online en consumo masivo pasó de 6.3% en 2024 a 8.2% en marzo 2026.

## Medios de pago: la huella estadística del cambio

**Supermercados (marzo 2026):**
- Tarjeta de crédito: 44.9% ($1.107 billones)
- Tarjeta de débito: 24.8%
- Efectivo: 16.6%
- Otros (billeteras, QR, transferencias): 13.7% (+47.5% i.a., el segmento de mayor crecimiento)

**Autoservicios mayoristas:**
- Otros medios (billeteras, QR): 31.9% (+32.7% i.a.) — ya es el principal medio
- Tarjeta de crédito: 26.8%
- Efectivo: 25.6%

Argentina lidera la región en adopción de pagos móviles, con 84% de usuarios que pagan con QR, un tercio del valor transaccionado en puntos físicos canalizado por billeteras digitales, y 39% de los pagos online concentrados en ese mismo instrumento (Global Payments Report 2026).

## EMAE: una economía que avanza a dos velocidades

El EMAE de marzo de 2026 creció 5.5% interanual y 3.5% mensual desestacionalizado, alcanzando un máximo histórico. Pero el dato agregado convive con fuerte heterogeneidad sectorial:

**Sectores que más traccionan (i.a. marzo):**
- Pesca: +30.9%
- Agricultura, ganadería: +17.9%
- Explotación de minas y canteras: +16.3%
- Intermediación financiera: +8.8%
- Construcción: +7.6%
- Industria manufacturera: +4.6%

**Único sector en caída:** Administración pública y defensa: -1.2%

La producción petrolera apunta a un récord histórico en 2026: 54.5 millones de m³ de crudo, +16% i.a., con cerca de 70% del total proveniente de Vaca Muerta — dejando atrás la marca de 1998.

## Salarios, empleo y la divergencia entre consumo público y privado

El ajuste se concentra sobre todo en el Estado y en los trabajadores vinculados al sector público:

- **Empleo público nacional**: -65.528 puestos desde diciembre 2023 (cierre febrero 2026), 13% de la planta. Empresas estatales: -18.278 empleados.
- **Salarios reales sector público**: 17% por debajo de noviembre 2023. Un empleado nacional perdió el equivalente a 7.7 salarios mensuales en 27 meses (IARAF).
- **Salarios reales sector privado registrado**: -1.3% real en marzo 2026 (séptimo mes consecutivo de caída), 4.8% por debajo de noviembre 2023.
- **Mercado laboral**: desempleo de 7.5% en 4T 2025; pérdida de 194.200 puestos asalariados privados en dos años; trasvase a monotributo (+112.200).

La caída de 5.1% interanual en consumo masivo medida por Scentia en marzo dialoga con otros dos datos. Por un lado, la mora en créditos a hogares trepó a 11.5%, el nivel más alto en 21 años. Por otro, crece la dependencia de promociones: 70% de los productos vendidos en grandes supermercados se comercializa con descuento o en cuotas.

## Cuadro de indicadores

| Indicador | Variación real i.a. | Período | Fuente |
|---|---|---|---|
| Ventas minoristas pyme | -3.2% | Abril 2026 | CAME |
| Ventas minoristas pyme acumulado | -3.5% | Ene-Abr 2026 | CAME |
| Supermercados | -5.1% | Marzo 2026 | INDEC |
| Autoservicios mayoristas | -7.2% | Marzo 2026 | INDEC |
| Shoppings | -13.3% | Marzo 2026 | INDEC |
| Electrodomésticos | -12.4% | 1T 2026 | INDEC |
| Consumo masivo | -5.1% | Marzo 2026 | Scentia |
| Consumo aparente carne vacuna | -10% | Marzo 2026 | CICCRA |
| Consumo privado cuentas nacionales | +4.1% | 4T 2025 | INDEC |
| Mercado Libre GMV Argentina | +41% | 1T 2026 | MELI |
| E-commerce Scentia (canal online) | +34.3% | Marzo 2026 | Scentia |
| EMAE | +5.5% | Marzo 2026 | INDEC |

## Conclusión

El consumo argentino no está cayendo de manera homogénea: está mutando. Una parte se digitalizó (e-commerce +20-40% real), otra migró hacia bienes durables, turismo y servicios, mientras el comercio físico tradicional retrocede entre 3% y 13%.

Las mediciones de CAME e INDEC supermercados/shoppings son correctas, pero capturan un canal — no el agregado. Cualquier lectura responsable del cuadro tiene que distinguir entre quién sufre el ajuste (empleados públicos, sector público en general, comercios físicos pyme) y quién muestra expansión (sectores transables, comercio digital, empresas exportadoras).

La frase que mejor resume el momento la dijo De Pablo: el consumo no desapareció, cambió de canal y cambió de protagonistas.`,
  },
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
  {
    slug: 'neutralidad-del-dinero-milei-udesa',
    title: 'Neutralidad del dinero: qué dijo Javier Milei en UdeSA y qué implica para Argentina',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '19 de mayo de 2026',
    summary: 'Una conferencia en la Universidad de San Andrés repasó 250 años de teoría monetaria: de Phillips a Lucas, de Friedman a Sidrauski. Qué implica todo eso para el proceso de desinflación argentino.',
    image: '🏛️',
    tags: ['Política Monetaria', 'Inflación', 'Teoría Económica', 'Curva de Phillips', 'Desinflación'],
    readTime: '7 min',
    content: `## El timing no fue casual

El 15 de mayo de 2026 falleció Edmund Phelps, Premio Nobel 2006 y uno de los economistas que demostró, hace casi seis décadas, que la inflación no puede comprar empleo de manera permanente. Días después, en la Universidad de San Andrés (UdeSA), se dio una conferencia que recorrió exactamente ese argumento: la historia de la neutralidad del dinero, desde los clásicos hasta los modelos dinámicos de hoy. Entender de qué se trató esa clase es entender la lógica detrás del programa de estabilización que el Gobierno viene ejecutando.

## El truco del mago que solo funciona una vez

Imaginá que un mago hace un truco frente a una audiencia que nunca lo vio: todos se sorprenden. Si lo repite al día siguiente con el mismo público, el efecto se reduce. Si lo hace por tercera vez, nadie se inmuta: ya saben cómo termina.

La curva de Phillips funciona exactamente así. En 1960, Paul Samuelson y Robert Solow describieron la relación inversa entre inflación y desempleo como un "menú de política": el gobierno podía elegir más inflación a cambio de menos desocupación. El problema es que ese menú tiene fecha de vencimiento.

Milton Friedman (1968) y Phelps (1967) lo demostraron por separado: cuando los trabajadores aprenden que la inflación sube sistemáticamente, exigen salarios nominales más altos para compensar, y el empleo vuelve a su nivel previo. El truco pierde el efecto. Robert Lucas fue más lejos en 1972: si los agentes usan toda la información disponible (expectativas racionales), una política monetaria anunciada y sistemática es completamente neutral desde el primer día. La neutralidad del dinero no es un supuesto ideológico — es el resultado de incorporar que las personas aprenden y ajustan su comportamiento.

## ¿Qué significa que el dinero sea "neutral"?

En esta tradición, neutralidad significa que cambios en la cantidad de dinero no afectan variables reales —empleo, capital, producto— en el largo plazo, sino solo el nivel de precios.

La versión más fuerte es la **superneutralidad**: incluso cambios en la *tasa de crecimiento* del dinero dejan intactos el stock de capital y el consumo en estado estacionario. Eso es lo que demuestra el modelo de **Miguel Sidrauski**, economista argentino que publicó sus dos papers fundamentales en 1967 y murió al año siguiente con 28 años. Sidrauski es hasta hoy el aporte argentino más citado en macroeconomía dinámica formal.

## El argumento que más le importa a Argentina: Sargent y Wallace

La parte más operativa para el contexto local es el paper de Thomas Sargent y Neil Wallace de 1981, *"Some Unpleasant Monetarist Arithmetic"*. El argumento es contraintuitivo: en una economía con **dominancia fiscal** (donde el fisco fija su déficit sin considerar la restricción del banco central), una política monetaria contractiva *hoy* puede producir más inflación *mañana*.

El mecanismo es aritmético: si el gobierno emite deuda en lugar de dinero para financiar el déficit, esa deuda acumula intereses; si la tasa real supera el crecimiento del producto, el banco central deberá emitir más en el futuro para cubrir los vencimientos. Comprimir la emisión ahora solo traslada el problema hacia adelante con interés.

La conclusión práctica es directa: la desinflación sostenida requiere consolidación fiscal previa o simultánea, no después.

## El efecto Cantillon: la parte incómoda para todos

La conferencia también incluyó a Richard Cantillon, economista del siglo XVIII que observó algo que la teoría cuantitativa simple ignora: el dinero nuevo no llega a todos los bolsillos al mismo tiempo ni al mismo precio.

Los primeros receptores gastan cuando los precios todavía no subieron, apropiándose de poder de compra real. Los últimos lo reciben cuando los precios ya se ajustaron. El efecto Cantillon es la razón por la cual la inflación redistribuye riqueza antes de que los precios se estabilicen — y es un argumento incómodo para cualquier gobierno que administra una expansión monetaria, sea cual sea su signo político.

## Conclusión

Lo expuesto en UdeSA no es doctrina de un partido: es el núcleo del consenso macroeconómico moderno, construido desde los años sesenta por keynesianos, monetaristas y nuevos clásicos. La neutralidad del dinero en el largo plazo, la ineficacia de la política monetaria sistemática y la necesidad de solvencia fiscal como condición de la estabilidad de precios son resultados que emergen de tradiciones teóricas distintas que convergieron en las mismas conclusiones.

Lo que reste del debate argentino dependerá menos de si estos argumentos son correctos — hay amplio consenso en que lo son — y más de si las condiciones institucionales para sostenerlos en el tiempo logran consolidarse.

---
*Fuentes: Phillips (1958), Samuelson-Solow (1960), Friedman (1968), Phelps (1967), Lucas (1972), Sidrauski (1967), Sargent-Wallace (1981), Cantillon (1755), Mises (1912).*`,
  },
  {
    slug: 'superavit-comercial-abril-2026-record',
    title: 'Argentina Superavitaria: El Récord Comercial de Abril y la Economía que Crece en Dos Velocidades',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '21 de mayo de 2026',
    summary: 'En abril de 2026, Argentina exportó USD 8.914 millones — el mayor valor nominal de la serie histórica del INDEC — con un superávit de USD 2.711 millones, también récord. Pero leerlo solo como un titular de éxito sería un error.',
    image: '📦',
    tags: ['Balanza Comercial', 'Exportaciones', 'Vaca Muerta', 'Economía', 'INDEC'],
    readTime: '9 min',
    content: `## El Número y su Contexto

En abril de 2026, Argentina exportó USD 8.914 millones — el mayor valor nominal de la serie histórica del INDEC — y cerró el mes con un superávit comercial de USD 2.711 millones, también récord para ese mes.

El número impresiona. Pero leerlo solo como un titular de éxito sería un error. Para entender qué significa realmente, hay que abrir el capó y ver qué motor está funcionando — y cuál está en ralentí.

El superávit acumulado en el primer cuatrimestre de 2026 alcanzó **USD 8.275 millones** — casi seis veces más que en igual período de 2025. El resultado positivo se extendió por **vigésimo noveno mes consecutivo**.

Para dimensionarlo: analistas consultados por Bloomberg esperaban un superávit de USD 1.100 millones para abril. El REM del BCRA proyectaba USD 1.828 millones. El resultado real fue USD 2.711 millones — **más del doble de la expectativa del mercado**.

¿Cómo se explica esa sorpresa? Por dos vías simultáneas. Las exportaciones crecieron **33,6% interanual**, impulsadas tanto por un alza de 20,6% en las cantidades exportadas como por una mejora de 10,8% en los precios. Las importaciones, en cambio, cayeron **4,0%**, con una baja de 7,7% en las cantidades compradas.

Más exportaciones y menos importaciones al mismo tiempo. Esa combinación es la que produce un superávit de esa magnitud. Pero la pregunta es por qué las importaciones caen — y la respuesta no es exclusivamente positiva.

## Los Tres Motores del Boom Exportador

Pensá en un tren con tres locomotoras tirando a la vez, mientras el resto de los vagones ruedan por inercia. Eso es el sector externo argentino en 2026.

**Primera locomotora: Energía y Vaca Muerta.** Las exportaciones de combustibles y energía crecieron **85,9% interanual** en abril, impulsadas por el petróleo y carburantes. La balanza comercial energética registró un superávit de **USD 1.402 millones en abril** — el mayor valor mensual del que se tenga registro.

El cambio estructural de fondo es notable. La producción de petróleo en Argentina se encamina a romper un récord histórico en 2026, impulsada por el boom de Vaca Muerta y el crecimiento de la extracción no convencional. Según la Bolsa de Comercio de Rosario, el país podría alcanzar una producción de 54,5 millones de metros cúbicos de crudo este año, superando el máximo histórico registrado en 1998.

La analogía correcta para Vaca Muerta no es la de una mina que se agota: es la de una fábrica que recién está siendo construida. La CEPH estima que el desarrollo de Vaca Muerta podría generar un superávit energético superior a **USD 20.000 millones anuales**, impulsado por el aumento de exportaciones de petróleo, la expansión del gas hacia mercados regionales y el desarrollo de proyectos de GNL.

**Segunda locomotora: Minería.** En marzo de 2026, las exportaciones mineras totalizaron USD 830 millones y acumularon USD 2.409 millones durante el primer trimestre del año, representando el **11,2% de las exportaciones totales argentinas** — un nivel 158,1% por encima del promedio 2010-2025 para el mismo período.

**Tercera locomotora: Agro.** El complejo agroexportador sigue siendo la columna vertebral histórica del ingreso de divisas, aunque su peso relativo se reduce a medida que energía y minería crecen. La consultora Abeceb sintetizó el nuevo perfil exportador: "a la fortaleza tradicional del agro se suma con peso creciente el aporte de Vaca Muerta, la minería metalífera y el litio".

El resultado proyectado para el año completo: Argentina podría alcanzar los **USD 100.000 millones en exportaciones en 2026**, superando el récord de 2022, con un superávit comercial cercano a los **USD 16.000 millones** — casi 50% más que en 2025.

## La Otra Cara: Por Qué Caen las Importaciones

Acá está el dato que el titular del superávit no muestra.

Las importaciones no caen principalmente porque Argentina produce más de lo que antes importaba. Caen porque una parte significativa de la economía doméstica no está traccionando lo suficiente como para demandar más insumos, bienes de capital y componentes del exterior.

Las consultoras privadas señalan que el aparato transable vuela hacia el mercado mundial mientras el consumo y la industria local siguen sin terminar de repuntar. La caída en importaciones de combustibles y lubricantes fue del **45,4%** — consecuencia directa de que Argentina ya no necesita importar energía como antes gracias a Vaca Muerta. Ese componente es genuinamente positivo. Pero también cayeron bienes de capital (-5,9%) y piezas y accesorios para bienes de capital — señal de que la inversión industrial doméstica no está acelerando al mismo ritmo que el sector extractivo.

## La Argentina a Dos Velocidades

Un analista del CEPEC lo formuló con precisión: *"Si ponemos la lupa sobre este resultado, podremos confirmar un relato que venimos reproduciendo hace ya unos meses: la Argentina a dos velocidades."*

Es una imagen útil — y técnicamente precisa.

Según datos de la consultora Invecq, los "sectores ganadores" — minería, petróleo y agropecuario — se mantienen un **15,3% por encima** de los niveles registrados en noviembre de 2023. Mientras tanto, los sectores dependientes del mercado interno y el consumo urbano enfrentan un panorama de estancamiento. La industria manufacturera, el comercio y la construcción se ven afectados por la debilidad del poder adquisitivo y el encarecimiento del crédito.

La brecha se refleja directamente en los indicadores sociales: la desocupación subió al **7,5%** al cierre de 2025. La construcción representa casi el 20% de los nuevos desocupados.

La metáfora más precisa no es la de un tren con locomotoras: es la de un **campo de fútbol con iluminación asimétrica**. La mitad del campo — Vaca Muerta, minería, agro — está perfectamente iluminada, con jugadores activos y resultados visibles. La otra mitad — industria, construcción, consumo urbano — opera con luz tenue, no completamente oscura, pero sin la energía del otro lado.

## ¿Se Sostiene?

La pregunta crítica para cualquier análisis honesto del superávit comercial argentino es si este desempeño es estructural o coyuntural.

Hay elementos que sugieren sustentabilidad de mediano plazo. La expansión del shale convirtió al país en un exportador neto de energía y posicionó al sector como uno de los principales receptores de inversiones privadas, especialmente tras la implementación del RIGI. La infraestructura que se está construyendo — oleoductos al Atlántico, proyectos de GNL — tiene horizontes de décadas, no de trimestres.

Y hay elementos que generan interrogantes. Los términos del intercambio favorables — el índice alcanzó un nivel de 149,5, con una suba de 6,5% respecto al año anterior — dependen de precios internacionales que Argentina no controla. Un ciclo bajista en commodities energéticos o agrícolas modifica el cuadro rápidamente.

La consultora LCG advierte que para el resto de la economía "no hay drivers claros que impulsen un desarrollo vigoroso", proyectando un crecimiento anual promedio por debajo de lo que el sector externo sugeriría.

## La Lección Estructural

Argentina lleva décadas siendo rehén de la **"restricción externa"** — la escasez de dólares que cada tanto cortaba el crecimiento, forzaba devaluaciones y generaba los ciclos de stop-and-go que empobrecieron a varias generaciones.

Lo que está pasando en 2026 es potencialmente una ruptura de ese patrón. Esta diversificación productiva reduce la vulnerabilidad histórica del sector externo a los ciclos climáticos y de precios agrícolas, y abre la puerta a un sendero de crecimiento exportador estructuralmente más sólido, siempre que se sostengan las condiciones macro y se materialicen las inversiones comprometidas.

El superávit récord de abril no es solo un número. Es la primera señal sostenida de que el perfil exportador argentino está cambiando de composición. El agro ya no carga solo. Vaca Muerta y la minería están tomando parte del peso.

Si el crecimiento de esos sectores logra derramarse hacia la industria y el consumo interno — a través de empleo directo, encadenamientos productivos y mayor crédito — el ciclo puede volverse virtuoso. Si la economía de dos velocidades se consolida como estado permanente, el éxito del sector externo convive con una pregunta social sin respuesta clara.

El resultado de abril es, en términos técnicos, extraordinario. La pregunta de fondo — *para quién y cuándo* — sigue siendo la más importante.

---
*Fuentes: INDEC (Intercambio Comercial Argentino), Abeceb, Invecq, CEPEC, CEPH, Bolsa de Comercio de Rosario, LCG, BCRA REM.*`,
  },
  {
    slug: 'dolar-vs-plazo-fijo-enero-mayo-2026',
    title: 'El Dólar Perdió: Qué Pasó Con $100.000 en Argentina Entre Enero y Mayo 2026',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '20 de mayo de 2026',
    summary: 'Entre enero y mayo de 2026, el plazo fijo le ganó al dólar por casi 13 puntos porcentuales. Pero todos perdieron contra la inflación. Un experimento con $100.000 reales que revela la nueva lógica del ahorro argentino.',
    image: '💵',
    tags: ['Ahorro', 'Dólar', 'Plazo Fijo', 'Inflación', 'Inversión', 'UVA'],
    readTime: '8 min',
    content: `## El experimento mental que todo argentino hace

Hay un experimento mental que todo argentino hace cuando cobra: **¿Lo pongo en el banco o compro dólares?**

Entre enero y mayo de 2026, ese experimento tuvo una respuesta clara, incómoda para los dos bandos del debate económico argentino. Te lo contamos con números reales.

## El Experimento: $100.000 el 2 de Enero

Imaginá que el 2 de enero de 2026 tenías $100.000 y tres opciones:

1. Colocarlos en un plazo fijo a 30 días en Banco Nación, renovando mes a mes
2. Comprarle dólares al banco (tipo de cambio oficial BNA)
3. Comprar dólares en el mercado informal (blue)

Al 15 de mayo, el resultado fue el siguiente:

| Estrategia | Valor final | Variación |
|---|---|---|
| **Plazo fijo 30 días Banco Nación** | **$107.900** | **+7,9%** |
| Plazo fijo 90 días + rolleo | $108.400 | +8,4% |
| Plazo fijo Santander | $106.400 | +6,4% |
| Dólar oficial (BNA) | $94.984 | -5,0% |
| Dólar blue | $92.484 | -7,5% |

El plazo fijo le ganó al dólar oficial por **casi 13 puntos porcentuales**. Al blue, por más de **15 puntos**.

Pero hay un dato que complica el festejo.

## El Problema: Todos Perdieron Contra la Inflación

Pensá en una cinta transportadora que sube. Vos podés caminar hacia adelante o quedarte quieto — en ambos casos retrocedés respecto al punto de llegada. La diferencia es cuánto retrocedés.

Eso es lo que pasó con el ahorro argentino en estos cinco meses.

La inflación acumulada entre enero y abril de 2026 fue **12,3%** según el INDEC (dato publicado el 14 de mayo). Con la proyección del REM del BCRA para mayo (2,3%), el acumulado de cinco meses ronda el **14,9%**.

Resultado real:

- El plazo fijo en Banco Nación perdió aproximadamente **4 puntos contra la inflación**
- El dólar oficial perdió aproximadamente **15 puntos contra la inflación**
- El dólar blue perdió aproximadamente **18 puntos contra la inflación**

Ganaste la carrera contra el dólar. Pero la carrera que importa — la de preservar poder adquisitivo — la perdiste igual. Solo perdiste menos.

## Por Qué el Dólar Bajó: La Nueva Lógica Cambiaria

Esto es lo que más desorientó al ahorrista argentino clásico en 2026.

El dólar oficial pasó de $1.495 el 2 de enero a $1.420 el 15 de mayo. Una caída del 5% en términos nominales. El blue siguió la misma dirección: de $1.530 a $1.415, una caída del 7,5%.

¿Cómo es posible que el dólar baje en Argentina?

La respuesta está en la nueva arquitectura cambiaria vigente desde el 1° de enero de 2026: un régimen de **bandas cambiarias** que ajustan por inflación, combinado con una oferta robusta del sector agropecuario y el fenómeno del **carry trade** — inversores que se quedaron en pesos aprovechando las tasas.

El dato más llamativo: a mediados de mayo, el **blue cotizaba por debajo del oficial minorista**. Algo que no ocurría desde la salida del cepo. La brecha, que históricamente era el termómetro de la desconfianza argentina, se cerró a cero — y se invirtió.

Para el BCRA, el período fue de acumulación: el presidente Santiago Bausili confirmó que el programa de compra de reservas acumuló **USD 8.234 millones desde enero**.

## La Trampa de las Tasas: El Banco Que Elegiste Importó Mucho

No todos los plazos fijos son iguales, y la diferencia entre bancos en este período fue significativa.

| Banco | Enero 2026 (TNA) | Mayo 2026 (TNA) | Caída |
|---|---|---|---|
| Banco Nación | 23,5% | 17,5% | -6 p.p. |
| BBVA | 21% | 18,75% | -2,25 p.p. |
| Santander | 21% | 15% | -6 p.p. |

Santander terminó pagando el equivalente a **1,25% mensual** — casi la mitad de la inflación de abril. Rendimiento real: fuertemente negativo.

Mientras tanto, bancos medianos como BICA o CMF estaban pagando hasta 23-23,25% TNA. La diferencia entre el banco más caro y el más barato era del **50% en términos de rendimiento mensual**.

La analogía es directa: es como dos almacenes en la misma cuadra que venden el mismo producto, pero uno lo vende un 50% más caro que el otro. La mayoría de los argentinos sigue comprando en el caro porque es donde siempre fue.

El comparador oficial del BCRA (bcra.gob.ar) muestra estas diferencias en tiempo real. Pocos lo usan.

## El Verdadero Ganador: El Que Nadie Habla

Si el plazo fijo tradicional perdió contra la inflación y el dólar perdió todavía más, ¿qué le ganó al costo de vida?

El **plazo fijo UVA**.

El 1° de abril de 2026, Banco Nación lanzó el certificado de depósito a plazo fijo UVA con pago de intereses por subperíodos — mínimo $1.500, plazos de 90 a 1.095 días, con ajuste CER más un adicional de 4,5% TNA.

El UVA ajusta por el índice CER, que sigue a la inflación. No importa si la inflación es 2% o 5% mensual — tu capital se ajusta con ella, más el adicional de tasa real. Es el único instrumento bancario del segmento minorista que le ganó claramente a la inflación en lo que va de 2026.

¿Por qué no lo usa todo el mundo? Porque tiene un mínimo de 90 días sin rescate anticipado. En un país acostumbrado al corralito, la idea de "no poder sacar la plata" genera resistencia instintiva — incluso cuando el instrumento está diseñado exactamente para proteger contra la inflación que tanto se teme.

Eso es la **homeostasis** aplicada al ahorro: el sistema resiste la herramienta que más lo protegería porque la desconfianza aprendida es más fuerte que el incentivo racional.

## Qué Hacer Ahora: Tres Escenarios

El REM del BCRA (encuesta a 45 analistas, publicada el 7 de mayo de 2026) proyecta inflación mayo 2,3%, junio-julio ~2,0% mensual, y dólar mayorista a diciembre en $1.676.

Con ese escenario base, tres conclusiones operativas:

**Si querés preservar poder adquisitivo:** el plazo fijo UVA es hoy el único instrumento bancario minorista que lo permite. Requiere horizonte mínimo de 90 días y tolerar la incomodidad de no tener acceso inmediato.

**Si querés quedarte en tasa fija:** comparar bancos en el sitio oficial del BCRA antes de renovar. La diferencia entre Santander (15% TNA) y los mejores bancos medianos (23%+) es demasiado grande para ignorarla.

**Si estás pensando en dolarizar:** el dólar oficial hoy está 5% más barato que en enero. Si creés que el atraso cambiario actual es insostenible, comprar dólares ahora implica cobertura barata. Pero si el esquema de bandas se sostiene, el carry en pesos seguirá ganando en el corto plazo.

## La Conclusión que Incomoda a los Dos Bandos

Al "dólar-siempre" le decimos: entre enero y mayo de 2026, el dólar destruyó poder adquisitivo más rápido que cualquier otra alternativa. El instinto aprendido de décadas de inflación y devaluación jugó exactamente en contra.

Al "plazo fijo siempre" le decimos: ganaste contra el dólar, pero perdiste contra la inflación. La victoria es relativa.

La realidad incómoda es que en Argentina, en este período, **no hubo refugio perfecto en el segmento bancario tradicional**. El único instrumento que funcionó — el UVA — es el que menos argentinos usaron, en parte por la desconfianza estructural al sistema que construimos en décadas de traiciones institucionales.

La ironía es completa: el instrumento diseñado para protegerte de la inflación es el que más resistencia genera por miedo a la inflación.

---
*Datos: INDEC, BCRA (REM mayo 2026), BNA, comparador oficial de tasas bcra.gob.ar. Período: 2 de enero al 15 de mayo de 2026.*`,
  },
  {
    slug: 'turismo-argentino-2026',
    title: 'El Turismo Argentino Cambió de Dirección: Más Extranjeros, Menos Argentinos Afuera y el Mundial que Viene',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '26 de mayo de 2026',
    summary:
      'Entre enero y abril de 2026, ingresaron 2,1 millones de turistas no residentes (+9,8%) mientras las salidas de argentinos cayeron 10,3%. El déficit de la cuenta Servicios se recortó 27% interanual. La balanza turística se invierte — y el Mundial que viene es el próximo test para las reservas.',
    image: '✈️',
    tags: ['Turismo', 'Balanza Cambiaria', 'Sector Externo', 'BCRA', 'Mundial 2026'],
    readTime: '9 min',
    content: `## El termómetro que pocos miran

Hay un termómetro económico que pocas personas miran pero que dice mucho sobre la salud de un país: la balanza turística.

Durante décadas, Argentina fue un país que exportaba turistas y sus dólares al mundo, mientras recibía relativamente pocos extranjeros. El patrón era simple y costoso: los argentinos se iban a Brasil, Miami o Europa, y el Banco Central perdía divisas.

En 2026, ese patrón se está invirtiendo — y los números son concretos.

## El giro estructural: menos argentinos afuera, más extranjeros adentro

Entre enero y el 14 de abril de 2026 ingresaron **2.125.041 turistas no residentes**, un crecimiento del **9,8% interanual**. Al mismo tiempo, las salidas de argentinos al exterior cayeron **10,3%**.

El efecto combinado es directo sobre las reservas. El déficit de la cuenta Servicios del balance cambiario se recortó a **USD 2.208 millones en el primer trimestre de 2026** — una mejora del **27% interanual**, equivalente a **USD 816 millones menos de sangría de divisas** que en el mismo período de 2025.

Para entender la magnitud: USD 816 millones menos de fuga turística en un trimestre es más que las reservas que generó el blanqueo de capitales en muchas semanas. Y se logró sin ninguna ley especial — simplemente por el cambio en los precios relativos y el nuevo perfil del viajero argentino.

## ¿Por qué caen los viajes al exterior?

La respuesta tiene nombre y moneda. El flujo de argentinos a Brasil cayó **14,72% en el primer trimestre**, explicado por la apreciación nominal del real brasileño frente al peso de aproximadamente **51% interanual** entre octubre 2024 y octubre 2025, que volvió el destino mucho más caro en pesos.

Brasil, el destino de playa favorito del argentino medio, se convirtió en un lujo. Y el argentino, pragmático como siempre, ajustó el destino.

## El feriado del 25 de Mayo: un termómetro del turismo doméstico

El fin de semana largo del 25 de Mayo movilizó **1.440.120 turistas** con un impacto económico directo de **$339.880 millones** — gasto diario promedio de $112.385 y estadía de 2,1 noches.

El dato de cantidad es positivo. Pero hay un matiz importante que los titulares suelen ignorar.

En cantidad de viajeros el feriado mostró un crecimiento del 9,1% respecto al comparable de 2023, pero el **gasto real cayó 9,9%** — porque el feriado de 2023 tuvo cuatro días contra tres en 2026.

Mirando el panorama más amplio del año: en los **cinco fines de semana largos de 2026**, se movilizaron **9.380.840 turistas** con un gasto de **$2.621.963 millones** — un crecimiento del 27,7% en cantidad y 45,9% en gasto respecto al mismo período de 2025.

El turismo doméstico está activo. Pero el patrón cambió: escapadas más cortas, decisiones de último momento, destinos más cercanos. El argentino no dejó de viajar — aprendió a viajar diferente.

Es la homeostasis aplicada al turismo: cuando el sistema no puede mantener el patrón anterior (viaje internacional largo y caro), encuentra un nuevo equilibrio (escapada corta y nacional).

## El extranjero que llega: de dónde viene y qué hace

Los principales mercados emisores del turismo receptivo aéreo en el primer trimestre fueron **Europa con el 27,8%**, seguido por **Estados Unidos y Canadá con el 21,7%**, y **Brasil con el 17,2%**.

El dato europeo y norteamericano es el más valioso desde el punto de vista de divisas: un turista europeo o estadounidense gasta en dólares o euros, y trae dólares reales al sistema. Un turista brasileño o regional trae menos poder de gasto en términos absolutos.

El primer trimestre de 2026 generó **USD 912,5 millones de divisas** por gasto de turistas no residentes en Argentina.

¿Qué hacen cuando llegan? Gastronomía encabeza con el **66,8%** de actividades realizadas, seguida por espacios culturales con el **61,7%**, espectáculos culturales con el **30,6%** y parques nacionales con el **27,3%**.

Buenos Aires sigue concentrando la llegada: CABA captó el **68,5% de las pernoctaciones** de no residentes en marzo, con una estadía promedio de **6,1 noches**. Pero hay un dato que anticipa una tendencia positiva: los pasajeros internacionales directos desde el interior crecieron **43% interanual** en marzo — Rosario creció 73%, Córdoba 64% y Jujuy 48%.

El turismo receptivo está dejando de ser solo un fenómeno porteño.

## El boom aéreo: récords que no se ven en el debate político

Mientras el debate político se concentra en salarios y tipo de cambio, el sector aéreo está rompiendo marcas silenciosamente.

**Abril 2026 fue el mejor abril histórico** en pasajeros con **3.906.057**, un crecimiento del 1% interanual. El acumulado del primer cuatrimestre alcanzó **17.897.992 pasajeros**, también récord para ese período.

Los pasajeros internacionales directos desde el interior crecieron **35% interanual** en abril, superando el récord previo de 2018.

Si el sistema circulatorio de la economía turística fueran las rutas aéreas, lo que está pasando en 2026 es que el cuerpo está desarrollando capilares nuevos — conexiones directas desde ciudades del interior que antes solo podían acceder al turismo internacional pasando por Buenos Aires. Eso no solo distribuye el beneficio, sino que reduce costos y tiempos para el viajero y para el país.

## El precio: Argentina cara en dólares, barata para europeos

Con el peso apreciado, viajar desde Argentina se encareció: Brasil subió **15% en términos reales** medido contra el dólar MEP, la zona euro **14%**, Suiza **13%**. Solo Estados Unidos subió apenas **1%** — dato crítico de cara al Mundial 2026.

Pero la misma apreciación del peso tiene el efecto inverso para el extranjero que viene: Argentina sigue siendo competitiva en precio para el turista europeo o norteamericano. Las tarifas medias-altas de hoteles porteños se ubican en **USD 76,59**, contra USD 105,86 en San Pablo y USD 105,38 en Santiago de Chile.

Buenos Aires es aproximadamente un **30% más barata** que sus competidores regionales directos para el turista de dólares. Esa brecha de precio es uno de los drivers más concretos del crecimiento receptivo.

## La amenaza que viene: el Mundial y las divisas

Ningún análisis del turismo argentino en 2026 estaría completo sin mencionar el elefante en la habitación.

Las estimaciones de Focus Market para Naranja X colocan el costo del viaje al Mundial 2026 para un hincha argentino entre **USD 7.700 y USD 7.900** — equivalente a aproximadamente **10 salarios netos promedio**.

Multiplicá ese número por los cientos de miles de argentinos que están planificando o ya tienen reservado el viaje, y la presión sobre las reservas del BCRA en junio y julio se vuelve una variable macroeconómica relevante, no solo un dato de viajes.

El mismo fenómeno que hizo caer el turismo emisivo regular — el peso más caro en dólares — no opera con el mismo freno cuando se trata del Mundial. La demanda es inelástica al precio: el hincha argentino va aunque cueste caro. Ese es un riesgo concreto para el frente cambiario del segundo trimestre.

## El problema invisible: el apagón de los datos

Hay un dato administrativo que pasa casi desapercibido pero que tiene implicancias serias para cualquier análisis del sector.

La Secretaría de Turismo, encabezada por Daniel Scioli, **no renovó el convenio con el INDEC**. El último informe de la Encuesta de Ocupación Hotelera publicado corresponde a noviembre de 2025. El propio informe oficial señala que "este informe constituye el último del sector bajo el actual esquema de difusión".

Sin EOH no hay tasa de ocupación oficial nacional. Sin datos de ocupación no hay manera de medir con precisión si el boom receptivo que muestran los datos migratorios se traduce en pernoctaciones reales y en ingresos para el sector hotelero formal.

Una política pública sin datos es como un piloto de avión sin instrumentos: podés estar volando bien o en picada, y la diferencia solo la descubrís cuando ya es tarde.

El Gobierno tiene un discurso de apertura y transparencia de datos en muchos frentes. La decisión de cortar la EOH va exactamente en la dirección contraria en uno de los sectores con mayor potencial de crecimiento.

## La foto completa

El turismo argentino en mayo de 2026 presenta una imagen que merece leerse sin simplificarla ni en sentido positivo ni negativo.

**Lo positivo es real:** el receptivo crece, el emisivo cae, la balanza cambiaria turística mejora 27% interanual, los aeropuertos rompen récords y el extranjero encuentra en Argentina una combinación de precio, cultura y naturaleza que pocos destinos regionales pueden igualar.

**Lo complejo también es real:** el turismo doméstico ajusta hacia escapadas más cortas y gasto más contenido, la falta de datos oficiales limita el diagnóstico preciso, el encarecimiento relativo de destinos regionales desincentiva el viaje exterior pero también señala una pérdida de poder adquisitivo real, y el Mundial se acerca como una prueba de fuego para las reservas.

La balanza turística es, en definitiva, un espejo de la economía más amplia. Cuando el país tiene precios competitivos, instituciones estables y una oferta cultural y natural de clase mundial, el mundo viene a verlo. Argentina tiene los últimos dos. El primero sigue siendo el desafío.

---
*Fuente: Ámbito Financiero en base a INDEC, Ministerio de Turismo, BCRA, Focus Market / Naranja X. Mayo 2026.*`,
  },
  {
    slug: 'argentinos-confian-en-el-peso-m2-2026',
    title: 'Los Argentinos Están Volviendo a Confiar en el Peso: Qué Dice el Dinero que Circula',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '27 de mayo de 2026',
    summary:
      'El M2 privado llegó a ARS 59,1 billones en marzo 2026, creciendo un 3,9% mensual. Nuestro modelo detecta que la economía cambió de régimen: el 95% del comportamiento del dinero se explica con la brecha cambiaria, no con la inflación. Y la brecha está en cero.',
    image: '💵',
    tags: ['Monetario', 'M2', 'Brecha Cambiaria', 'BCRA', 'Remonetización'],
    readTime: '7 min',
    content: `## Lo que nadie está mirando

Hay algo que está pasando en la economía argentina que casi nadie está mirando.

No aparece en los titulares. No genera peleas en Twitter. Pero es, posiblemente, una de las señales más importantes de que algo estructural está cambiando.

Los argentinos están eligiendo quedarse en pesos.

No porque los obliguen. No porque no puedan comprar dólares. Sino porque, por primera vez en mucho tiempo, tiene sentido.

## ¿Qué es el M2 y por qué importa?

El M2 es, en términos simples, el dinero que la gente y las empresas tienen disponible para gastar: los billetes en el bolsillo más lo que hay en las cuentas corrientes de los bancos.

Pensalo como el **"combustible líquido" de la economía**. Cuando hay poco M2 — no en términos de billetes impresos, sino de dinero que la gente elige mantener en pesos — significa que todos están convirtiendo sus pesos a dólares lo más rápido que pueden. La economía funciona, pero con el freno de mano puesto.

Cuando el M2 crece de forma ordenada, sin emisión descontrolada, significa que la gente confía lo suficiente en el peso como para quedarse en él. Es la economía funcionando con el freno de mano levantado.

En **marzo de 2026, el M2 privado llegó a ARS 59,1 billones**, creciendo un **3,9% respecto al mes anterior**. Pero el número en sí importa menos que lo que hay detrás.

## El modelo que no entendió que Argentina cambió

En MacroLibre construimos modelos matemáticos para predecir cuánto dinero debería estar circulando en la economía. Y encontramos algo fascinante.

El **modelo "viejo"** — el que aprendió mirando la Argentina entre 2010 y 2022, la era del cepo, la inflación descontrolada y el dólar blue disparado — dice que hoy debería haber casi un **40% más de dinero circulando** del que hay.

Nuestro **modelo más moderno**, que puede detectar cuándo la economía cambió de comportamiento, dice algo completamente distinto: el M2 actual está exactamente donde debería estar. El desvío es de apenas **0,4%**.

La analogía es simple: imaginá que tenés una tabla de referencia de cuánto pesa una persona "normal" basada en pacientes que comían mal durante veinte años. Cuando te traen a alguien que lleva dos años comiendo bien y haciendo ejercicio, tu tabla dice que está "demasiado liviano". Pero no está enfermo — simplemente cambió de hábito.

El modelo viejo aprendió en una Argentina enferma. No sabe cómo luce una Argentina que empieza a sanar.

## La brecha cambiaria: el termómetro de la desconfianza

¿Qué es lo que más explica si los argentinos quieren pesos o no?

No es la inflación del mes. No es la tasa del banco. Es algo más simple y más profundo: si el dólar blue está muy por encima del oficial o no.

Cuando la brecha entre el dólar paralelo y el oficial es grande — como fue durante años, llegando al **160%** — es una sirena de alarma que todos los argentinos escuchan aunque no entiendan de economía. Esa sirena dice: *"el peso se va a devaluar, salí ya"*. Y la gente sale.

Cuando esa brecha converge a cero — como está pasando ahora — la sirena se apaga. Y sin sirena, la gente empieza a quedarse en pesos más tranquila.

Eso es exactamente lo que muestran los datos: el **95% del comportamiento del dinero en Argentina se explica con dos cosas** — la tendencia de largo plazo de monetización y la brecha cambiaria. La inflación mensual, la tasa de interés, todo lo demás, suma apenas el 5%.

Durante décadas creímos que la inflación era el driver número uno de la demanda de dinero. El modelo dice que no: **era la brecha**. La inflación importaba porque generaba brecha. Ahora que la brecha cayó, el mecanismo cambió.

## ¿Qué puede pasar de acá a fin de año?

Proyectamos tres escenarios posibles para el M2 hasta diciembre de 2026:

**Escenario optimista** — inflación bajando al 1,5% mensual y brecha en cero: el dinero crece de forma ordenada, reflejando una economía que se normaliza. La remonetización avanza sin ruido.

**Escenario base** — inflación estable en torno al nivel actual: el crecimiento nominal es mayor, pero parte de eso es simplemente la inflación empujando los números. El proceso continúa, más lento.

**Escenario de ruptura** — la inflación vuelve a acelerar y el dólar blue se dispara: paradójicamente el número nominal sería el más alto de los tres. Pero sería la peor noticia: la gente volvió a huir del peso y el número grande es solo inflación, no confianza.

Acá está la trampa que confunde a muchos: **más pesos en circulación no siempre es buena noticia**. Depende de por qué hay más pesos.

## Lo que nadie está diciendo en los titulares

La gran noticia económica de los últimos meses no es el superávit fiscal, aunque es importante. No es la baja de inflación, aunque también lo es.

La gran noticia es esta: **los argentinos están lentamente volviendo a confiar en su propia moneda**.

No es un cambio cultural todavía — para eso hacen falta años, no meses. Pero es la primera señal medible, cuantificable, de que el proceso de remonetización está en marcha.

El M2 de marzo dice que, por ahora, las señales están funcionando.

La pregunta que nadie puede responder todavía es cuánto tiempo se mantiene la consistencia. Porque **la confianza monetaria es el activo más frágil que existe: tarda años en construirse y días en destruirse**.

---
*Datos: BCRA, modelos de series temporales MacroLibre. Marzo 2026.*`,
  },
  {
    slug: 'reforma-ley-sociedades-sturzenegger-2026',
    title: 'La Ley que Mataba Empresas en el Papel: Por Qué la Reforma de Sturzenegger es Histórica',
    author: 'Equipo MacroLibre',
    authorRole: 'Análisis macroeconómico',
    date: '29 de mayo de 2026',
    summary:
      'Argentina tiene una Ley General de Sociedades de 1972 — dictada bajo Lanusse, antes de internet y los celulares — que regula hoy cada startup, PyME y fondo de inversión. El proyecto de Sturzenegger la reforma de raíz: estatuto sobre ley, digitalización total, IGJ sin poder discrecional, criptoactivos como capital y sociedades gestionadas por IA con personalidad jurídica.',
    image: '⚖️',
    tags: ['Desregulación', 'Reforma Societaria', 'IGJ', 'Política Económica', 'Inversión'],
    readTime: '10 min',
    content: `## Una ley de la dictadura para una economía del siglo XXI

En Argentina, para abrir una empresa legalmente, necesitás un escribano, un contador, un abogado, semanas de trámites, una dirección física registrada, un objeto social específico detallado, libros contables físicos rubricados y la aprobación discrecional de un funcionario de la IGJ que puede rechazarte por cualquier motivo.

Todo eso para decirle al mundo que querés producir algo.

Es como si para poder correr una maratón te exigieran primero llenar 47 formularios, presentarlos en papel, esperar la aprobación de un inspector, y especificar exactamente cuántos pasos por minuto vas a dar y en qué dirección.

Esa es la Ley General de Sociedades de 1972. La que el Gobierno de Milei acaba de mandar al Congreso para reformar de raíz.

El proyecto fue presentado por el ministro de Desregulación Federico Sturzenegger, quien señaló que la iniciativa busca modificar la histórica Ley General de Sociedades impulsada durante la presidencia de Alejandro Lanusse. Lanusse. Un dictador. 1972. Cuando no existía internet, las computadoras personales, los celulares, las criptomonedas, la inteligencia artificial ni el trabajo remoto.

Con esa ley — con modificaciones parciales pero la misma lógica de fondo — se rige hoy cada empresa que se constituye en Argentina.

Sturzenegger la describió sin eufemismos: *"El proyecto nos mueve de un régimen rígido y anacrónico, construido sobre la desconfianza al sector privado, a un marco moderno basado en la autonomía, la libertad y la desregulación."*

La palabra clave es **desconfianza**. La ley actual parte de la premisa de que los privados van a hacer algo malo si el Estado no los vigila. La reforma parte de la premisa contraria: los privados saben mejor que el Estado cómo organizar sus propios negocios.

## El cambio central: el estatuto manda, la ley es el plan B

Hoy la ley le dice a las empresas cómo tienen que funcionar. El estatuto — el contrato entre los socios — puede hacer pocas cosas por fuera de lo que la ley permite.

Con la reforma se invierte la lógica: **las normas de la ley pasan a ser supletorias, el estatuto manda**. Las restricciones estatales serán excepcionales y de interpretación restrictiva. Los registros públicos no podrán dictar resoluciones que limiten lo que la ley permite.

La analogía más clara: hoy la ley es como un reglamento de convivencia de edificio donde el administrador decide todo — cuándo podés hacer ruido, cómo tenés que pintar la puerta, qué podés hacer en tu departamento. La reforma convierte ese reglamento en una guía mínima de convivencia: el resto lo deciden los dueños entre ellos.

## Los cambios concretos

**El objeto social deja de ser una trampa burocrática.** Hoy una empresa tiene que detallar exactamente a qué se va a dedicar. Si querés hacer algo nuevo, necesitás modificar el estatuto, pagar escribano, esperar aprobación. La reforma elimina esa restricción: si el estatuto no especifica un objeto concreto, se entenderá que la empresa podrá realizar "cualquier actividad lícita". *"Esto es esencial en un mundo tan cambiante como el que vivimos"*, dijo Sturzenegger.

Pensalo así: hoy tenés que decirle al Estado que vas a ser panadero antes de abrir el local. Si después querés vender también café, necesitás permiso. La reforma dice: si no aclarás que solo hacés pan, podés hacer lo que quieras que sea legal.

**Todo se digitaliza.** La reforma habilita domicilio electrónico, libros digitales, asambleas a distancia y constitución de empresas mediante firma digital o electrónica. *"Con este proyecto, el expediente en papel queda en la historia"*, afirmó Sturzenegger. En 2026, que para constituir una empresa todavía haya que ir a una oficina pública con papeles firmados ante escribano es exactamente tan absurdo como suena.

**La IGJ pierde poder discrecional.** Este es quizás el cambio más importante y el menos mencionado. La IGJ tiene hoy un poder enorme para rechazar, demorar y condicionar trámites de forma arbitraria. Con la reforma, los registros públicos no podrán dictar resoluciones que limiten lo que la ley permite. Se acaba el "porque yo digo que no". Si la ley lo permite, el registro tiene que aprobarlo.

**Criptoactivos como capital.** Por primera vez en la historia legal argentina, un emprendedor podrá aportar Bitcoin, tokens o cualquier activo digital como capital de una sociedad. Reconocimiento legal de una realidad que ya existe hace años en la economía real.

## La parte que nadie esperaba: sociedades gestionadas por inteligencia artificial

Este es el punto más futurista y el más significativo para entender la ambición de la reforma.

La reforma incluirá nuevas figuras jurídicas vinculadas a la economía digital y la inteligencia artificial. Entre ellas, la **"Sociedad Automatizada"**, operada mediante algoritmos o IA sin requerir empleados para su operación ordinaria, y las **DAO** — organizaciones autónomas descentralizadas con participaciones tokenizadas y registros en blockchain. Ambas tendrían *"personalidad jurídica plena y responsabilidad limitada"*.

Una DAO es, en términos simples, una empresa que funciona con código. Las reglas están escritas en un programa informático que se ejecuta automáticamente, sin que ninguna persona específica tome decisiones. Hoy en Argentina eso es legalmente un limbo. Con esta reforma, tendría el mismo estatus legal que una SA o una SRL.

Para justificar la apuesta, Sturzenegger citó el caso de Irlanda, que construyó durante años un régimen legal favorable para compañías tecnológicas. *"Pretendemos esa misma atracción global para Argentina en lo que hace a las empresas de IA"*, aseguró.

Irlanda tiene 5 millones de habitantes y atrae las sedes europeas de Apple, Google y Meta. No por el clima — por las reglas. Si Argentina puede hacer lo mismo con empresas de IA y cripto, el impacto en inversión y empleo calificado sería transformador.

## El argumento de los críticos

La oposición va a argumentar que menos controles es igual a más fraude, más evasión, más abuso. Es el argumento de siempre y merece una respuesta honesta.

El problema con ese argumento es que confunde **control burocrático previo** con **responsabilidad legal posterior**. La ley actual pone trabas antes de que la empresa funcione — como revisar el bolso de todos los que entran a un supermercado por si acaso alguno va a robar. La alternativa es dejar entrar libremente pero aplicar consecuencias duras para el que efectivamente robe.

Lo segundo es más eficiente, más justo y produce menos daño colateral sobre los honestos.

Además, el argumento choca con un dato empírico contundente: Argentina tiene uno de los marcos regulatorios más restrictivos de la región para constituir empresas — y también uno de los niveles más altos de economía informal. **La burocracia no previene el fraude. Solo encarece la legalidad hasta que los honestos también se van a la informalidad.**

## El contexto: una pieza de un rompecabezas mayor

Esta reforma no llega sola. Sturzenegger la enmarcó como parte de "un conjunto de reformas muy profundas" junto al Súper RIGI y otras iniciativas.

El mensaje que Argentina está mandando al mundo en 2026 es consistente: superávit fiscal, inflación bajando, reservas acumulándose, brecha cambiaria en cero, y ahora un marco legal para empresas que compite con los mejores del mundo.

Cada una de esas piezas por separado es importante. Todas juntas forman algo que Argentina no tuvo en décadas: **un argumento creíble para el inversor que está eligiendo dónde poner su capital**.

## Lo que viene: el debate en el Congreso

El proyecto ingresó por el Senado el 29 de mayo de 2026. El tratamiento legislativo se espera para la segunda quincena de junio.

El debate va a ser intenso. La oposición kirchnerista va a gritar "desregulación al servicio del capital". La respuesta correcta es simple: la regulación actual no protege a los trabajadores ni a los consumidores. Solo protege a los burócratas que cobran por aprobar trámites y a los incumbentes que no quieren competencia nueva.

Una ley que facilita abrir empresas es una ley que facilita crear empleo. No hay manera de crear trabajo sin primero poder crear la empresa que lo va a generar.

La reforma de la Ley de Sociedades no es un tecnicismo jurídico. Es la diferencia entre una Argentina que le pone trabas a quien quiere producir y una Argentina que le da la bienvenida.

---
*Fuentes: Perfil, Ámbito Financiero, El Economista, La Derecha Diario, Roadshow. Mayo 2026.*`,
  },
];
