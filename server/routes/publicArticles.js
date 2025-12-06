// routes/publicArticles.js ✅ NEW FILE
import { Router } from "express";
import { getAllArticles, getAllPublicArticles } from "../controllers/articleController.js";

const publicArticlesRoute = Router();

// ✅ NO AUTH - Public access
publicArticlesRoute.get("/", getAllPublicArticles);

export default publicArticlesRoute;
