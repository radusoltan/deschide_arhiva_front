import {client} from "@/lib/elastic";

export default async function sitemap() {
  const urls = [
    {
      url: process.env.NEXT_PUBLIC_APP_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_APP_URL+'en',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_APP_URL+'ru',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    }
  ]

  let response = await client.search({
    index: 'articles',
    // keep the search results "scrollable" for 30 seconds
    scroll: '30s',
    // for the sake of this example, we will get only one result per search
    size: 10000,
    // filter the source to only include the quote field
    _source: ['slug','category','published', 'locale'],
    query: {
      match_all: {}
    }
  })

  while(response.hits.hits.length){
    response.hits.hits.forEach(article=>{
      article._source.locale !== 'ro' ?
      urls.push({
        url: `${process.env.NEXT_PUBLIC_APP_URL}${article._source.locale}/${article._source.category.slug}/${article._source.slug}`,
        lastModified: article._source.published
      }) :
      urls.push({
        url: `${process.env.NEXT_PUBLIC_APP_URL}${article._source.category.slug}/${article._id}/${article._source.slug}`,
        lastModified: article._source.published
      })
    })
    response = await client.scroll({
      scroll: '30s',
      scroll_id: response._scroll_id
    })
  }
  return urls
}