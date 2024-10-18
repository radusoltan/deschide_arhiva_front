import {NextResponse} from "next/server";
import {client} from "@/lib/elastic";

export async function GET(request, { params: {locale} }) {



  const url = new URL(request.url)
  const page = Number(url.searchParams.get("page"));
  const size = Number(url.searchParams.get("size"));

  const from = (page-1) * size

  const response = await client.search({
    index: 'articles',
    query: {
      bool: {
        must: [
          { match: { "locale": locale } },
        ]
      }
    },
    size,
    from,
    sort: [
      { 'published': { "order": "desc", format: "strict_date_optional_time_nanos" } },
    ]
  })

  return NextResponse.json({
    articles: response.hits.hits,
    total: response.hits.total.value,
  })
}