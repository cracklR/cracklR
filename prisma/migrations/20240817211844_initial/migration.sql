-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emoji" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Particle" (
    "id" TEXT NOT NULL,
    "particle" TEXT NOT NULL,

    CONSTRAINT "Particle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmoji" (
    "userId" TEXT NOT NULL,
    "emojiId" TEXT NOT NULL,

    CONSTRAINT "UserEmoji_pkey" PRIMARY KEY ("userId","emojiId")
);

-- CreateTable
CREATE TABLE "PromptParticle" (
    "id" INTEGER NOT NULL,
    "promptId" TEXT NOT NULL,
    "particleId" TEXT NOT NULL,

    CONSTRAINT "PromptParticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptUnlock" (
    "id" INTEGER NOT NULL,
    "promptParticleId" INTEGER NOT NULL,

    CONSTRAINT "PromptUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPromptUnlock" (
    "userId" TEXT NOT NULL,
    "promptUnlockId" INTEGER NOT NULL,

    CONSTRAINT "UserPromptUnlock_pkey" PRIMARY KEY ("userId","promptUnlockId")
);

-- AddForeignKey
ALTER TABLE "UserEmoji" ADD CONSTRAINT "UserEmoji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmoji" ADD CONSTRAINT "UserEmoji_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptParticle" ADD CONSTRAINT "PromptParticle_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptParticle" ADD CONSTRAINT "PromptParticle_particleId_fkey" FOREIGN KEY ("particleId") REFERENCES "Particle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptUnlock" ADD CONSTRAINT "PromptUnlock_promptParticleId_fkey" FOREIGN KEY ("promptParticleId") REFERENCES "PromptParticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPromptUnlock" ADD CONSTRAINT "UserPromptUnlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPromptUnlock" ADD CONSTRAINT "UserPromptUnlock_promptUnlockId_fkey" FOREIGN KEY ("promptUnlockId") REFERENCES "PromptUnlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
