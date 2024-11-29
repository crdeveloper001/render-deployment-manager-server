require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const AccountDetails = require('../../schemas/AccountsSchemas/AccountsSchema');

const SECRET = process.env.SECRETKEYAUTH;


// Function to authenticate a user and generate a token
const authenticateAccount = async (email, password) => {
    try {
        // Find the account by email
        const account = await AccountDetails.findOne({ accountEmail: email });
        if (!account) {
            throw new Error("Account not found");
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, account.accountPassword);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token with the required fields in the payload
        const token = jwt.sign(
            {
                _id: account._id,
                accountName: account.accountName,
                accountLastname: account.accountLastname,
                accountEmail: account.accountEmail,
                accountAliasName: account.accountAliasName,
                accountPhone: account.accountPhone,
                accountRoleType: account.accountRoleType
            },
            SECRET,
            { expiresIn: "1h" } // Token expiration
        );

        // Return the token and account data
        return {
            token,
            account: {
                _id: account._id,
                accountName: account.accountName,
                accountLastname: account.accountLastname,
                accountEmail: account.accountEmail,
                accountAliasName: account.accountAliasName,
                accountPhone: account.accountPhone,
                accountRoleType: account.accountRoleType
            }
        };
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const verified = jwt.verify(token, SECRET);
        req.user = verified; // Add decoded token data to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
// Function to register an account
const registerAccount = async (information) => {
    try {
        information._id = new mongoose.Types.ObjectId();
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(information.accountPassword, 10);
        information.accountPassword = hashedPassword;
        const account = new AccountDetails(information);
        return await account.save();
    } catch (error) {
        throw new Error(`Error registering account: ${error.message}`);
    }
};

// Function to update account information
const updateAccount = async (accountId, updateData) => {
    try {
        // Find the account by ID
        const account = await AccountDetails.findById(accountId);
        if (!account) {
            throw new Error("Account not found");
        }

        // Check if a new password is being provided
        if (updateData.accountPassword) {
            // Hash the new password before updating
            updateData.accountPassword = await bcrypt.hash(updateData.accountPassword, 10);
        }

        // Update only the fields provided in updateData
        Object.keys(updateData).forEach((key) => {
            account[key] = updateData[key];
        });

        // Save the updated account
        return await account.save();
    } catch (error) {
        throw new Error(`Error updating account: ${error.message}`);
    }
};

const deleteAccountById = async (accountId) => {
    try {
        const account = await AccountDetails.findById(accountId);
        if (!account) {
            throw new Error("Account not found");
        } else {
            await account.deleteOne(accountId)

        }
    } catch (error) {
        throw new Error("Error on delete account" + error);

    }


}

// Export the functions
module.exports = {
    registerAccount,
    authenticateAccount,
    verifyToken,
    updateAccount,
    deleteAccountById
};
