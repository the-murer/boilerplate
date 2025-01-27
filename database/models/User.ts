import mongoose, { Types } from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
