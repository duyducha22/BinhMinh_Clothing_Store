import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/hashPassword.js";

const staffSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        
        // cu the hoa cac vai tro trong shop
        role: { 
            type: String, 
            required: true,
            enum: ['Admin', 'Sales', 'Inventory', 'Manager'],
            default: 'Sales' 
        },

        // trang thai lam viec (de Inactive khi nhan vien nghi viec)
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active'
        },

        salary: { type: mongoose.Decimal128, required: true },
        hireDate: { type: Date, default: Date.now },
        
        // isAdmin tương thích với middleware protectAdmin hiện tại
        isAdmin: { type: Boolean, default: false },

        // them anh dai dien nhan vien
        avatar: { type: String, default: '/images/default-avatar.png' }
    },
    {
        timestamps: true // tu dong them createdAt & updatedAt
    }
);

// Middleware ma hoa mat khau truoc khi luu
staffSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

// ham kiem tra mat khau
staffSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Staff = mongoose.model("Staff", staffSchema, "staff");
export default Staff;