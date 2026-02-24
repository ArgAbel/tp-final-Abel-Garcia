import { Router } from "express";
import * as Mascotas from "../controller/Mascotas.controller";
import validateDto from "../middleware/dto.middleware";

const router = Router();
import { authenticate, authorize } from "../middleware/auth.middleware";

router.get(
  "/",
  authorize("veterinario:read", "Dveterinario:read"),
  Mascotas.getAll,
);
router.get(
  "/:id",
  authorize("veterinario:read", "Dveterinario:read"),
  Mascotas.getById,
);
router.post(
  "/",
  validateDto,
  authorize("Dveterinario:create", "veterinario:create"),
  Mascotas.create,
);
router.put(
  "/:id",
  validateDto,
  authorize("Dveterinario:update", "veterinario:update"),
  Mascotas.update,
);
router.delete(
  "/:id",
  validateDto,
  authorize("Dveterinario:delete"),
  Mascotas.remove,
);

export default router;
