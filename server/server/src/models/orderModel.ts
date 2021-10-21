import {IOrder} from './../types/order';
import {model, Schema} from 'mongoose'

// enum status = {ordered, packed, dispatched, delivered}

const orderSchema: Schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['ordered', 'packed', 'dispatched', 'delivered'],
        required: true
    }
    
}, {timestamps: true})


export default model<IOrder>('Order', orderSchema)
