import mongoose from 'mongoose'
import { Password } from '../services/password';

// notice below type: String is specific to mongoose and not typescript
// with mongoose it is String and with typescript string

interface UserAttrs {
    email: string;
    password: string;
}
// An interface that describes the properties that user model has
//  this line indicates that after building user return this document
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

// toJSON added to return document as per our requirement to UI
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.password;
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }

    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

// We will never call new user directly but calle buildUser to involve typescript
// while creating a user otherwise typescript won't know anything

// This is commented because static.build is added to user which is more suitable
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

export { User }