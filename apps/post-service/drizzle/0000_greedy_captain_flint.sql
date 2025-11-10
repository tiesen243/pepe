CREATE TABLE "posts" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"author_id" varchar(24) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
