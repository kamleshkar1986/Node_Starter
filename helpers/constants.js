exports.constants = {
	admin: {
		name: "admin",
		email: "admin@admin.com"
	},
	confirmEmails: {
		from: "kamlesh.pikachu@gmail.com"
	},
	OrderStatus: {
		Carted: 'Carted', //When order is in cart
		Suspended: 'Suspended', //When order payment has failed
		Placed: 'Placed', //Order placed (Payment must be successful)
		Initiated: 'Initiated', //Order finalised for making
		Preparing: 'Preparing', //Work In Progress
		Prepared: 'Prepared', //End product ready
		Dispatched: 'Dispatched', //Dispatched for delivery
		InTransit: 'InTransit', //InTransit
		Delivered: 'Delivered', //Product delivered to customer
		DeliveryRescheduled: 'DeliveryRescheduled', //When delivery is resheduled due to unavailablity of customer
		DeliveryFailed: 'DeliveryFailed', //When delivery fails after all attempts/efforts 
		Refunded: 'Refunded', //When order is refunded
		Cancelled: 'Cancelled' // When order is canelled
	},
	PaymentStatus: {
		NotStarted: 'NotStarted',//When payment requested not started or initiated (eg. when prod is added to cart.)
		Initiated: 'Initiated', //When user initiated PG payment
		Successful: 'Successful', //When PG payment is successful
		Failed: 'Failed' //When PG payment fails
	}
};