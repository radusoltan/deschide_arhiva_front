"use client"
import ApplicationLogo from "@/components/ApplicationLogo";
import Link from "next/link";
import {useParams} from "next/navigation";
import SearchForm from "@/components/SearchForm";
import LanguageChanger from "@/components/LanguageChanger";

const Header = ()=> {
  const {locale} = useParams()
  return <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href={`/${locale}`}>
        <ApplicationLogo className="h-8" />
      </Link>
      <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
        <LanguageChanger />
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
        <SearchForm />
      </div>
    </div>
  </nav>

}

export default Header