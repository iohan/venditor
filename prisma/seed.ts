// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const shop = await prisma.shop.create({
    data: {
      title: "Sample Shop",
    },
  });

  const media1 = await prisma.media.create({
    data: {
      type: "image",
      url: "https://example.com/smartphone.jpg",
      shopId: shop.id,
    },
  });

  const media2 = await prisma.media.create({
    data: {
      type: "image",
      url: "https://example.com/laptop.jpg",
      shopId: shop.id,
    },
  });

  const media3 = await prisma.media.create({
    data: {
      type: "image",
      url: "https://example.com/vacuum.jpg",
      shopId: shop.id,
    },
  });

  const electronicsCategory = await prisma.productCategory.create({
    data: {
      title: "Electronics",
      shopId: shop.id,
      products: {
        create: [
          {
            title: "Smartphone",
            description: "A high-quality smartphone",
            draft: false,
            shopId: shop.id,
            ProductMedia: {
              create: [
                {
                  mediaId: media1.id,
                },
              ],
            },
          },
          {
            title: "Laptop",
            description: "A powerful laptop",
            draft: false,
            shopId: shop.id,
            ProductMedia: {
              create: [
                {
                  mediaId: media2.id,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const homeAppliancesCategory = await prisma.productCategory.create({
    data: {
      title: "Home Appliances",
      shopId: shop.id,
      products: {
        create: [
          {
            title: "Vacuum Cleaner",
            description: "Efficient vacuum cleaner",
            draft: true,
            shopId: shop.id,
            ProductMedia: {
              create: [
                {
                  mediaId: media3.id,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Data seeded successfully!");
  console.log("Shop created with ID:", shop.id);
  console.log("Electronics category created with ID:", electronicsCategory.id);
  console.log(
    "Home Appliances category created with ID:",
    homeAppliancesCategory.id,
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
