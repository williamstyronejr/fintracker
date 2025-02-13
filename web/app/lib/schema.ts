import {
  pgTable,
  timestamp,
  uuid,
  text,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("type", ["payment", "income"]);

export const Transactions = pgTable("transactions", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  amount: numeric("amount", { precision: 10, scale: 4 }).notNull().default("0"),
  type: transactionTypeEnum(),
  userId: text("user_id").notNull(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => Accounts.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const Accounts = pgTable("accounts", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  nickname: text("nickname").notNull(),
  balance: numeric("balance", { precision: 10, scale: 4 }).default("0"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const PublicLinks = pgTable("public_links", {
  id: uuid().primaryKey().defaultRandom(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => Accounts.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
