const services = require('../../services/Authentication/AuthenticationService')

const accountController = {

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

}

module.exports = {
    accountController
}