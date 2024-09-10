import { type StatusVariable } from '../../components/Status'

export function getStatusText(
	status: string,
	is_paid: boolean
): { statusText: string; statusColor: StatusVariable } {
	let statusText, statusColor
	//status text for order if it is paid and status is pending, accepted, declined, price_changed
	switch (status) {
		case 'pending':
			statusText = 'ожидаем'
			statusColor = 'orange' as StatusVariable
			break
		case 'accepted':
			statusText = 'ждем оплату'
			statusColor = 'blue' as StatusVariable
			if (is_paid) {
				statusText = 'оплачен'
				statusColor = 'green' as StatusVariable
			}
			break
		case 'declined':
			statusText = 'отменен'
			statusColor = 'red' as StatusVariable
			break
		case 'price_changed':
			statusText = 'новая цена'
			statusColor = 'orange' as StatusVariable
			if (is_paid) {
				statusText = 'оплачен'
				statusColor = 'green' as StatusVariable
			}
			break
		case 'completed':
			statusText = 'завершен'
			statusColor = 'grey' as StatusVariable
			break
		default:
			statusText = 'отменен'
			statusColor = 'red' as StatusVariable
			break
	}
	return { statusText, statusColor }
}
