import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["coffee", "beverages", "mains", "desserts", "icecreams"],
    },
    ingredients: { type: [String], default: [] },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    image: { type: String, default: "" },
    isSignature: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
