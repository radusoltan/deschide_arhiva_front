
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import {client} from "@/lib/elastic";
import Link from "next/link";
import Pagination from "@/components/Pagination";
const i18nNamespaces = ['home'];


const getArticles = async (locale, page, size)=>{

  const from = (Number(page)) * Number(size)

  const response = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          { match: { "locale": locale} }
        ]
      }
    },
    size,
    from,
    sort: [
      { "published": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
    ]
  })

  return {
    articles: response.hits.hits,
    total: response.hits.total,
  }
}

const Home = async ({params: {locale}, searchParams})=>{

  let {page, size} = searchParams;


  if (!page || !size) {
    page = 1;
    size = 10;
  }

  const {articles, total} = await getArticles(locale, page, size);



  const {t, resources} = await initTranslations(locale,i18nNamespaces)

  return <TranslationsProvider
    locale={locale}
    resources={resources}
    namespaces={i18nNamespaces}
  >
    <main>
      <div className="bg-gray-50 py-6">
        <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
          <div className="flex flex-row flex-wrap">
            <div className="flex flex-row flex-wrap -mx-3">

              {articles.map((article)=>(<div key={article._id} className="flex w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-300">
                <div className="flex flex-row sm:block">
                  <div className="py-0 sm:py-3 pl-3 sm:pl-0">
                    <h3 className="text-lg font-bold leading-tight mb-2">
                      <Link href={`/${locale}/${article._source.category.slug}/${article._id}/${article._source.slug}`}>{article._source.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>))}
              <Pagination
                  total={total}
                  page={page}
                  size={size}
                  articles={articles}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </TranslationsProvider>
}

export default Home;
