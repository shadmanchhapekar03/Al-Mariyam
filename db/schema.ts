import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  department: text().notNull(),
  preferredDate: text("preferred_date").notNull(),
  message: text().default(""),
  status: text().notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  subject: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
