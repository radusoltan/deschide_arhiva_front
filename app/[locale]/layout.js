
import i18nConfig from "@/i18nConfig";
import LanguageChanger from "@/components/LanguageChanger";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";
import ApplicationLogo from "@/components/ApplicationLogo";


export async function generateStaticParams(){

  return i18nConfig.locales.map(locale=>({locale}))

}

const HomePageLayout = async ({children, params: {locale}}) => {



  return <>
    <header className="container mx-auto flex items-center">
      <div className="flex h-auto items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <Link href={`/${locale}`}>
              <ApplicationLogo className="h-8 w-auto"/>
            </Link>

          </div>
          <LanguageChanger/>
          <SearchForm/>
          {/*<PublicNavigation categories={categories} />*/}
        </div>
      </div>
    </header>
    {children}
  </>
}

export default HomePageLayout