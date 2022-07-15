import API_URL from "constants/api"
import baseAPI from "./base"
import { Product, ProductComment, ProductCommentVariable } from "types/product"
import type { AxiosError } from "axios"
import { useMutation, useQuery } from "react-query"
import { ApiErrorResponse, ApiResponse } from "types/common"

export const getProductDetail = (productId: string) => baseAPI.get<Product>(`${API_URL.PRODUCT}/${productId}`)

export const useProductDetailQuery = (productId: string) =>
  useQuery<ApiResponse<Product>, AxiosError<ApiErrorResponse>>(["product", productId], () =>
    getProductDetail(productId)
  )

export const getProductComment = (productId: string) =>
  baseAPI.get<ProductComment[]>(`${API_URL.PRODUCT}/${productId}${API_URL.PRODUCT_COMMENT}`)

export const useProductCommentQuery = (productId: string) =>
  useQuery<ApiResponse<ProductComment[]>, AxiosError<ApiErrorResponse>>(["product", productId, "comment"], () =>
    getProductComment(productId)
  )

export const postProductComment = (productId, commentData) =>
  baseAPI.post(`${API_URL.PRODUCT}/${productId}${API_URL.PRODUCT_COMMENT}`, commentData)

export const useProductCommentMutation = () =>
  useMutation<ApiResponse<unknown>, AxiosError<ApiErrorResponse>, ProductCommentVariable>((variable) =>
    postProductComment(variable.productId, variable.commentData)
  )
