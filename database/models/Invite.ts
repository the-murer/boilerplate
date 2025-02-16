import mongoose, { Types } from "mongoose";

export interface Invite extends mongoose.Document {
  email: string;
  roles: string[];
}

const InviteSchema = new mongoose.Schema<Invite>({
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Invite ||
  mongoose.model<Invite>("Invite", InviteSchema);
