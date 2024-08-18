import { type StatusVariable } from '../../components/Status'

export function getStatusText(status: string, is_paid: boolean): { statusText: string, statusColor: StatusVariable } {
    let statusText, statusColor
    //status text for order if it is paid and status is pending, accepted, declined, price_changed
    switch (status) {
        case 'pending':
            statusText = 'Ожидание'
            statusColor = 'orange' as StatusVariable
            break
        case 'accepted':
            statusText = 'Принят*'
            if(is_paid){
                statusText = 'Оплачен'
            }
            statusColor = 'green' as StatusVariable
            break
        case 'declined':
            statusText = 'Отклонен'
            statusColor = 'red' as StatusVariable
            break
        case 'price_changed':
            statusText = 'Изменена цена'
            statusColor = 'orange' as StatusVariable
            break
        default:
            statusText = 'Отменен'
            statusColor = 'red' as StatusVariable
            break
    }
    return { statusText, statusColor }
}