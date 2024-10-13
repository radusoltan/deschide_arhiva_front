import Axios from 'axios'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})

export default axios