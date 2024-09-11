-- CreateEnum
CREATE TYPE "PERSONA_ROL" AS ENUM ('ADMINISTRADOR', 'CLIENTE');

-- CreateTable
CREATE TABLE "personas" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "numero_telefono" INTEGER,
    "password" TEXT,
    "rol" "PERSONA_ROL" NOT NULL DEFAULT 'CLIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagenes" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "path" TEXT,
    "content_type" TEXT NOT NULL,
    "extension" TEXT NOT NULL,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platos" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pedido_id" UUID NOT NULL,
    "imagen_id" UUID NOT NULL,

    CONSTRAINT "platos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" UUID NOT NULL,
    "extras" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "persona_id" UUID NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personas_email_key" ON "personas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "imagenes_key_key" ON "imagenes"("key");

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_imagen_id_fkey" FOREIGN KEY ("imagen_id") REFERENCES "imagenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
