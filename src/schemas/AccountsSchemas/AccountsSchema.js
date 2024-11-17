const mongoose = require('mongoose');

// Define the subdocument schema
const accountRenderDetailsSchema = new mongoose.Schema({
    renderAccountEmail: { type: String, required: false, default: null },
    renderAccountId: { type: String, required: false, default: null },
    renderAccountName: { type: String, required: false, default: null },
    renderRolType: { type: String, required: false, default: null }
});

// Define the main schema
const accountSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    accountName: { type: String, required: true },
    accountLastname: { type: String, required: true },
    accountEmail: { type: String, required: true },
    accountAliasName: { type: String, required: true },
    accountPhone: { type: Number, required: true },
    accountPassword: { type: String, required: true },
    accountRoleType: { type: String, required: true },
    accountRenderDetails: { type: accountRenderDetailsSchema, required: false }, // Optional subdocument
    accountAppsDeployed: { type: Number, required: false, default: null } // Optional field with default null
});

module.exports = mongoose.model('Accounts', accountSchema);
