const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();

//**************** variables ****************//
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
const lowercase_pattern = /^(?=.*[a-z])/g;
const uppercase_pattern = /^(?=.*[A-Z])/g;
const digit_pattern = /^(?=.*\d{1,})/g;
const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;
const phone_pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/i;
const zipcode_pattern = /\d{5}(?:[- ]?\d{4})?/g;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if (validator.isEmpty(value)) {
				throw new Error('First and last name required!');
			}
			if (!validator.matches(value, name_pattern)) {
				throw new Error('Enter first and last name!');
			}
		},
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
		required: true,
		validate(value) {
			if (validator.isEmpty(value)) {
				throw new Error('A valid email is required!');
			}
			if (!validator.matches(value, email_pattern)) {
				throw new Error('Enter a valid email!');
			}
		},
	},
	password: {
		type: String,
		trim: true,
		required: true,
		trim: true,
		validate(value) {
			if (validator.isEmpty(value)) {
				throw new Error('A password is required!');
			}
			if (!validator.matches(value, lowercase_pattern)) {
				throw new Error('Password must have a lowercase character!');
			}
			if (!validator.matches(value, uppercase_pattern)) {
				throw new Error('Password must have an uppercase character!');
			}
			if (!validator.matches(value, digit_pattern)) {
				throw new Error('Password must have a digit character!');
			}
			if (!validator.matches(value, special_pattern)) {
				throw new Error(
					`Password must include at least one: '-+_!@#$%^&*?'`
				);
			}
			if (!validator.matches(value, password_pattern)) {
				throw new Error('Password must be at least 8 characters!');
			}
		},
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	phone: {
		type: String,
		trim: true,
		validate(value) {
			if (!validator.isEmpty(value)) {
				if (!validator.matches(value, phone_pattern)) {
					throw new Error('Preferred phone pattern is:  123-456-7890!');
				}
			}
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
