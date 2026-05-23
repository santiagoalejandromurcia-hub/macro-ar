// ============================================================
// MacroLibre — Informes Macroeconómicos
// ============================================================
// Ediciones mensuales de análisis de coyuntura.
// Cada informe incluye contenido estructurado para renderizado
// y el archivo DOCX disponible para descarga.
// ============================================================

export interface InformeSeccion {
  id: string;
  titulo: string;
  contenido: string; // HTML permitido
  imagen?: string;   // path relativo a /public/
  imagenAlt?: string;
}

export interface InformeKPI {
  valor: string;
  etiqueta: string;
  sublabel: string;
}

export interface Informe {
  slug: string;
  titulo: string;
  edicion: string;        // "Edición N°1"
  mes: string;            // "Mayo 2026"
  fecha: string;          // ISO date
  descripcion: string;    // resumen ejecutivo corto (para SEO/cards)
  tags: string[];
  docxPath: string;       // path relativo a /public/
  kpis: InformeKPI[];
  secciones: InformeSeccion[];
}

export const informes: Informe[] = [
  {
    slug: 'informe-macroeconomico-mayo-2026',
    titulo: 'Informe Macroeconómico · Mayo 2026',
    edicion: 'Edición N°1',
    mes: 'Mayo 2026',
    fecha: '2026-05-22',
    descripcion:
      'Análisis de coyuntura argentina de mayo 2026: inflación 2,6% mensual en abril, EMAE +5,5% i.a., superávit comercial récord de USD 2.711M y reservas brutas en USD 44.516M. Proyecciones para mayo–octubre 2026.',
    tags: ['Inflación', 'EMAE', 'Balanza Comercial', 'Reservas', 'Fiscal', 'Proyecciones'],
    docxPath: '/informes/informe-macrolibre-mayo-2026.docx',
    kpis: [
      { valor: '2,6%',         etiqueta: 'IPC Abril 2026',       sublabel: 'variación mensual' },
      { valor: '+5,5%',        etiqueta: 'EMAE Marzo i.a.',      sublabel: 'interanual' },
      { valor: 'USD 2.711M',   etiqueta: 'Superávit Comercial',  sublabel: 'abril 2026 · récord' },
      { valor: 'USD 44.516M',  etiqueta: 'Reservas BCRA',        sublabel: 'al 30/04/2026' },
      { valor: '$632.844M',    etiqueta: 'Superávit Primario',   sublabel: 'abril 2026' },
      { valor: '$1.381,4',     etiqueta: 'TC Oficial Prom.',     sublabel: 'promedio abril' },
    ],
    secciones: [
      {
        id: 'resumen',
        titulo: 'Resumen Ejecutivo',
        contenido: `
          <p>Abril de 2026 dejó una combinación macroeconómica favorable: desaceleración de la inflación, recuperación de la actividad y fortalecimiento del sector externo. El IPC general se ubicó en 2,6% mensual, el EMAE de marzo mostró una suba interanual de 5,5% y el superávit comercial de abril alcanzó USD 2.711 millones, el mayor para ese mes. Al mismo tiempo, las reservas brutas del BCRA cerraron en USD 44.516 millones y el sector público nacional registró un superávit primario de $632.844 millones.</p>
          <p>La combinación de menor inflación mensual, recuperación del nivel de actividad y mejora de las cuentas externas sugiere un escenario de mayor orden macroeconómico relativo respecto de los meses previos. Sin embargo, buena parte de esta mejora todavía depende de factores que deberán consolidarse en el corto plazo, entre ellos la continuidad de la disciplina fiscal, la estabilidad del esquema cambiario y la capacidad de sostener la desaceleración inflacionaria sin interrumpir la recuperación.</p>
          <p>Para el trimestre mayo–julio de 2026, el escenario base contempla una inflación mensual en torno al 2,0%–2,4%, un tipo de cambio mayorista estable dentro de la banda de flotación y exportaciones sostenidas por encima de USD 8.000 millones mensuales, impulsadas por la cosecha gruesa y el aporte del sector energético.</p>
        `,
      },
      {
        id: 'actividad',
        titulo: '1. Actividad Económica',
        contenido: `
          <p>La actividad económica mostró en marzo una señal de recuperación más clara que en los meses previos, con mejoras tanto en la comparación mensual desestacionalizada como en la variación interanual. El dato sugiere que, luego de un inicio de año todavía heterogéneo, la economía comenzó a apoyarse con mayor fuerza en sectores vinculados al agro, la energía y la industria.</p>
          <h4>EMAE — Marzo 2026</h4>
          <ul>
            <li><strong>Variación mensual desestacionalizada:</strong> +3,5% — revirtió la caída de 2,1% de febrero</li>
            <li><strong>Variación interanual:</strong> +5,5% (mayor ritmo del año)</li>
            <li><strong>Acumulado 1T26:</strong> +1,7% interanual · Nuevo máximo histórico desestacionalizado</li>
          </ul>
          <h4>Sectores con mayor incidencia positiva</h4>
          <ul>
            <li>Agricultura, ganadería y silvicultura: +17,9% i.a.</li>
            <li>Explotación de minas y canteras: +16,3% i.a. (Vaca Muerta)</li>
            <li>Intermediación financiera: +8,8% i.a.</li>
            <li>Construcción: +7,6% i.a.</li>
            <li>Industria manufacturera: +4,6% i.a.</li>
            <li>Administración pública: -1,2% i.a. (único sector negativo)</li>
          </ul>
          <h4>Proyección PBI Real</h4>
          <table>
            <thead><tr><th>Período</th><th>Var. trim. desest. estimada</th><th>Supuesto clave</th></tr></thead>
            <tbody>
              <tr><td>Q2 2026</td><td>+1,0% a +1,5%</td><td>Consumo con recuperación gradual</td></tr>
              <tr><td>Q3 2026</td><td>+0,8% a +1,2%</td><td>Estacionalidad energética favorable</td></tr>
              <tr><td>Q4 2026</td><td>+0,5% a +1,0%</td><td>Sujeto a política monetaria y TC</td></tr>
              <tr><td>Promedio 2026</td><td>+4,5% a +5,0%</td><td>Escenario base sin shocks externos</td></tr>
            </tbody>
          </table>
        `,
        imagen: '/informes/images/mayo2026-emae.png',
        imagenAlt: 'EMAE — Variación interanual marzo 2026',
      },
      {
        id: 'inflacion',
        titulo: '2. Precios — Inflación',
        contenido: `
          <p>La inflación de abril confirmó una nueva desaceleración del nivel general, en línea con la tendencia observada durante el primer cuatrimestre. El dato resulta especialmente relevante porque combina una baja de los componentes estacionales con una moderación adicional del IPC núcleo.</p>
          <h4>IPC Abril 2026 — INDEC (publicado 14/05/2026)</h4>
          <ul>
            <li><strong>IPC Nivel General:</strong> 2,6% mensual | 32,4% interanual | Acumulado 2026: 12,3%</li>
            <li><strong>IPC Núcleo:</strong> 2,3% mensual — mínimo desde octubre 2025</li>
            <li><strong>Regulados:</strong> 4,7% mensual — principal driver del mes</li>
            <li><strong>Estacionales:</strong> 0,0% mensual</li>
            <li><strong>IPIM (Mayorista):</strong> 5,2% mensual — duplicó al IPC minorista</li>
          </ul>
          <h4>Divisiones con mayor incidencia</h4>
          <ul>
            <li>Transporte: +4,4% (combustibles y transporte público AMBA)</li>
            <li>Educación: +4,2%</li>
            <li>Comunicación: +4,1%</li>
            <li>Vivienda, agua, electricidad y gas: +3,5%</li>
            <li>Alimentos y bebidas: +1,5%</li>
          </ul>
          <h4>Proyección IPC Mensual — Escenario Base</h4>
          <table>
            <thead><tr><th>Mes</th><th>IPC General</th><th>IPC Núcleo</th><th>Factor determinante</th></tr></thead>
            <tbody>
              <tr><td>Mayo 2026</td><td>2,0% - 2,4%</td><td>1,9% - 2,2%</td><td>Moderación tarifaria; costos estables</td></tr>
              <tr><td>Junio 2026</td><td>1,9% - 2,3%</td><td>1,8% - 2,1%</td><td>Estacionalidad favorable</td></tr>
              <tr><td>Julio 2026</td><td>2,0% - 2,5%</td><td>1,9% - 2,3%</td><td>Posibles aumentos regulados</td></tr>
              <tr><td>Agosto 2026</td><td>2,1% - 2,6%</td><td>2,0% - 2,4%</td><td>Paritarias sector privado</td></tr>
              <tr><td>Sep. 2026</td><td>2,0% - 2,5%</td><td>1,9% - 2,3%</td><td>Consolidación desinflación</td></tr>
              <tr><td>Oct. 2026</td><td>1,9% - 2,3%</td><td>1,8% - 2,2%</td><td>Sin shocks externos</td></tr>
            </tbody>
          </table>
          <p><em>Acumulado proyectado 12 meses (mayo 2026 - abril 2027): 26% - 30%.</em></p>
        `,
        imagen: '/informes/images/mayo2026-inflacion.png',
        imagenAlt: 'IPC mensual — evolución y proyección 2026',
      },
      {
        id: 'monetario-cambiario',
        titulo: '3. Sector Monetario y Cambiario',
        contenido: `
          <p>Durante abril, el frente monetario y cambiario mantuvo una dinámica relativamente estable, con continuidad de la apreciación nominal del tipo de cambio oficial, acumulación de reservas y ausencia de tensiones disruptivas dentro del esquema de banda.</p>
          <h4>Tipo de Cambio — Abril 2026</h4>
          <ul>
            <li><strong>TC oficial promedio:</strong> $1.381,4 / USD (-1,0% mensual)</li>
            <li><strong>TC cierre 30/04/2026:</strong> $1.381,1 / USD</li>
            <li><strong>Variación acumulada 2026:</strong> -4,5% nominal (apreciación real significativa)</li>
            <li><strong>Banda de flotación — techo:</strong> ~$1.700 / USD (brecha del 23% al cierre de abril)</li>
          </ul>
          <h4>Reservas Internacionales</h4>
          <ul>
            <li>Reservas brutas al 30/04/2026: USD 44.516 M (+USD 2.464 M en el mes)</li>
            <li>Compras BCRA en MLC abril: USD 2.770 M (mayor monto mensual de 2026)</li>
            <li>Compras acumuladas al 21/05: USD 8.800 M — 92 jornadas consecutivas positivas</li>
            <li>Segunda revisión FMI aprobada (21/05): desembolso USD 1.000 M adicionales</li>
          </ul>
          <h4>Proyección Cambiaria y Monetaria</h4>
          <table>
            <thead><tr><th>Período</th><th>TC mayorista (cierre)</th><th>Dirección tasa</th></tr></thead>
            <tbody>
              <tr><td>Mayo 2026</td><td>$1.380 - $1.400</td><td>Estable / leve baja</td></tr>
              <tr><td>Junio 2026</td><td>$1.390 - $1.420</td><td>Estable</td></tr>
              <tr><td>Julio 2026</td><td>$1.400 - $1.440</td><td>Estable / leve suba</td></tr>
              <tr><td>Dic. 2026</td><td>$1.550 - $1.650</td><td>Convergencia gradual</td></tr>
            </tbody>
          </table>
        `,
        imagen: '/informes/images/mayo2026-reservas.png',
        imagenAlt: 'Reservas BCRA — evolución abril 2026',
      },
      {
        id: 'sector-externo',
        titulo: '4. Sector Externo',
        contenido: `
          <p>El sector externo volvió a ser uno de los principales puntos de apoyo de la macroeconomía argentina durante abril. El fuerte crecimiento de las exportaciones, combinado con importaciones todavía contenidas, permitió sostener un superávit comercial elevado y reforzar el proceso de acumulación de reservas.</p>
          <h4>Balanza Comercial — Abril 2026</h4>
          <ul>
            <li><strong>Exportaciones FOB:</strong> USD 8.914 M — récord histórico nominal (+33,6% i.a.)</li>
            <li><strong>Importaciones CIF:</strong> USD 6.204 M (-4,0% i.a.)</li>
            <li><strong>Superávit comercial:</strong> USD 2.711 M — récord para un mes de abril (29° mes consecutivo)</li>
            <li><strong>Términos del intercambio:</strong> Índice 149,5 (+6,5% i.a.) — ganancia de USD 520 M</li>
          </ul>
          <h4>Exportaciones por rubro — Abril 2026</h4>
          <ul>
            <li>MOI (Manufacturas de Origen Industrial): USD 2.528 M (+43,3% i.a.) — máximo desde nov. 2012</li>
            <li>Productos primarios: USD 2.127 M (+25% i.a.)</li>
            <li>Combustibles y energía: USD 1.554 M (+85,9% i.a.) — récord histórico del sector</li>
            <li>Acumulado cuatrimestre: exportaciones USD 30.820 M (+21,5%); superávit USD 8.277 M</li>
          </ul>
          <h4>Proyección Comercio Exterior</h4>
          <table>
            <thead><tr><th>Mes</th><th>Export. FOB</th><th>Import. CIF</th><th>Saldo estimado</th></tr></thead>
            <tbody>
              <tr><td>Mayo 2026</td><td>USD 7.800 - 8.400 M</td><td>USD 6.200 - 6.600 M</td><td>USD 1.600 - 1.800 M</td></tr>
              <tr><td>Junio 2026</td><td>USD 7.500 - 8.200 M</td><td>USD 6.300 - 6.700 M</td><td>USD 1.200 - 1.500 M</td></tr>
              <tr><td>Julio 2026</td><td>USD 7.200 - 7.800 M</td><td>USD 6.400 - 6.800 M</td><td>USD 800 - 1.400 M</td></tr>
            </tbody>
          </table>
        `,
        imagen: '/informes/images/mayo2026-balanza.png',
        imagenAlt: 'Balanza comercial — exportaciones e importaciones abril 2026',
      },
      {
        id: 'fiscal',
        titulo: '5. Sector Fiscal',
        contenido: `
          <p>El resultado fiscal de abril volvió a mostrar superávit primario y financiero, prolongando una secuencia que sigue siendo central dentro del programa económico actual.</p>
          <h4>Resultado SPNF — Abril 2026</h4>
          <ul>
            <li><strong>Superávit primario:</strong> $632.844 M — 4° mes consecutivo en verde</li>
            <li><strong>Superávit financiero:</strong> $268.103 M (tras pago de intereses $364.741 M)</li>
            <li><strong>Ingresos SPN:</strong> $13.411.787 M (+29,6% i.a. nominal / -2,1% real)</li>
            <li><strong>Gastos primarios:</strong> $12.778.943 M (+34,5% i.a. nominal)</li>
            <li><strong>Acumulado en % PBI:</strong> ~0,5% del PBI (meta FMI 2026: 1,4% del PBI)</li>
            <li>26 de los últimos 28 meses con superávit primario</li>
            <li>Segunda revisión FMI aprobada; próximo desembolso: USD 1.000 M</li>
          </ul>
          <p>Para cumplir la meta de 1,4% del PBI acordada con el FMI, el Gobierno necesita acumular ~0,9 p.p. adicionales en los próximos 8 meses. La caída real de ingresos (retenciones y recaudación tributaria) representa el principal riesgo fiscal de corto plazo.</p>
        `,
        imagen: '/informes/images/mayo2026-fiscal.png',
        imagenAlt: 'Resultado fiscal SPNF — evolución 2026',
      },
      {
        id: 'proyecciones',
        titulo: '6. Cuadro de Proyecciones Consolidado',
        contenido: `
          <p>El cuadro siguiente sintetiza las principales proyecciones del Equipo MacroLibre para los horizontes más relevantes. Los valores se presentan como rangos para reflejar la incertidumbre propia del contexto macroeconómico argentino.</p>
          <table>
            <thead>
              <tr><th>Variable</th><th>Unidad</th><th>M+1 (mayo)</th><th>M+3 (jul.)</th><th>M+6 (oct.)</th><th>Año 2026</th><th>Año 2027</th></tr>
            </thead>
            <tbody>
              <tr><td>IPC General</td><td>% mensual</td><td>2,0–2,4</td><td>2,0–2,5</td><td>1,9–2,3</td><td>27–30% ac.</td><td>18–22% ac.</td></tr>
              <tr><td>IPC Núcleo</td><td>% mensual</td><td>1,9–2,2</td><td>1,9–2,3</td><td>1,8–2,2</td><td>26–28% ac.</td><td>17–20% ac.</td></tr>
              <tr><td>TC Mayorista</td><td>$/USD cierre</td><td>1.380–1.400</td><td>1.400–1.440</td><td>1.470–1.530</td><td>1.550–1.650</td><td>n/d</td></tr>
              <tr><td>PBI Real</td><td>% trim. desest.</td><td>+1,0–1,5</td><td>+0,8–1,2</td><td>+0,5–1,0</td><td>+4,5–5,0</td><td>+3,0–4,0</td></tr>
              <tr><td>Res. Primario</td><td>% del PBI</td><td>—</td><td>—</td><td>—</td><td>1,2–1,5%</td><td>1,3–1,6%</td></tr>
              <tr><td>Desocupación</td><td>% PEA (trim.)</td><td>—</td><td>6,5–7,0%</td><td>6,2–6,8%</td><td>6,0–6,5%</td><td>5,8–6,2%</td></tr>
              <tr><td>Export. FOB</td><td>Mill. USD</td><td>7.800–8.400</td><td>7.200–7.800</td><td>6.500–7.200</td><td>~95.000</td><td>—</td></tr>
              <tr><td>Import. CIF</td><td>Mill. USD</td><td>6.200–6.600</td><td>6.400–6.800</td><td>6.500–7.000</td><td>~76.000</td><td>—</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        id: 'metodologia',
        titulo: '7. Metodología y Fuentes',
        contenido: `
          <p>Las proyecciones del Equipo MacroLibre se elaboran a partir de datos oficiales procesados a través de la plataforma MacroLibre.com. El proceso combina: (i) análisis de tendencia histórica de series de al menos 6 meses; (ii) identificación de factores de desvío previsibles; (iii) modelos de series de tiempo cuando la extensión de la serie lo permite; y (iv) juicio técnico del equipo para calibrar rangos de incertidumbre.</p>
          <h4>Fuentes consultadas</h4>
          <ul>
            <li>INDEC — IPC abril 2026 (publicado 14/05/2026): indec.gob.ar</li>
            <li>INDEC — EMAE marzo 2026 (publicado 21/05/2026): indec.gob.ar</li>
            <li>INDEC — Intercambio Comercial Argentino abril 2026 (publicado 20/05/2026): indec.gob.ar</li>
            <li>BCRA — Informe Monetario Mensual abril 2026: bcra.gob.ar</li>
            <li>Ministerio de Economía — Resultado fiscal SPNF abril 2026: economia.gob.ar</li>
            <li>FMI — Segunda revisión del acuerdo EFF (aprobado 21/05/2026): imf.org</li>
            <li>MacroLibre.com — Dashboard de indicadores en tiempo real: macrolibre.com</li>
          </ul>
          <p><em>Este informe es elaborado con fines de análisis y divulgación. No constituye asesoramiento de inversión.</em></p>
        `,
      },
    ],
  },
];
