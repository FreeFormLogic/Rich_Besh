import {
  users,
  predictions,
  courses,
  polls,
  partners,
  trustRequests,
  chatMessages,
  userAchievements,
  stories,
  userPredictions,
  userCourses,
  pollVotes,
  type User,
  type InsertUser,
  type Prediction,
  type InsertPrediction,
  type Course,
  type InsertCourse,
  type Poll,
  type InsertPoll,
  type Partner,
  type TrustRequest,
  type InsertTrustRequest,
  type ChatMessage,
  type InsertChatMessage,
  type Story,
  type InsertStory,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, gt } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;
  
  // Predictions
  getPredictions(): Promise<Prediction[]>;
  getActivePredictions(): Promise<Prediction[]>;
  getPrediction(id: string): Promise<Prediction | undefined>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  updatePrediction(id: string, prediction: Partial<InsertPrediction>): Promise<Prediction>;
  purchasePrediction(userId: string, predictionId: string): Promise<void>;
  getUserPredictions(userId: string): Promise<Prediction[]>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course>;
  purchaseCourse(userId: string, courseId: string): Promise<void>;
  getUserCourses(userId: string): Promise<Course[]>;
  
  // Polls
  getActivePolls(): Promise<Poll[]>;
  getPoll(id: string): Promise<Poll | undefined>;
  createPoll(poll: InsertPoll): Promise<Poll>;
  votePoll(userId: string, pollId: string, optionIndex: number): Promise<void>;
  
  // Partners
  getActivePartners(): Promise<Partner[]>;
  getPartner(id: string): Promise<Partner | undefined>;
  incrementPartnerClicks(id: string): Promise<void>;
  
  // Trust Management
  createTrustRequest(request: InsertTrustRequest): Promise<TrustRequest>;
  getTrustRequests(): Promise<TrustRequest[]>;
  updateTrustRequest(id: string, status: string): Promise<TrustRequest>;
  
  // Chat
  getChatMessages(limit?: number): Promise<(ChatMessage & { user: User })[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  likeChatMessage(messageId: string): Promise<void>;
  
  // Stories
  getActiveStories(): Promise<Story[]>;
  getStory(id: string): Promise<Story | undefined>;
  incrementStoryViews(id: string): Promise<void>;
  
  // Achievements
  getUserAchievements(userId: string): Promise<any[]>;
  addUserAchievement(userId: string, achievementType: string, data?: any): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Predictions
  async getPredictions(): Promise<Prediction[]> {
    return await db.select().from(predictions).orderBy(desc(predictions.createdAt));
  }

  async getActivePredictions(): Promise<Prediction[]> {
    return await db
      .select()
      .from(predictions)
      .where(and(
        eq(predictions.status, "active"),
        gt(predictions.matchTime, new Date())
      ))
      .orderBy(predictions.matchTime);
  }

  async getPrediction(id: string): Promise<Prediction | undefined> {
    const [prediction] = await db.select().from(predictions).where(eq(predictions.id, id));
    return prediction;
  }

  async createPrediction(predictionData: InsertPrediction): Promise<Prediction> {
    const [prediction] = await db.insert(predictions).values(predictionData).returning();
    return prediction;
  }

  async updatePrediction(id: string, predictionData: Partial<InsertPrediction>): Promise<Prediction> {
    const [prediction] = await db
      .update(predictions)
      .set({ ...predictionData, updatedAt: new Date() })
      .where(eq(predictions.id, id))
      .returning();
    return prediction;
  }

  async purchasePrediction(userId: string, predictionId: string): Promise<void> {
    await db.insert(userPredictions).values({ userId, predictionId });
  }

  async getUserPredictions(userId: string): Promise<Prediction[]> {
    const result = await db
      .select({ prediction: predictions })
      .from(userPredictions)
      .innerJoin(predictions, eq(userPredictions.predictionId, predictions.id))
      .where(eq(userPredictions.userId, userId))
      .orderBy(desc(userPredictions.purchasedAt));
    
    return result.map(r => r.prediction);
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return await db
      .select()
      .from(courses)
      .where(eq(courses.isActive, true))
      .orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  async updateCourse(id: string, courseData: Partial<InsertCourse>): Promise<Course> {
    const [course] = await db
      .update(courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  async purchaseCourse(userId: string, courseId: string): Promise<void> {
    await db.insert(userCourses).values({ userId, courseId });
  }

  async getUserCourses(userId: string): Promise<Course[]> {
    const result = await db
      .select({ course: courses })
      .from(userCourses)
      .innerJoin(courses, eq(userCourses.courseId, courses.id))
      .where(eq(userCourses.userId, userId))
      .orderBy(desc(userCourses.purchasedAt));
    
    return result.map(r => r.course);
  }

  // Polls
  async getActivePolls(): Promise<Poll[]> {
    return await db
      .select()
      .from(polls)
      .where(and(
        eq(polls.isActive, true),
        sql`${polls.expiresAt} IS NULL OR ${polls.expiresAt} > NOW()`
      ))
      .orderBy(desc(polls.createdAt));
  }

  async getPoll(id: string): Promise<Poll | undefined> {
    const [poll] = await db.select().from(polls).where(eq(polls.id, id));
    return poll;
  }

  async createPoll(pollData: InsertPoll): Promise<Poll> {
    const [poll] = await db.insert(polls).values(pollData).returning();
    return poll;
  }

  async votePoll(userId: string, pollId: string, optionIndex: number): Promise<void> {
    await db.insert(pollVotes).values({ userId, pollId, optionIndex });
    await db
      .update(polls)
      .set({ totalVotes: sql`${polls.totalVotes} + 1` })
      .where(eq(polls.id, pollId));
  }

  // Partners
  async getActivePartners(): Promise<Partner[]> {
    return await db
      .select()
      .from(partners)
      .where(eq(partners.isActive, true))
      .orderBy(desc(partners.createdAt));
  }

  async getPartner(id: string): Promise<Partner | undefined> {
    const [partner] = await db.select().from(partners).where(eq(partners.id, id));
    return partner;
  }

  async incrementPartnerClicks(id: string): Promise<void> {
    await db
      .update(partners)
      .set({ clickCount: sql`${partners.clickCount} + 1` })
      .where(eq(partners.id, id));
  }

  // Trust Management
  async createTrustRequest(requestData: InsertTrustRequest): Promise<TrustRequest> {
    const [request] = await db.insert(trustRequests).values(requestData).returning();
    return request;
  }

  async getTrustRequests(): Promise<TrustRequest[]> {
    return await db.select().from(trustRequests).orderBy(desc(trustRequests.createdAt));
  }

  async updateTrustRequest(id: string, status: string): Promise<TrustRequest> {
    const [request] = await db
      .update(trustRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(trustRequests.id, id))
      .returning();
    return request;
  }

  // Chat
  async getChatMessages(limit = 50): Promise<(ChatMessage & { user: User })[]> {
    const result = await db
      .select({
        id: chatMessages.id,
        userId: chatMessages.userId,
        content: chatMessages.content,
        likes: chatMessages.likes,
        replyToId: chatMessages.replyToId,
        createdAt: chatMessages.createdAt,
        user: users
      })
      .from(chatMessages)
      .innerJoin(users, eq(chatMessages.userId, users.id))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
    
    return result;
  }

  async createChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(messageData).returning();
    return message;
  }

  async likeChatMessage(messageId: string): Promise<void> {
    await db
      .update(chatMessages)
      .set({ likes: sql`${chatMessages.likes} + 1` })
      .where(eq(chatMessages.id, messageId));
  }

  // Stories
  async getActiveStories(): Promise<Story[]> {
    return await db
      .select()
      .from(stories)
      .where(and(
        eq(stories.isActive, true),
        sql`${stories.expiresAt} IS NULL OR ${stories.expiresAt} > NOW()`
      ))
      .orderBy(desc(stories.createdAt));
  }

  async getStory(id: string): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }

  async incrementStoryViews(id: string): Promise<void> {
    await db
      .update(stories)
      .set({ viewCount: sql`${stories.viewCount} + 1` })
      .where(eq(stories.id, id));
  }

  // Achievements
  async getUserAchievements(userId: string): Promise<any[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.unlockedAt));
  }

  async addUserAchievement(userId: string, achievementType: string, data?: any): Promise<void> {
    await db.insert(userAchievements).values({
      userId,
      achievementType,
      achievementData: data
    });
  }
}

export const storage = new DatabaseStorage();
