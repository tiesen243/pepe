CREATE TABLE "accounts" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"provider" varchar(255) NOT NULL,
	"account_id" varchar(255) NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"token" varchar(255) PRIMARY KEY NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"user_id" varchar(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_account_id_idx" ON "accounts" USING btree ("provider","account_id");