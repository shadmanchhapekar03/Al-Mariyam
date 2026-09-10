import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const appointments = sqliteTable("appointments", {
  id: integer().primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  department: text().notNull(),
  preferredDate: text("preferred_date").notNull(),
  message: text().default(""),
  status: text().notNull().default("pending"),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  subject: text().notNull(),
  message: text().notNull(),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const products = sqliteTable("products", {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  name: text().notNull(),
  category: text().notNull(),
  description: text().notNull(),
  price: real().notNull(),
  originalPrice: real(),
  imageUrl: text("image_url").notNull(),
  stock: integer().notNull().default(0),
  isPrescriptionRequired: integer("is_prescription_required").default(0),
  manufacturer: text(),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const cartItems = sqliteTable("cart_items", {
  id: integer().primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer().notNull().default(1),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const orders = sqliteTable("orders", {
  id: integer().primaryKey({ autoIncrement: true }),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  shippingAddress: text("shipping_address").notNull(),
  totalAmount: real("total_amount").notNull(),
  status: text().notNull().default("pending"),
  paymentMethod: text("payment_method").notNull(),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const orderItems = sqliteTable("order_items", {
  id: integer().primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  price: real().notNull(),
  quantity: integer().notNull(),
});
