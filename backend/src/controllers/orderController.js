import Order from "../models/Order.js";
import Product from "../models/Product.js";

/**
 * @desc    Get all orders with filtering and pagination
 * @route   GET /api/orders
 * @access  Private
 */
export const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      platform,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (platform) {
      query.platform = platform;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const orders = await Order.find(query)
      .populate("items.product", "name category")
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalOrders: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name category images"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      customerInfo,
      shippingAddress,
      paymentMethod,
      notes,
      subtotal,
      shippingCost,
      tax,
      total,
      platform = "web",
    } = req.body;

    // Validation
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    if (!customerInfo || !customerInfo.email) {
      return res.status(400).json({
        success: false,
        message: "Customer information is required",
      });
    }

    // Calculate totals
    let calculatedSubtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }

      const itemTotal = item.price * item.quantity;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        product: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: item.price,
        total: itemTotal,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    const order = new Order({
      orderNumber,
      items: orderItems,
      totalAmount: total || calculatedSubtotal,
      subtotal: subtotal || calculatedSubtotal,
      shippingCost: shippingCost || 0,
      tax: tax || 0,
      customerInfo: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        email: customerInfo.email,
        phone: customerInfo.phone || "",
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
      },
      shippingAddress,
      paymentMethod,
      notes,
      platform,
      paymentStatus: "pending",
      status: "pending",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/:id/status
 * @access  Private
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

/**
 * @desc    Update payment status
 * @route   PATCH /api/orders/:id/payment
 * @access  Private
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json({
      success: true,
      message: "Payment status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating payment status",
      error: error.message,
    });
  }
};

/**
 * @desc    Get revenue analytics
 * @route   GET /api/orders/analytics/revenue
 * @access  Private
 */
export const getRevenueAnalytics = async (req, res) => {
  try {
    const { period = "daily", category, startDate, endDate } = req.query;

    // Date range setup
    const now = new Date();
    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else {
      // Default to last 30 days
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = {
        createdAt: {
          $gte: thirtyDaysAgo,
          $lte: now,
        },
      };
    }

    // Build aggregation pipeline for revenue (only paid orders)
    const pipeline = [{ $match: { ...dateFilter, paymentStatus: "paid" } }];

    // Add category filter if specified
    if (category) {
      pipeline.push(
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        { $match: { "productInfo.category": category } },
        {
          $group: {
            _id: "$_id",
            createdAt: { $first: "$createdAt" },
            totalAmount: { $first: "$totalAmount" },
            subtotal: { $first: "$subtotal" },
            shippingCost: { $first: "$shippingCost" },
            tax: { $first: "$tax" },
            itemsTotal: { $sum: "$items.total" },
          },
        }
      );
    }

    // Group by period
    let groupBy;
    switch (period) {
      case "daily":
        groupBy = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        };
        break;
      case "weekly":
        groupBy = {
          year: { $year: "$createdAt" },
          week: { $week: "$createdAt" },
        };
        break;
      case "monthly":
        groupBy = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        };
        break;
      case "yearly":
        groupBy = {
          year: { $year: "$createdAt" },
        };
        break;
      default:
        groupBy = {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        };
    }

    pipeline.push(
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: category ? "$itemsTotal" : "$totalAmount" }, // Gross revenue
          netRevenue: { $sum: "$subtotal" }, // Net revenue
          totalOrders: { $addToSet: "$_id" },
          totalQuantity: category ? { $sum: "$itemsTotal" } : { $sum: 1 },
        },
      },
      {
        $addFields: {
          orderCount: { $size: "$totalOrders" },
        },
      },
      {
        $project: {
          totalOrders: 0,
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } }
    );

    const analytics = await Order.aggregate(pipeline);

    // Get summary statistics - separate for revenue (paid) and total orders (all)
    const revenueSummaryPipeline = [
      { $match: { ...dateFilter, paymentStatus: "paid" } },
    ];

    if (category) {
      revenueSummaryPipeline.push(
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        { $match: { "productInfo.category": category } },
        {
          $group: {
            _id: "$_id",
            totalAmount: { $sum: "$items.total" },
            items: { $push: "$items" },
          },
        }
      );
    }

    revenueSummaryPipeline.push({
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" }, // Gross revenue (includes tax & shipping)
        netRevenue: { $sum: "$subtotal" }, // Net revenue (subtotal only)
        totalShipping: { $sum: "$shippingCost" },
        totalTax: { $sum: "$tax" },
        paidOrders: { $sum: 1 },
        averageOrderValue: { $avg: "$totalAmount" },
        averageNetOrderValue: { $avg: "$subtotal" },
      },
    });

    // get total orders count 
    const totalOrdersPipeline = [{ $match: dateFilter }];

    if (category) {
      totalOrdersPipeline.push(
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        { $match: { "productInfo.category": category } },
        {
          $group: {
            _id: "$_id",
          },
        }
      );
    }

    totalOrdersPipeline.push({
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
      },
    });

    const [revenueSummary, totalOrdersResult] = await Promise.all([
      Order.aggregate(revenueSummaryPipeline),
      Order.aggregate(totalOrdersPipeline),
    ]);

    const summary = {
      totalRevenue: revenueSummary[0]?.totalRevenue || 0, 
      netRevenue: revenueSummary[0]?.netRevenue || 0, 
      totalShipping: revenueSummary[0]?.totalShipping || 0,
      totalTax: revenueSummary[0]?.totalTax || 0,
      totalOrders: totalOrdersResult[0]?.totalOrders || 0,
      averageOrderValue: revenueSummary[0]?.averageOrderValue || 0,
      averageNetOrderValue: revenueSummary[0]?.averageNetOrderValue || 0,
    };

    res.json({
      success: true,
      data: {
        analytics,
        summary,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching revenue analytics",
      error: error.message,
    });
  }
};
