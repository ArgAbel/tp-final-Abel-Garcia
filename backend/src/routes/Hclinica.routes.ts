import { Router } from 'express';
import * as Hclinica from '../controller/Hclinica.controller';
import validateDto from '../middleware/dto.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
const router = Router();



router.get('/', authorize('veterinario:read','Dveterinario:read'), Hclinica.getAll);
router.get('/:id',authorize('veterinario:read','Dveterinario:read'), Hclinica.getById);
router.post('/', authorize('Dveterinario:create','veterinario:create'), Hclinica.create);
router.put('/:id',validateDto,authorize('Dveterinario:update','veterinario:update'), Hclinica.update);    
router.delete('/:id', authorize('Dveterinario:delete'), Hclinica.remove);

export default router;