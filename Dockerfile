# Usando a imagem Node.js oficial como base
FROM node:18-alpine

# Definindo o diretório de trabalho no container
WORKDIR /app

# Copiando os arquivos de dependências
COPY package*.json pnpm-lock.yaml* ./

# Instalando as dependências
RUN npm install -g pnpm && pnpm install

# Copiando o restante dos arquivos da aplicação para o container
COPY . .

# Compilando o projeto
RUN pnpm run build

# Expondo a porta padrão do Next.js
EXPOSE 3000

# Iniciando a aplicação
CMD ["pnpm", "start"]
