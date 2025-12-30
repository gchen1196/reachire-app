import { apiClient } from './client'

export interface CheckoutRequest {
  planId?: string
  tokenPack?: string
}

export interface CheckoutResponse {
  checkoutUrl: string
}

export interface PortalResponse {
  portalUrl: string
}

export async function createCheckoutSession(request: CheckoutRequest): Promise<CheckoutResponse> {
  const response = await apiClient.post<CheckoutResponse>('/api/payments/checkout', request)
  return response.data
}

export async function createPortalSession(returnUrl?: string): Promise<PortalResponse> {
  const response = await apiClient.post<PortalResponse>('/api/payments/portal', { returnUrl })
  return response.data
}
