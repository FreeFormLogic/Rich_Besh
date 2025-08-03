import { sql, relations } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  varchar, 
  integer, 
  timestamp, 
  boolean, 
  decimal,
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for WebApp sessions
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for Telegram WebApp users
export const users = pgTable("users", {
  id: varchar("id").primaryKey(), // Telegram user ID
  username: varchar("username"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  languageCode: varchar("language_code").default("ru"),
  level: varchar("level").default("Новичок"),
  experience: integer("experience").default(0),
  balance: integer("balance").default(0),
  streak: integer("streak").default(0),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sports predictions
export const predictions = pgTable("predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  match: text("match").notNull(),
  odds: decimal("odds", { precision: 10, scale: 2 }).notNull(),
  confidence: integer("confidence").notNull(), // 1-100
  price: integer("price").notNull(), // in kopecks
  sport: varchar("sport").notNull(),
  league: varchar("league"),
  matchTime: timestamp("match_time").notNull(),
  status: varchar("status").default("active"), // active, completed, cancelled
  result: varchar("result"), // won, lost, void
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User purchased predictions
export const userPredictions = pgTable("user_predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  predictionId: varchar("prediction_id").references(() => predictions.id).notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});

// Courses and educational content
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"), // Course materials
  price: integer("price").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  imageUrl: text("image_url"),
  category: varchar("category").notNull(),
  difficulty: varchar("difficulty").default("Начинающий"),
  duration: integer("duration"), // in minutes
  studentsCount: integer("students_count").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User purchased courses
export const userCourses = pgTable("user_courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  progress: integer("progress").default(0), // 0-100
  purchasedAt: timestamp("purchased_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Community polls
export const polls = pgTable("polls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of poll options
  totalVotes: integer("total_votes").default(0),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User poll votes
export const pollVotes = pgTable("poll_votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  pollId: varchar("poll_id").references(() => polls.id).notNull(),
  optionIndex: integer("option_index").notNull(),
  votedAt: timestamp("voted_at").defaultNow(),
});

// Partners and affiliate links
export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  affiliateUrl: text("affiliate_url").notNull(),
  bonus: text("bonus"),
  category: varchar("category").default("betting"),
  isActive: boolean("is_active").default(true),
  clickCount: integer("click_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Trust management requests
export const trustRequests = pgTable("trust_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  amount: integer("amount").notNull(),
  contact: text("contact").notNull(),
  period: integer("period").notNull(), // in months
  goal: text("goal"),
  status: varchar("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  replyToId: varchar("reply_to_id").references(() => chatMessages.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// User achievements
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementType: varchar("achievement_type").notNull(),
  achievementData: jsonb("achievement_data"),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Stories content
export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category").notNull(), // cars, style, dubai, betting, watches
  content: text("content"),
  viewCount: integer("view_count").default(0),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  predictions: many(userPredictions),
  courses: many(userCourses),
  votes: many(pollVotes),
  trustRequests: many(trustRequests),
  chatMessages: many(chatMessages),
  achievements: many(userAchievements),
}));

export const predictionsRelations = relations(predictions, ({ one, many }) => ({
  creator: one(users, {
    fields: [predictions.createdBy],
    references: [users.id],
  }),
  userPredictions: many(userPredictions),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  userCourses: many(userCourses),
}));

export const pollsRelations = relations(polls, ({ many }) => ({
  votes: many(pollVotes),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one, many }) => ({
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
  replyTo: one(chatMessages, {
    fields: [chatMessages.replyToId],
    references: [chatMessages.id],
  }),
  replies: many(chatMessages),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
  shares: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  studentsCount: true,
  rating: true,
});

export const insertPollSchema = createInsertSchema(polls).omit({
  id: true,
  createdAt: true,
  totalVotes: true,
});

export const insertTrustRequestSchema = createInsertSchema(trustRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
  likes: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
  viewCount: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Poll = typeof polls.$inferSelect;
export type InsertPoll = z.infer<typeof insertPollSchema>;
export type Partner = typeof partners.$inferSelect;
export type TrustRequest = typeof trustRequests.$inferSelect;
export type InsertTrustRequest = z.infer<typeof insertTrustRequestSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
