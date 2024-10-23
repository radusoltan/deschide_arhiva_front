import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
const i18nNamespace = ['home']
const ContentPage = async ({params: {locale}})=>{
  const {resources} = await initTranslations(locale, i18nNamespace)
  return <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespace}
  >
    <>CONTENT PAGE</>
  </TranslationsProvider>
}

export default ContentPage