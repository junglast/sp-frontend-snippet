import PAGES from "constants/pages"
import Link from "next/link"
import { useEffect, useState } from "react"

const MAX_RECENT_KEYWORDS = 10

const RecentKeywords = () => {
  const [recentKeywordList, setRecentKeywordList] = useState<string[]>([])

  /* 로컬스토리지에서 최근 검색어 가져오기 */
  useEffect(() => {
    const keywordListFromStorage = window.localStorage.getItem("recentKeywords")
    const parsedKeywordList = keywordListFromStorage ? JSON.parse(keywordListFromStorage) : []

    setRecentKeywordList(parsedKeywordList)
  }, [])

  const deleteAllRecentKeywords = () => {
    setRecentKeywordList([])

    if (typeof window === "undefined") return

    window.localStorage.removeItem("recentKeywords")
  }

  const deleteRecentKeyword = (keyword: string) => {
    const updatedKeywordList = recentKeywordList.filter((item) => item !== keyword)

    setRecentKeywordList(updatedKeywordList)

    if (typeof window === "undefined") return

    window.localStorage.setItem("recentKeywords", JSON.stringify(updatedKeywordList))
  }

  return (
    <div className="absolute top-full flex w-full translate-y-px flex-col bg-[#fbfbfb]">
      {recentKeywordList.length ? (
        <>
          <div className="flex h-9 items-center justify-between py-3 px-5">
            <span className="text-sm font-normal">최근 검색</span>
            <span className="text-xs font-normal" onClick={deleteAllRecentKeywords}>
              전체 삭제
            </span>
          </div>

          <ul className="flex-1 list-none overflow-y-auto border-b border-b-gray-200 px-5 pb-2">
            {recentKeywordList.map((item, index) => (
              <li className="flex h-10 w-full items-center" key={index}>
                <img src="/images/search.svg" className="mr-3 h-3 w-3" alt="검색어" />

                <Link href={`${PAGES.SEARCH}/${item}`} passHref>
                  <span className="h-4 flex-1 cursor-pointer text-base leading-none">{item}</span>
                </Link>

                <button
                  className="grid h-4 w-4 place-items-center"
                  onClick={() => {
                    deleteRecentKeyword(item)
                  }}
                >
                  <img src="/images/delete-item.svg" className="m-0 h-[10px] w-[10px]" alt="검색어 삭제" />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex min-h-[158px] w-full flex-1 items-center justify-center border-b border-b-gray-200 bg-[#fbfbfb] text-base">
          최근 검색한 제품이 없어요.
        </div>
      )}

      <div className="flex h-8 w-full justify-end bg-white">
        <span className="h-full py-2 px-5 text-sm font-medium">닫기</span>
      </div>
    </div>
  )
}

export default RecentKeywords
