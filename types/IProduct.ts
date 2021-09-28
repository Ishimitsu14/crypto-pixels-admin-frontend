export type IProductStat = {
  name: string
  value: string
}

export type IProductAttribute = {
  // eslint-disable-next-line camelcase
  trait_type: string;
  value: string;
}

export type IProductMetaData = {
  name: string;
  description: string;
  image: string;
  attributes: IProductAttribute[];
  // eslint-disable-next-line camelcase
  external_url?: string;
}

export type IProductRarity = {
  id: string
  name: string
  children: IProductRarity[]
}

export type IProduct = {
  id: number
  uuid: string
  image?: string
  gif?: string
  hash: string
  metaData: IProductMetaData
  attributes: IProductAttribute[]
  stats: IProductStat[]
  status: number
  createdAt: string
  updatedAt: string
  soldAt: string
}
