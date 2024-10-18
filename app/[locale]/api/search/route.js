import { NextResponse } from 'next/server';
import { client } from '@/lib/elastic';

export async function GET(request, { params: { locale } }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const page = Number(url.searchParams.get('page')) || 1; // Page number
  const size = Number(url.searchParams.get('size')) || 10; // Number of results per page
  const resultsPerPage = size; // Limit results per page

  // Asigură-te că folosești sortarea corectă
  const sort = [
    { 'published': { "order": "desc", format: "strict_date_optional_time_nanos" } },
  ];

  // Obține primele rezultate pentru a calcula `search_after`
  let searchAfter = [];
  let results = [];

  for (let i = 0; i < page; i++) {
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
      size: resultsPerPage,
      sort,
      search_after: searchAfter.length ? searchAfter : undefined, // Folosește search_after dacă există
    });

    // Obține ultimele rezultate pentru a calcula `search_after`
    if (response.hits.hits.length > 0) {
      results = response.hits.hits;
      // Stochează ultimul document pentru a-l folosi în următoarea pagină
      searchAfter = response.hits.hits[response.hits.hits.length - 1].sort;
    } else {
      break; // Ieși din buclă dacă nu mai sunt rezultate
    }
  }

  return NextResponse.json({
    results: results,
    total: response.hits.total.value,
  });
}
