import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  index,
  boolean,
} from "drizzle-orm/pg-core";

// Enum definitions
export const reviewActionEnum = pgEnum("review_action_enum", [
  "REJECTED",
  "ACCEPTED",
  "SUBMITTED",
]);
export const userRoleEnum = pgEnum("user_role_enum", [
  "USER",
  "BUILDER",
  "ADMIN",
]);

// Types for enums
export enum ReviewAction {
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  SUBMITTED = "SUBMITTED",
}

export enum UserRole {
  USER = "USER",
  BUILDER = "BUILDER",
  ADMIN = "ADMIN",
}

// Challenge IDs that we're tracking
export enum ChallengeId {
  SIMPLE_COUNTER_EXAMPLE = "simple-counter-example",
  SIMPLE_NFT_EXAMPLE = "simple-nft-example",
  VENDING_MACHINE = "vending-machine",
}

// Users table
export const users = pgTable("users", {
  userAddress: varchar({ length: 42 }).primaryKey(), // Ethereum wallet address
  role: userRoleEnum().default(UserRole.USER),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  socialTelegram: varchar({ length: 255 }),
  socialX: varchar({ length: 255 }),
  socialGithub: varchar({ length: 255 }),
  socialInstagram: varchar({ length: 255 }),
  socialDiscord: varchar({ length: 255 }),
  socialEmail: varchar({ length: 255 }),
  location: varchar({ length: 255 }),
});

// Challenges table
export const challenges = pgTable("challenges", {
  id: varchar({ length: 255 }).primaryKey(),
  challengeName: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  sortOrder: integer().notNull(),
  github: varchar({ length: 255 }),
  autograding: boolean().default(false),
  disabled: boolean().default(false),
});

// User challenges table - this is the main table we'll be querying
export const userChallenges = pgTable(
  "user_challenges",
  {
    id: serial().primaryKey(),
    userAddress: varchar({ length: 42 }).notNull(),
    challengeId: varchar({ length: 255 }).notNull(),
    frontendUrl: varchar({ length: 255 }),
    contractUrl: varchar({ length: 255 }),
    reviewComment: text(),
    submittedAt: timestamp().notNull().defaultNow(),
    reviewAction: reviewActionEnum(),
    signature: varchar({ length: 255 }),
    githubUsername: varchar({ length: 255 }),
    githubRepoUrl: varchar({ length: 255 }),
    score: integer(),
    deployedContractAddress: varchar({ length: 255 }),
    timeDifference: varchar({ length: 255 }),
    gasDifference: varchar({ length: 255 }),
  },
  (table) => [
    index("user_challenge_lookup_idx").on(table.userAddress),
    index("user_challenge_review_idx").on(
      table.userAddress,
      table.reviewAction
    ),
  ]
);
