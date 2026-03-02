FROM node:alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./ ./

# Generate Prisma Client
RUN DATABASE_URL="mongodb://auth-mongo-srv:27017/auth" pnpm exec prisma generate

CMD ["pnpm", "start"]
