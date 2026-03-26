import Coupon from '../models/couponModel.js';

// @desc    Lấy danh sách mã giảm giá
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi lấy danh sách mã" });
  }
};

// @desc    Tạo mã giảm giá mới
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  const { 
    code, 
    discountType, 
    discountValue, 
    expirationDate, 
    minPurchaseAmount, 
    maxDiscountAmount, 
    usageLimit 
  } = req.body;

  const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
  if (couponExists) {
    res.status(400);
    throw new Error('Mã giảm giá này đã tồn tại');
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType,
    discountValue,
    expirationDate,
    minPurchaseAmount: minPurchaseAmount || 0,
    maxDiscountAmount: maxDiscountAmount || 0,
    usageLimit: usageLimit || 100
  });

  if (coupon) {
    res.status(201).json(coupon);
  } else {
    res.status(400);
    throw new Error('Dữ liệu mã giảm giá không hợp lệ');
  }
};

// @desc    Xóa mã giảm giá
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    await coupon.deleteOne();
    res.json({ message: 'Đã xóa mã giảm giá thành công' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy mã giảm giá');
  }
};

// @desc    Kiểm tra mã giảm giá (Cho khách hàng áp dụng trong giỏ hàng)
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res) => {
  const { code, cartTotal } = req.body; // Cần cartTotal để kiểm tra điều kiện minPurchase

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (!coupon) {
    res.status(404);
    throw new Error('Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
  }

  //Kiểm tra hạn sử dụng
  if (new Date() > coupon.expirationDate) {
    res.status(400);
    throw new Error('Mã giảm giá đã hết hạn sử dụng');
  }

  //Kiểm tra lượt dùng
  if (coupon.usageCount >= coupon.usageLimit) {
    res.status(400);
    throw new Error('Mã giảm giá đã hết lượt sử dụng');
  }

  // Kiểm tra số tiền tối thiểu của đơn hàng
  if (cartTotal < coupon.minPurchaseAmount) {
    res.status(400);
    throw new Error(`Đơn hàng tối thiểu ${coupon.minPurchaseAmount.toLocaleString()}đ mới được áp dụng mã này`);
  }

  //Tính toán số tiền được giảm thực tế
  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = cartTotal * (coupon.discountValue / 100);
    // Nếu có giới hạn giảm tối đa (maxDiscountAmount)
    if (coupon.maxDiscountAmount > 0 && discountAmount > coupon.maxDiscountAmount) {
      discountAmount = coupon.maxDiscountAmount;
    }
  } else {
    // Nếu là fixed (giảm tiền mặt thẳng)
    discountAmount = coupon.discountValue;
  }

  res.json({
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmount: discountAmount, // Số tiền thực tế sẽ trừ vào tổng đơn
    message: 'Áp dụng mã giảm giá thành công!'
  });
};

export { getCoupons, createCoupon, deleteCoupon, validateCoupon };