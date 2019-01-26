import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import { Promise } from 'es6-promise'

const SALT_WORK_FACTOR = 10;

export interface User {
    joinedAt: Date;
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    team?: string;
}

export interface UserModel extends User, Document {
    fullName(): string;
    comparePassword(passwd: string): Promise<boolean>;
}

var UserSchema: Schema = new Schema({
    joinedAt: Date,
    email: {type: String, required: true, index: {unique: true}},
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    team: String
});

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user['joinedAt']) {
        user['joinedAt'] = Date();
    }
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        //hash the password along with the salt
        bcrypt.hash(user['password'], salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            console.log('hash:', hash);
            user['password'] = hash;
            next();
        });
    });
});

UserSchema.methods.fullName = () => `${this.firstName.trim()} ${this.lastName.trim()}`;

UserSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise( (resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
    
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
