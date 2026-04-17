import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// 🔐 CONFIG VIA ENV (Render)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// rota inicial
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// teste banco
app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("instagram_accounts")
      .select("*");

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
