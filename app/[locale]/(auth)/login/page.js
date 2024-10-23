import LoginForm from "@/components/Auth/LoginForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
const i18nNamespaces = ['home'];
const Login = async ({params: {locale}})=>{
  const {resources} = await initTranslations(locale, i18nNamespaces)
  return <TranslationsProvider
    locale={locale}
    resources={resources}
    namespaces={i18nNamespaces}
  >
    <LoginForm />
  </TranslationsProvider>
}

export default Login