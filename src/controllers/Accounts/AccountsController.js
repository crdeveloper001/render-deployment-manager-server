const services = require('../../services/Authentication/AuthenticationService')

const accountController = {

    // postNewAccount: async (req, res) => {

    //     try {
    //         const request = services.registerAccount(req.body);
    //         res.status(201).json({
    //             status: "account created",
    //             response: req.body
    //         });
    //         console.log("account created!");


    //     } catch (error) {
    //         res.status(500).json({
    //             status: "error on create account",
    //             error: error
    //         })
    //     }

    // }

}

module.exports = {
    accountController
}