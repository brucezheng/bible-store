import prisma from './PrismaUtils';
import { decodeAddress } from './Utils'

async function saveOrder(data) {
	console.log('saving', 'id', data.orderId,
			'payment', data.paymentId,
			'encodedItems', data.encodedCartItems,
			'cartTotalCents', data.cartTotalCents)
	const billingAddress = data.encodedBillingAddress ?
		decodeAddress(data.encodedBillingAddress) : null;
	const mailingAddress = data.encodedMailingAddress ?
		decodeAddress(data.encodedMailingAddress) : null;
	const order = await prisma.order.create({
		data: {
				orderId: data.orderId,
				paymentId: data.paymentId,
				encodedCartItems: data.encodedCartItems,
				cartTotalCents: Number(data.cartTotalCents),
				billingAddress,
				mailingAddress,
			},
		})
	return true;
}

async function retrieveOrder(orderId) {
	const order = await prisma.order.findUnique({
    where: {
      orderId,
    },
  });
	return {orderId, total: order.cartTotalCents.toFixed(2) / 100};
}

export { saveOrder, retrieveOrder };