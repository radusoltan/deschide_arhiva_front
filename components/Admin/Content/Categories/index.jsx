"use client"
import {useParams} from "next/navigation";
import {useCategories} from "@/hooks/content/categories";

const CategoriesIndex = ()=>{
  const {locale} = useParams()
  const {categories, isLoading} = useCategories({
    locale,
    page: 1,
  })

  if (isLoading) return <>Loading ...</>

  console.log(categories)

  return <></>
}

export default CategoriesIndex