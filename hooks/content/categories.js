import useSWR from "swr";
import axios from "@/lib/axios";

export const useCategories = ({locale, page}={})=>{
  const csrf = async () => axios.get('/sanctum/csrf-cookie')

  const {data: categories, error, mutate, isLoading} = useSWR(`/api/categories?locale=${locale}&page=${page}`, async ()=>{

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/admin/categories?page=${page}&locale=${locale}`)
    return response.json();
  })



  return {
    categories,
    isLoading,
  }
}