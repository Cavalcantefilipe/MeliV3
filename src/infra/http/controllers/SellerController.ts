import type { Request, Response } from "express";
import type { Seller } from "../../../domain/entities/index.js";
import { FileSellerRepository } from "../../repositories/SellerRepository.js";
import { sellerCreateSchema, sellerUpdateSchema } from "../../../presentation/validation/Seller.js";
import { FileProductRepository } from "../../repositories/ProductRepository.js";
import { CreateSeller } from "../../../application/usecases/seller/CreateSeller.js";
import { UpdateSeller } from "../../../application/usecases/seller/UpdateSeller.js";
import { DeleteSeller } from "../../../application/usecases/seller/DeleteSeller.js";
import { ListSellers } from "../../../application/usecases/seller/ListSellers.js";
import { GetSellerById } from "../../../application/usecases/seller/GetSellerById.js";

const repo = new FileSellerRepository();
const createSeller = new CreateSeller(repo);
const updateSeller = new UpdateSeller(repo);
const deleteSeller = new DeleteSeller(repo);
const listSellers = new ListSellers(repo);
const getSellerById = new GetSellerById(repo);

export const SellerController = {
  async list(req: Request, res: Response) {
    const items = await listSellers.execute();
    res.json(items);
  },

  async get(req: Request, res: Response) {
    const item = await getSellerById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Seller not found" });
    res.json(item);
  },

  async create(req: Request, res: Response) {
    const parsed = sellerCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await createSeller.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async update(req: Request, res: Response) {
    if ("id" in req.body) return res.status(400).json({ error: "Cannot update id" });
    const parsed = sellerUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const data = parsed.data;
      const payload: Partial<Omit<Seller, "id">> = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.email !== undefined) payload.email = data.email;
      if (data.phone !== undefined) payload.phone = data.phone;
      if (data.sales !== undefined) payload.sales = data.sales;
      const updated = await updateSeller.execute(String(req.params.id), payload);
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const products = new FileProductRepository();
      const inUse = await products.listBySeller(String(req.params.id));
      if (inUse.length > 0) return res.status(409).json({ error: "Seller in use by products" });
      await deleteSeller.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },
};


