import express from "express";
const router=express.Router();
import { adminLogin ,adminLogout} from "../controllers/adminAuthController.js";
import { protectAdmin } from "../middleware/adminAuth.js";


router.get('/',(req,res)=>{
    res.send("Admin Route");
});
router.post('/login', adminLogin);
router.get('/logout', protectAdmin, adminLogout);

export default router;