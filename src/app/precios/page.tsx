import { redirect } from 'next/navigation';

// La ruta /precios fue renombrada a /inflacion para liberar /precios
// para planes de suscripción futuros. Este redirect mantiene vivos
// los links viejos.
export default function PreciosRedirect() {
  redirect('/inflacion');
}
