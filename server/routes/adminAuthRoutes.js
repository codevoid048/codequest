import express from "express";
const router=express.Router();
import { protect } from "../middleware/auth.js";
import { adminLogin ,adminLogout} from "../controllers/adminAuthController.js";


router.get('/',(req,res)=>{
    res.send("Admin Route");
});
router.post('/login',adminLogin);
router.get('/logout',protect,adminLogout);

export default router;