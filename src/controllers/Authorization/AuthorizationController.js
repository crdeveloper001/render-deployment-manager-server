const services = require('../../services/Authentication/AuthenticationService')

// Controller to handle account authentication
const authenticationController = {

    postNewAuthentication: async (req, res) => {
        try {
            const { email, password } = req.body; // Extract email and password from request body
            const result = await services.authenticateAccount(email, password);
            res.status(200).json({
                message: "Account Authorized",
                token: `Bearer ${result.token}`,
                payload: result.account
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    postNewAccount: async (req, res) => {
        try {

            const result = services.registerAccount(req.body);
            return res.status(201).json({
                creationAccountStatus: "201 created",
                response: req.body
            });

        } catch (error) {
            console.log("error on create account" + error.message);

        }
    },

    putUpdateAccount: async (req, res) => {

        try {
            const { accountId, update } = req.body;
            const result = await services.updateAccount(accountId, update);
            res.status(200).json({
                message: "Account updated",
                payload: update
            });
        } catch (error) {
            console.log("error on create account" + error.message);

        }
    },


    deleteAccount: async (req, res) => {

        try {
            const { accountId } = req.body;
            const result = await services.deleteAccountById(accountId);
            res.status(200).json({
                message: `Account Delete with id: ${accountId}`
            });
        } catch (error) {

            res.status(401).json({ message: error.message });
        }
    }

};

module.exports = {
    authenticationController
}