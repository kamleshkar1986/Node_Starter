exports.constants = {
	admin: {
		name: "admin",
		email: "admin@admin.com"
	},
	confirmEmails: {
		from : "kamlesh.pikachu@gmail.com"
	},
	OrderStatus : {
		Carted: 'Carted', //When order is in cart
		Suspended: 'Suspended', //When order payment has failed
		Placed: 'Placed', //Order placed (Payment must be successful)
		Initiated: 'Initiated', //Order finalised for making
		Preparing: 'Preparing', //Work In Progress
		Prepared: 'Prepared', //End product ready
		Dispatched: 'Dispatched', //Dispatched for delivery
		InTransit: 'InTransit', //InTransit
		Delivered: 'Delivered', //Product delivered to customer
	  },	  
	PaymentStatus : {
		Initiated:'Initiated', //When user initiated PG payment
		Successful:'Successful', //When PG payment is successful
		Failed:'Failed' //When PG payment fails
	  }
};