import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ['home'];
const CategoryPage = async ({params: {locale}, searchParams})=>{
  const {t, resources} = await initTranslations(locale, i18nNamespaces)
  return <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
  >Category Page</TranslationsProvider>
}

export default CategoryPage