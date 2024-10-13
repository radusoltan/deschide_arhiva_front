
import ExampleClientComponent from "@/components/ExampleClientComponent";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import LanguageChanger from "@/components/LanguageChanger";
const i18nNamespaces = ['home'];
const Home = async ({params: {locale}})=>{

  const {t, resources} = await initTranslations(locale,i18nNamespaces)

  return <TranslationsProvider
    locale={locale}
    resources={resources}
    namespaces={i18nNamespaces}
  >
    <main></main>
  </TranslationsProvider>
}

export default Home;
