import prisma from './PrismaUtils';
import { decodeString } from './Utils'

async function saveOrder(data) {
	console.log('saving', 'id', data.orderId,
			'payment', data.paymentId,
			'encodedItems', data.encodedCartItems,
			'cartTotalCents', data.cartTotalCents)
	const billingAddress = decodeString(data.encodedBillingAddress);
	const mailingAddress = decodeString(data.encodedMailingAddress);
	const instructions = decodeString(data.encodedInstructions)
	const order = await prisma.order.create({
		data: {
				orderId: data.orderId,
				paymentId: data.paymentId,
				encodedCartItems: data.encodedCartItems,
				cartTotalCents: Number(data.cartTotalCents),
				billingAddress,
				mailingAddress,
				instructions,
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