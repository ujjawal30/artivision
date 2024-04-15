import { Document, Model, Schema, model, models } from "mongoose";

import { IUser } from "@/lib/models/user.model";

export interface ITransaction extends Document {
  stripeId: string;
  amount: number;
  plan: string;
  credits: number;
  user: IUser;
  createdAt: Date;
}

const TransactionSchema = new Schema({
  stripeId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Transaction: Model<ITransaction> =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
