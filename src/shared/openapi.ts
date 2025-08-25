export const schemas = {
  Category: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string" },
    },
    required: ["id", "name"],
  },
  Seller: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      sales: { type: "integer" },
    },
    required: ["id", "name", "email", "phone", "sales"],
  },
  Product: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      realUrl: { type: "string", format: "uri" },
      sellerId: { type: "string" },
      name: { type: "string" },
      categoryId: { type: "string" },
      price: { type: "number" },
      quantity: { type: "integer" },
      sales: { type: "integer" },
      rating: { type: "number" },
      condition: { type: "string" },
      description: { type: "string" },
      images: { type: "array", items: { type: "string", format: "uri" } },
      productFeatures: { type: "object", additionalProperties: true },
    },
    required: [
      "id",
      "realUrl",
      "sellerId",
      "name",
      "categoryId",
      "price",
      "quantity",
      "sales",
      "rating",
      "condition",
      "description",
    ],
  },
};


