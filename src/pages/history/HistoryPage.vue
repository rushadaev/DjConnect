<template>
	<div

		class="px-6 pt-11 h-full min-h-[100vh] overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Список заказов ✨
		</h1>
		<OrderList
			:items="orders"
		/>
	</div>
	<VLoader
		text="🥁 Собираем заказы"
		:is-loading="isLoading"
	/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDJStore } from 'entities/dj'
import { useSessionStore } from 'entities/session'
import { useOrdersStore } from 'features/order-music/model/use-orders-store'
import { storeToRefs } from 'pinia'
import { getStatusText } from '@/shared/utils/helpers'
import { useSocket } from '@/shared/lib/sockets/useSocket'
import OrderList from '@/features/order-music/ui/OrderList.vue'
import { VLoader } from '@/shared/components/Loader/'

// Setup stores
const ordersStore = useOrdersStore()
const djStore = useDJStore()
const sessionStore = useSessionStore()
const { user } = storeToRefs(sessionStore)
const route = useRoute()
const flow = route.params.flow ?? 'user'

// State
const orders = ref<any[]>([])
const { isLoading: loadingOrders } = storeToRefs(ordersStore)
const { isLoading: loadingDj } = storeToRefs(djStore)

// Computed
const isLoading = computed(() => loadingOrders.value || loadingDj.value)

// Functions
const fetchOrdersForDJ = async () => {
	if (!user.value?.dj) return
	const orderList = await djStore.fetchDJOrders(+user.value?.dj?.id)
	orders.value = orderList.map(order => {
		return formatOrder(order, 'dj')
	})
}

const fetchOrdersForUser = async () => {
  const orderList = await ordersStore.fetchOrders()
  if (!orderList) return
  orders.value = orderList.map(order => {
    return formatOrder(order, 'user')
  })
}

// Handle order updates from the WebSocket
const updateOrder = (orderUpdate: any) => {
	const index = orders.value.findIndex(order => order.id === orderUpdate.id)
	const { statusText, statusColor } = getStatusText(orderUpdate.status, orderUpdate.is_paid)
	if (index !== -1) {
		// Update the existing order
		const updatedOrder = {
			...orders.value[index],
			...orderUpdate,
			statusText,
			statusColor
		}
		orders.value[index] = updatedOrder
		console.log('updatedOrder', updatedOrder, orders.value)
	} else {
		const updatedOrder = {
			...orderUpdate,
			statusText,
			statusColor
		}
		// Optionally handle cases where the order doesn't exist in the list yet
		orders.value.push(updatedOrder)
	}
}

// Create a socket connection for each specific order
const subscribeToOrderUpdates = (orderIds: number[]) => {
  // Store the sockets to clean up if needed
  orderIds.map(orderId => {
    const channelName = `order_update_${orderId}`
    const { data } = useSocket(channelName)

    // Watch for changes in the data
    watch(data, (newValue) => {
      if (newValue) {
        updateOrder(newValue.data.order)
      }
    })

    return { channelName, data }
  })

}

const subscribeToOrderCreate = (dj_id: number) => {
	const channelName = `order_created_${dj_id}`
	const { data } = useSocket(channelName)

	console.log('subscribed to', channelName)
	// Watch for changes in the data
	watch(data, (newValue) => {
		if (newValue) {
		const order = newValue.data.order
		const formattedOrder = formatOrder(order, 'dj')
		orders.value.push(formattedOrder)
	}}
)
}

const formatOrder = (order: any, flow: string) => {
  const track = order.track
  const dj = order.dj
  const { statusText, statusColor } = getStatusText(order.status, order.is_paid)
  return {
	id: +order.id,
	photo: '/cabinet_bg.png',
	title: track?.name || '',
	text: dj?.stage_name || '',
	statusColor,
	statusText,
	routeParams: { name: 'review-order', params: { id: +order.id, flow: flow } }
  }
}

// On mounted
onMounted(async () => {
  if (user.value?.is_dj && flow !== 'user') {
    await fetchOrdersForDJ()
	if (user.value.dj)
		subscribeToOrderCreate(user.value.dj.id)
  } else {
    await fetchOrdersForUser()
  }

  // Extract order IDs and subscribe to updates
  const orderIds = orders.value.map(order => order.id)
  subscribeToOrderUpdates(orderIds)
})
</script>

<style scoped>

</style>