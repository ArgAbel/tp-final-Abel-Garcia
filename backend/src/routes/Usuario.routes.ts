import { Router } from "express";
import * as Usuario from "../controller/Usuario.controller";
import validateDto from "../middleware/dto.middleware";

const router = Router();
import { authenticate, authorize } from "../middleware/auth.middleware";

router.get("/", validateDto, authorize("SuperAdmin:read"), Usuario.getAll);
router.get("/:id", validateDto, authorize("SuperAdmin:read"), Usuario.getById);
router.post("/", validateDto, authorize("SuperAdmin:create"), Usuario.create);
router.put(
  "/:id",
  validateDto,
  authorize("Dveterinario:update", "SuperAdmin:update"),
  Usuario.update,
);
router.delete(
  "/:id",
  validateDto,
  authorize("SuperAdmin:delete"),
  Usuario.remove,
);

export default router;
