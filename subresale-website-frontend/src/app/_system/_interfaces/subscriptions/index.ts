export interface SubscriptionsRequest {
  title: string,
  category: string,
  pricePerMonth: number,
  expiresAt: string,
  image: string,
  description: string
}

export interface SubscriptionsResponse {
  id: string,
  title: string,
  category: string,
  pricePerMonth: number,
  expiresAt: string,
  image: string,
  description: string
}
