FROM node:alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./ ./

CMD ["pnpm", "start"]
