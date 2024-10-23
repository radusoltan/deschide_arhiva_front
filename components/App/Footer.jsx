"use client"
import { useTranslation } from 'react-i18next';
import LoginLinks from "@/components/LoginLinks";
const Footer = ()=> {
  const { t } = useTranslation()

  return <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Deschide.MD™. {t('footer_rights')}.
    </span>
      <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <LoginLinks />
      </div>
    </div>
  </footer>
}

export default Footer