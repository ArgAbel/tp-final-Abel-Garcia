import { Router } from "express";
import * as Dueno from "../controller/Dueno.controller";
import validateDto from "../middleware/dto.middleware";

const router = Router();
import { authenticate, authorize } from "../middleware/auth.middleware";

router.get(
  "/",
  authorize("veterinario:read", "Dveterinario:read"),
  validateDto,
  Dueno.getAll,
);
router.get(
  "/:id",
  validateDto,
  authorize("veterinario:read", "Dveterinario:read"),
  Dueno.getById,
);
router.post(
  "/",
  validateDto,
  authorize("Dveterinario:create", "veterinario:create"),
  Dueno.create,
);
router.put(
  "/:id",
  validateDto,
  authorize("Dveterinario:update", "veterinario:update"),
  Dueno.update,
);
router.delete(
  "/:id",
  authorize("Dveterinario:delete"),
  validateDto,
  Dueno.remove,
);

export default router;
