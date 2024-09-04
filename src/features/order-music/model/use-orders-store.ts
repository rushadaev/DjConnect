import { defineStore } from 'pinia'
import { ref } from 'vue'
// import type { User } from '@/entities/session/model/types'
// import { twa } from '@/shared/lib/api/twa'
import useApi from '@/shared/lib/api/use-api'
import { Order } from './order'

const useOrdersStore = defineStore('orders', () => {
    const orders = ref<Order[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const message = ref<string | null>(null)
    const price = ref<number | null>(null)
    async function setMessage(msg: string) {
        message.value = msg
    }
    async function setPrice(prc: number) {
        price.value = prc
    }

    async function fetchOrders() {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: apiError, execute } = useApi<Order[]>('get', '/user/orders')
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to fetch orders')
            orders.value = data.value
            console.log({ orderList: data.value })
            return data.value
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    async function acceptOrder(orderId: number, price: number, message?: string) {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: apiError, execute } = useApi<Order>('patch', `/orders/${orderId}/accept`,{
  'price': price,
  'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  'message': message
})
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to accept order')
            orders.value = orders.value.map(order => {
                if (order.id === data?.value?.id) {
                    return data.value
                }
                return order
            })
            return data.value
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    async function updateTime(orderId: number, time: string) {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: apiError, execute } = useApi<Order>('patch', `/orders/${orderId}/time`,{
    'time_slot': time
})
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to update time')
            orders.value = orders.value.map(order => {
                if (order.id === data?.value?.id) {
                    return data.value
                }
                return order
            })
            return data.value
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    async function declineOrder(orderId: number) {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: apiError, execute } = useApi<Order>('patch', `/orders/${orderId}/decline`,{
    'message': message
})
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to decline order')
            orders.value = orders.value.map(order => {
                if (order.id === data?.value?.id) {
                    return data.value
                }
                return order
            })
            return data.value
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }

    async function cancelOrder(orderId: number) {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: apiError, execute } = useApi<Order>('patch', `/orders/${orderId}/cancel`,{
    'message': message
})
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to cancel order')
            orders.value = orders.value.map(order => {
                if (order.id === data?.value?.id) {
                    return data.value
                }
                return order
            })
            return data.value
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isLoading.value = false
        }
    }
    // /orders/{order_id}/accept Accept an order
    // /orders/{order_id}/decline Reject an order
    // /orders/{order_id}/cancel cancel an order

    return { orders, isLoading, error, fetchOrders, acceptOrder, cancelOrder, declineOrder, setMessage, setPrice, updateTime }
})

export { useOrdersStore }