import {client} from "@/lib/elastic";
import Link from "next/link";
import moment from "moment";
const i18nNamespaces = ['home'];
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Pagination from "@/components/Pagination";
const search = async (query, page, size, locale)=>{

  const from = (page-1) * size

  const response = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          { match: { "locale": locale } },
          { multi_match: {
              query,
              fields: ["title^5", "lead", "body"],
              type: "phrase"
            }
          }
        ]
      },

    },
    size,
    from,
    sort: [
      { 'published': { "order": "desc", format: "strict_date_optional_time_nanos" } },
    ]
  })

  return {
    results: response.hits.hits,
    total: response.hits.total.value,
  }

}

const SearchPage = async ({searchParams, params: {locale}})=>{
  moment.locale(locale)
  let {query, page, size} = searchParams

  if (!page || !size) {
    page = 1;
    size = 10;
  }

  const {results, total} = await search(query, page, size, locale)
  console.log(total)

  const {resources} = await initTranslations(locale,i18nNamespaces)

  return <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
  >
    <div className="container mx-auto">
    {
      results.map(res=><div key={res._id} className="mt-6 border-t border-gray-100">{
        <article
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-5 text-gray-500">
                  <Link href={`/${locale}/${res._source.category.slug}/${res._id}/${res._source.slug}`}><span
                      className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      {res._source.category.title}
                  </span></Link>
            <span className="text-sm">{
              moment(res._source.published).fromNow()
            }</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{res._source.title}</a></h2>
          {/*<p className="mb-5 font-light text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: res._source.lead ? res._source.lead.substring(0,150) : res._source.body.substring(0,150) }} />*/}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-medium dark:text-white"> {res._source.authors[0].name}</span>
            </div>
            <Link href={`/${locale}/${res._source.category.slug}/${res._id}/${res._source.slug}`}
               className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
              Read more
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </article>
      }</div>)
    }
    <div className="my-5"></div>
      {
        total >= size &&  <Pagination
              total={total}
              size={size}
              page={page}
          />
      }

  </div>
  </TranslationsProvider>
}

export default SearchPage