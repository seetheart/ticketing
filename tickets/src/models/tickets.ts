import mongoose from 'mongoose'

// notice below type: String is specific to mongoose and not typescript
// with mongoose it is String and with typescript string

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}
// An interface that describes the properties that user model has
//  this line indicates that after building user return this document
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

// An interface that describes the properties that a user document has

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

// toJSON added to return document as per our requirement to UI
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('User', ticketSchema)

// We will never call new user directly but calle buildUser to involve typescript
// while creating a user otherwise typescript won't know anything

// This is commented because static.build is added to user which is more suitable
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

export { Ticket }