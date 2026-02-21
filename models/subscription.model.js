import mongoose from "mongoose";

const subscriptionModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },

    currency: {
        type: String,
        enum: ['USD','EUR', 'GBP'],
        default: 'USD',
    },

    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        default: 'Monthly',
    },

    category: {
        type: String,
        enum: ['sports', 'culture', 'news', 'entertainment', 'lifestyle', 'technology', 'politics', 'other'],
        required: [true, "Category is required"],
    },

    paymentMethod: {
        type: String,
        required: [true, "Payment Methods is required"],
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },

    startDate:{
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: (value) => value <= new Date,
            message: 'Start Date is required',
        }
    },

    renewalDate:{
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: function (value){
                return value < this.startDate;
            } ,
            message: 'Renewal Date should be a valid date',
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index : true,

    }

}, {timestamps: true});