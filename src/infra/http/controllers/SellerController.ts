import type { Request, Response } from "express";
import type { Seller } from "../../../domain/entities/index.js";
import { sellerCreateSchema, sellerUpdateSchema } from "../../../presentation/validation/Seller.js";
import { CreateSeller } from "../../../application/usecases/seller/CreateSeller.js";
import { UpdateSeller } from "../../../application/usecases/seller/UpdateSeller.js";
import { DeleteSeller } from "../../../application/usecases/seller/DeleteSeller.js";
import { ListSellers } from "../../../application/usecases/seller/ListSellers.js";
import { GetSellerById } from "../../../application/usecases/seller/GetSellerById.js";
import { pickDefined } from "../../../shared/object.js";

 

export class SellerController {
  constructor(
    private readonly listSellers: ListSellers,
    private readonly getSellerById: GetSellerById,
    private readonly createSeller: CreateSeller,
    private readonly updateSeller: UpdateSeller,
    private readonly deleteSeller: DeleteSeller
  ) {}

  async list(req: Request, res: Response) {
    const items = await this.listSellers.execute();
    res.json(items);
  }

  async get(req: Request, res: Response) {
    const item = await this.getSellerById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Seller not found" });
    res.json(item);
  }

  async create(req: Request, res: Response) {
    const parsed = sellerCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await this.createSeller.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if ("id" in req.body) return res.status(400).json({ error: "Cannot update id" });
    const parsed = sellerUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const d = parsed.data as Partial<Omit<Seller, "id">>;
      const payload = pickDefined(d, [
        "name",
        "email",
        "phone",
        "sales",
      ] as const);
      const updated = await this.updateSeller.execute(String(req.params.id), payload);
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteSeller.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }
}


