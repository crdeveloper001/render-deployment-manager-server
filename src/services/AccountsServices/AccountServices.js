const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Import mongoose for ObjectId
const AccountDetails = require('../../schemas/AccountsSchemas/AccountsSchema');
const router = express.Router();


const updateAccountById = async (accountId, information) => {
    try {
        return await AccountDetails.findByIdAndUpdate(
            accountId, // First parameter is the accountId
            information, // Second parameter is the updated information
            { new: true, runValidators: true } // Third parameter: options
        );
    } catch (error) {
        throw new Error(`Error updating account: ${error.message}`);
    }
};

const deleteAccountById = async (accountId) => {
    try {
        return await AccountDetails.findByIdAndDelete(accountId);
    } catch (error) {
        throw new Error(`Error deleting account: ${error.message}`);
    }
};

module.exports = {
    updateAccountById,
    deleteAccountById
};
