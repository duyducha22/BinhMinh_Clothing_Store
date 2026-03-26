import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

// Schema danh gia san pham
const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Customer',
        },
    },
    { timestamps: true }
);

//schema bien the
const variantSchema = mongoose.Schema({
    size: { type: String, required: true }, // size cua san pham
    color: { type: String, required: true }, //mau cua san pham
    stock: { type: Number, required: true, default: 0 }, // Ton kho rieng cho tung size/mau
    price: { type: Number }, // Gia rieng (neu size to dat hon size be)
    sku: { type: String } //ma kho rieng (neu can quan ly chuyen nghiep)
});

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        images: [{ type: String, required: true }], 
        brand: { type: String, required: true, default: 'No Brand' },
        category: { type: String, required: true }, 
        description: { type: String, required: true },
        
        // thuoc tinh dac thu nganh thoi tran
        material: { type: String }, // chat lieu: Cotton, Poly...
        gender: { 
            type: String, 
            enum: ['Nam', 'Nữ', 'Unisex'], 
            default: 'Unisex' 
        },

  
        price: { type: Number, required: true, default: 0 },

        // danh sach cac bien the
        variants: [variantSchema],

        // Tong ton kho
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },

        reviews: [reviewSchema],
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },

        // SEO
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: { type: String },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Staff/Admin tạo sản phẩm
        },
    },
    { timestamps: true }
);


productSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Product = mongoose.model('Product', productSchema);
export default Product;