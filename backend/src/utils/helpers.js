// generate a unique sku for a product

export const generateSKU = (name, category) => {
  const namePrefix = name
    .substring(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  const categoryPrefix = category
    .substring(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");

  return `${namePrefix}${categoryPrefix}-${timestamp}-${random}`;
};

//format currency value

export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// calculate percentage change

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// generate date ranges for analytics

export const getDateRange = (period, count = 30) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case "daily":
      startDate = new Date(now.getTime() - count * 24 * 60 * 60 * 1000);
      break;
    case "weekly":
      startDate = new Date(now.getTime() - count * 7 * 24 * 60 * 60 * 1000);
      break;
    case "monthly":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - count,
        now.getDate()
      );
      break;
    case "yearly":
      startDate = new Date(
        now.getFullYear() - count,
        now.getMonth(),
        now.getDate()
      );
      break;
    default:
      startDate = new Date(now.getTime() - count * 24 * 60 * 60 * 1000);
  }

  return {
    startDate,
    endDate: now,
  };
};

// validate email format

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate pagination metadata

export const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage: parseInt(page),
    totalPages,
    totalItems: total,
    itemsPerPage: parseInt(limit),
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
};
