export type Category = 'Analog' | 'Digital' | 'Smart' | 'Sports' | 'Luxury'

export interface Review {
  id: string
  customerName: string
  customerImage: string
  rating: number
  comment: string
  date: string
}

export interface ManufacturerDetails {
  name: string
  countryOfOrigin: string
  manufacturingDate: string
  materialUsed: string
  contact: string
}

export interface WarrantyInfo {
  periodMonths: number
  coverage: string
  replacementPolicy: string
  serviceCenters: string[]
  claimProcess: string
}

export interface Product {
  id: string
  brand: string
  model: string
  category: Category
  images: string[]
  price: number
  discountPrice?: number
  rating: number
  reviewCount: number
  colors: string[]
  sizes: string[]
  features: string[]
  description: string
  specifications: Record<string, string>
  inStock: boolean
  stockCount: number
  manufacturer: ManufacturerDetails
  warranty: WarrantyInfo
  reviews: Review[]
}

export interface CartItem {
  productId: string
  quantity: number
  color: string
  size: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered'

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  placedOn: string
  total: number
}
