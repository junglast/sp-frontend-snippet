import { useRouter } from "next/router"

const useQueryString = (key: string): string => {
  const router = useRouter()

  if (!router.isReady) return ""

  const itemInQuery = router.query[key]

  if (!itemInQuery) return ""

  return Array.isArray(itemInQuery) ? itemInQuery[0] : itemInQuery
}

export default useQueryString
