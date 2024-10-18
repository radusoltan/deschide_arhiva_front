import {NextResponse} from "next/server";

export async function GET(request) {

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'api/categories?locale=en');
  const data = await response.json();

  return NextResponse.json({
    status: 200,
    categories: data.data
  })
}