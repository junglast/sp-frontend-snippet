export interface Product {
  productId: string
  productSubId?: string
  productName: string
  productSubname?: string
  manufacturer?: string
  brand?: string
  series?: string
  marketingPhrase?: string
  category?: ProductCategory
  flavor?: ProductFlavor
  texture?: string
  imageUrl?: string
  thumbnailImageUrl?: string
  createdDatetime?: string
  updatedDatetime?: string
}

export interface ProductCategory {
  generalType: string
  specificType: string[]
}

export interface ProductFlavor {
  mainFlavor?: string
  subFlavor?: string
}

export interface ProductComment {
  commentId: number
  userId: number
  nickname: string
  productId: string
  text: string
  createdDatetime: string
}

export interface ProductCommentVariable {
  productId: string
  commentData: {
    text: string
  }
}
