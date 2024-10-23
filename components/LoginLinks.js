"use client"
import Link from 'next/link'
import {useAuth} from "@/hooks/auth";
import { useTranslation } from 'react-i18next';

const LoginLinks = ()=>{
  const {user} = useAuth({
    middleware: "guest"
  })
  const {t} = useTranslation()
  return <div className="hidden px-6 py-4 sm:block">
    {user ? (
        <Link
            href="/dashboard"
            className="ml-4 text-sm text-gray-700"
        >{t('dashboard')}</Link>
    ):(<>
      <Link
          href="/login"
          className="text-sm text-gray-700"
      >{t('login')}</Link>
    </>)}
  </div>
}

export default LoginLinks