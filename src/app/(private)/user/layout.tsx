import type { Metadata } from 'next'
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'FinDash$ - Página de Perfil',
  description: 'Página de perfil'
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}