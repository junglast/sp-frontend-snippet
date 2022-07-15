import React from "react"

interface NoResultProps {
  keyword: string | undefined
}

const NoResult = ({ keyword }: NoResultProps) => {
  return (
    <div className="flex-1 bg-gray-100 pt-2">
      <div className="bg-white py-4 px-5">
        <h3 className="mb-6 text-xl">
          <span className="font-bold text-primary before:content-['\''] after:content-['\'']">{keyword}</span>에 대한
          검색 결과가 없습니다.
        </h3>
        <ul className="list-inside list-disc">
          <li className="mb-1 text-gray-600 marker:text-xs">단어의 철자가 정확한지 확인해 주세요.</li>
          <li className="mb-1 text-gray-600 marker:text-xs">
            검색어의 단어 수를 줄이거나, 다른 검색어로 검색해 보세요.
          </li>
          <li className="mb-1 text-gray-600 marker:text-xs">제품명, 제조사, 맛, 질감 등으로 검색해 보세요.</li>
        </ul>
      </div>
    </div>
  )
}

export default NoResult
