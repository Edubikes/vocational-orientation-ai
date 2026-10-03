import type { Metadata } from 'next';
import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad · Descifra',
  description: 'Aviso de Privacidad Integral conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  robots: { index: true, follow: true },
};

/*
 * BORRADOR publicado. Requiere revisión de un abogado antes de considerarse
 * definitivo. Los campos entre corchetes (nombre y domicilio) son marcadores
 * que el responsable debe sustituir; no se inventaron.
 */
const RESPONSABLE = '[NOMBRE DEL RESPONSABLE]';
const DOMICILIO = '[DOMICILIO]';
const CORREO = 'contacto@descifratufuturo.com';
const ACTUALIZACION = '2 de octubre de 2026';

function Ph({ children }: { children: string }) {
  return <mark className="bg-rojo/10 px-1 font-semibold text-rojo">{children}</mark>;
}

function H({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-serif text-[1.35rem] font-semibold leading-tight">
      {n}. {children}
    </h2>
  );
}

export default function AvisoDePrivacidad() {
  return (
    <div className="min-h-[100dvh] bg-papel text-tinta">
      <header className="border-b border-linea px-4 py-3 sm:px-8">
        <BrandLogo />
      </header>
      <main className="mx-auto max-w-2xl px-5 pb-20 pt-10 text-[16px] leading-relaxed [&_li]:mt-1.5 [&_p]:mt-3">
        <p className="!mt-0 text-[14px] text-gris">Última actualización: {ACTUALIZACION}</p>
        <h1 className="mt-2 font-serif text-[2.2rem] font-semibold leading-[1.08]">Aviso de Privacidad Integral</h1>
        <p>
          En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la
          “Ley”), su Reglamento y los Lineamientos del Aviso de Privacidad, se emite el presente Aviso de Privacidad
          respecto de los datos personales recabados a través del sitio web de Descifra (el “Sitio”).
        </p>

        <H n={1}>Identidad y domicilio del responsable</H>
        <p>
          <Ph>{RESPONSABLE}</Ph> (el “Responsable”), con domicilio en <Ph>{DOMICILIO}</Ph>, es responsable del
          tratamiento de sus datos personales. Para cualquier asunto relacionado con este Aviso, puede contactarnos en{' '}
          <a href={`mailto:${CORREO}`} className="font-medium underline underline-offset-2">{CORREO}</a>.
        </p>

        <H n={2}>Datos personales que se recaban</H>
        <p>Para las finalidades descritas en este Aviso, el Responsable recaba los siguientes datos:</p>
        <ul className="list-disc pl-5">
          <li>Respuestas al cuestionario de 60 preguntas y los resultados calculados a partir de ellas.</li>
          <li>Correo electrónico.</li>
          <li>Nombre, únicamente si usted decide proporcionarlo (es opcional).</li>
          <li>
            Datos técnicos de navegación: dirección IP, tipo de navegador y dispositivo, páginas visitadas y eventos de
            interacción dentro del Sitio, obtenidos mediante cookies y tecnologías similares.
          </li>
        </ul>
        <p>
          El Responsable no solicita datos personales sensibles. Los resultados del cuestionario describen preferencias
          de estilo de pensamiento y no constituyen una evaluación psicológica ni clínica.
        </p>

        <H n={3}>Datos de pago</H>
        <p>
          Los pagos son procesados por Shopify. El Responsable nunca ve ni almacena los datos de su tarjeta. El
          tratamiento de los datos que usted proporcione en el proceso de pago se rige por el aviso y las políticas de
          privacidad de Shopify. El Responsable únicamente recibe la confirmación del pedido y los datos necesarios para
          asociarlo con su reporte.
        </p>

        <H n={4}>Finalidades del tratamiento</H>
        <p>Finalidades primarias, necesarias para el servicio que usted solicita:</p>
        <ol className="list-[lower-alpha] pl-5">
          <li>
            Procesar sus respuestas mediante el algoritmo del Sitio para calcular su perfil, su arquetipo y su ranking de
            carreras.
          </li>
          <li>Generar el reporte en PDF y enviarlo al correo electrónico que usted proporcione.</li>
          <li>Asociar su pago con su reporte y atender aclaraciones, fallas técnicas o reenvíos.</li>
        </ol>
        <p>Finalidad secundaria, no necesaria para el servicio:</p>
        <ol className="list-[lower-alpha] pl-5" start={4}>
          <li>
            Medir y optimizar el desempeño del Sitio y de sus campañas publicitarias mediante métricas de navegación,
            incluido el píxel de Meta (Meta Pixel).
          </li>
        </ol>
        <p>
          Si no desea que sus datos se traten para la finalidad secundaria, puede manifestarlo en cualquier momento
          escribiendo a <a href={`mailto:${CORREO}`} className="font-medium underline underline-offset-2">{CORREO}</a>, así como bloquear o eliminar las cookies desde la configuración de su
          navegador. La negativa no será motivo para negarle el servicio.
        </p>

        <H n={5}>Cookies y tecnologías de rastreo</H>
        <p>
          El Sitio utiliza el almacenamiento local de su navegador para guardar su avance en el cuestionario en su
          propio dispositivo. Asimismo, puede utilizar el píxel de Meta, que registra eventos como la visita a una
          página, el inicio del cuestionario, el registro de correo y el inicio del pago. Meta Platforms trata esa
          información conforme a sus propias políticas. Usted puede deshabilitar estas tecnologías desde la
          configuración de su navegador o de su cuenta de Meta.
        </p>

        <H n={6}>Transferencias y encargados</H>
        <p>
          Para cumplir las finalidades primarias, sus datos son tratados por proveedores que actúan como encargados por
          cuenta del Responsable: servicios de alojamiento y base de datos en la nube, servicio de envío de correo
          electrónico y plataforma de pago (Shopify). Algunos de estos proveedores pueden ubicarse fuera de México. El
          Responsable no vende ni cede sus datos personales a terceros para fines propios de éstos. Las transferencias
          que, en su caso, se realicen se limitarán a las previstas en el artículo 37 de la Ley o a las que requieran
          su consentimiento conforme a la misma.
        </p>

        <H n={7}>Derechos ARCO</H>
        <p>
          Usted tiene derecho a conocer qué datos personales tenemos de usted y para qué los utilizamos (Acceso);
          solicitar su corrección si están desactualizados, son inexactos o incompletos (Rectificación); que los
          eliminemos de nuestros registros cuando considere que no se requieren para las finalidades señaladas
          (Cancelación); y oponerse a su uso para fines específicos (Oposición).
        </p>
        <p>Para ejercerlos, envíe una solicitud a <a href={`mailto:${CORREO}`} className="font-medium underline underline-offset-2">{CORREO}</a> que contenga:</p>
        <ul className="list-disc pl-5">
          <li>Su nombre y el correo electrónico con el que utilizó el Sitio, para comunicarle la respuesta.</li>
          <li>Documento que acredite su identidad o, en su caso, la representación legal.</li>
          <li>La descripción clara y precisa de los datos y del derecho que desea ejercer.</li>
          <li>Cualquier elemento que facilite la localización de sus datos.</li>
        </ul>
        <p>
          El Responsable comunicará la determinación adoptada en un plazo máximo de 20 días hábiles contados desde la
          recepción de la solicitud y, de resultar procedente, la hará efectiva dentro de los 15 días hábiles
          siguientes, conforme a los plazos de la Ley.
        </p>

        <H n={8}>Revocación del consentimiento y limitación del uso</H>
        <p>
          Usted puede revocar su consentimiento para el tratamiento de sus datos, o limitar su uso o divulgación,
          mediante solicitud a <a href={`mailto:${CORREO}`} className="font-medium underline underline-offset-2">{CORREO}</a> en los términos del apartado anterior. La revocación no tendrá efectos
          retroactivos y, en algunos casos, podría impedir que el Responsable le preste el servicio.
        </p>

        <H n={9}>Menores de edad</H>
        <p>
          El Sitio está dirigido a estudiantes que eligen carrera, por lo que algunos usuarios pueden ser menores de
          edad. Si usted es menor de 18 años, le pedimos que utilice el Sitio con conocimiento de su madre, padre o
          tutor. Quien ejerza la patria potestad o tutela puede ejercer los derechos ARCO en representación del menor.
        </p>

        <H n={10}>Conservación y seguridad</H>
        <p>
          Sus datos se conservarán sólo durante el tiempo necesario para cumplir las finalidades descritas y las
          obligaciones legales aplicables. El Responsable adopta medidas de seguridad administrativas, técnicas y
          físicas razonables para proteger sus datos contra daño, pérdida, alteración, destrucción o uso, acceso o
          tratamiento no autorizado.
        </p>

        <H n={11}>Cambios al Aviso de Privacidad</H>
        <p>
          Cualquier modificación a este Aviso se publicará en esta misma página, indicando la fecha de su última
          actualización.
        </p>

        <H n={12}>Autoridad</H>
        <p>
          Si considera que su derecho a la protección de datos personales ha sido vulnerado, puede acudir ante la
          autoridad competente en materia de protección de datos personales.
        </p>

        <p className="!mt-12 border-t border-linea pt-5 text-[14px] text-gris">
          <Link href="/" className="underline underline-offset-2">Volver al inicio</Link>
        </p>
      </main>
    </div>
  );
}
