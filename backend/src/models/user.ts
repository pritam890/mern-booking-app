import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an interface that extends Document for the User
interface UserType extends Document {
    _id : string,
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(this.password, 8);
        this.password = hashedPassword;    
    }
    next(); // Proceed to the next middleware
});

// Create the User model
const User = mongoose.model<UserType>('User', userSchema);

export default User;
