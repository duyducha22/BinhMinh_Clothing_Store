import Customer from "../models/customerModel.js";
import generateToken from "../utils/generateToken.js";
import Product from '../models/productModel.js';

//@desc dang ky khach hang moi
//@route POST /api/customers
//@access Public
const registerCustomer = async (req, res) => {
    const { email, name, phone, password } = req.body;

    try {
        const customerExists = await Customer.findOne({ email });
        if (customerExists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        
        const customer = await Customer.create({ email, name, phone, password });

        res.status(201).json({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            token: generateToken(customer._id),
        });
    } catch (error) {
        res.status(400).json({ message: "Dữ liệu không hợp lệ", error: error.message });
    }
};

//@desc dang nhap khach hang
//@route POST /api/customer/login
//@access Public
const loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });

        if (customer && (await customer.matchPassword(password))) {
            res.json({
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                isAdmin: customer.isAdmin,
                token: generateToken(customer._id),
            });
        } else {
            res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};

//@desc lấy giỏ hàng của khách
//@route GET /api/customer/cart
//@access Private
const getCustomerCart = async (req, res) => {
    const customer = await Customer.findById(req.user._id);

    if (customer) {
        await customer.populate('cart.product');
        res.json(customer.cart);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy khách hàng');
    }
};

//@desc thêm sản phẩm vào giỏ hàng (Hỗ trợ Size/Màu)
//@route POST /api/customer/cart
//@access Private
const addItemToCart = async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        
        const customer = await Customer.findById(req.user._id);
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm');
        }

        // Kiểm tra tồn kho của biến thể trước khi thêm
        const variant = product.variants.find(v => v.size === size && v.color === color);
        if (!variant || variant.stock < quantity) {
            res.status(400);
            throw new Error(`Sản phẩm ${product.name} - Size ${size}/${color} không đủ hàng`);
        }

        // Tìm xem giỏ hàng đã có món đồ cùng ID + Size + Màu chưa
        const cartItemIndex = customer.cart.findIndex(
            (item) => 
                item.product.toString() === productId && 
                item.size === size && 
                item.color === color
        );

        if (cartItemIndex > -1) {
            customer.cart[cartItemIndex].quantity += Number(quantity);
        } else {
            const newItem = {
                product: productId,
                name: product.name,
                image: product.images[0], // Lấy ảnh đầu tiên từ mảng images
                price: product.price,
                quantity: Number(quantity),
                size,
                color
            };
            customer.cart.push(newItem);
        }

        const updatedCustomer = await customer.save();
        await customer.populate('cart.product');

        res.status(201).json(updatedCustomer.cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@desc xoa san pham khoi gio hang
//@route DELETE /api/customer/cart
//@access Private
const removeItemFromCart = async (req, res) => {
    const { productId, size, color } = req.body;
    const customer = await Customer.findById(req.user._id);

    if (customer) {
        // Lọc bỏ món đồ khớp cả ID, Size và Màu
        customer.cart = customer.cart.filter(
            (item) => !(item.product.toString() === productId && item.size === size && item.color === color)
        );
        await customer.save();
        res.json(customer.cart);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy khách hàng');
    }
};

//@desc Cập nhật hồ sơ người dùng
//@route PUT /api/customer/profile
//@access Private
const updateUserProfile = async (req, res) => {
    const customer = await Customer.findById(req.user._id);

    if (customer) {
        customer.name = req.body.name || customer.name;
        customer.phone = req.body.phone || customer.phone;
        customer.email = req.body.email || customer.email;

        if (req.body.password) {
            customer.password = req.body.password;
        }

        const updatedCustomer = await customer.save();

        res.json({
            _id: updatedCustomer._id,
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            isAdmin: updatedCustomer.isAdmin,
            phone: updatedCustomer.phone,
            token: generateToken(updatedCustomer._id),
        });
    } else {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }
};

//@desc Cập nhật số lượng sản phẩm trong giỏ hàng
//@route PUT /api/customer/cart
//@access Private
const updateCartItemQuantity = async (req, res) => {
    const { productId, size, color, quantity } = req.body;

    const customer = await Customer.findById(req.user._id);

    if (customer) {
        const itemIndex = customer.cart.findIndex(
            (item) => item.product.toString() === productId && item.size === size && item.color === color
        );

        if (itemIndex > -1) {
            customer.cart[itemIndex].quantity = Number(quantity);
            await customer.save();
            res.json(customer.cart);
        } else {
            res.status(404);
            throw new Error('Sản phẩm không có trong giỏ hàng');
        }
    } else {
        res.status(404);
        throw new Error('Không tìm thấy khách hàng');
    }
};

//@desc Lấy tất cả người dùng (Chỉ dành cho Admin)
//@route GET /api/customer
//@access Private/Admin
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

//@desc Xóa người dùng
//@route DELETE /api/customer/:id
//@access Private/Admin
const deleteUser = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
        await customer.deleteOne();
        res.json({ message: 'Người dùng đã bị xóa' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

//@desc Cập nhật người dùng (Sửa tên, email, quyền Admin)
//@route PUT /api/customer/:id
//@access Private/Admin
const updateUser = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
        customer.name = req.body.name || customer.name;
        customer.email = req.body.email || customer.email;
        
        if (req.body.isAdmin !== undefined) {
            customer.isAdmin = req.body.isAdmin;
        }

        const updatedCustomer = await customer.save();

        res.json({
            _id: updatedCustomer._id,
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            isAdmin: updatedCustomer.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }
};

export {
    registerCustomer,
    loginCustomer,
    getCustomerCart,
    addItemToCart,
    removeItemFromCart,
    updateUserProfile,
    updateCartItemQuantity,
    getCustomers,
    deleteUser,
    updateUser,
};