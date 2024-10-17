
import i18nConfig from "@/i18nConfig";
import Header from "@/components/Header";


export async function generateStaticParams(){

  return i18nConfig.locales.map(locale=>({locale}))

}

const HomePageLayout = async ({children, params: {locale}}) => {



  return <>
    <Header />
    {children}
  </>
}

export default HomePageLayout