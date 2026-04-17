import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// 🔥 SUA CONFIG SUPABASE
const supabase = createClient(
  "https://fmsfuljstzjnlfydediy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtc2Z1bGpzdHpqbmxmeWRlZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODA4NjQsImV4cCI6MjA5MTk1Njg2NH0.NlpHm54vud3qT5vOs9eHQLEt0PlU8jcAHly5VvgVBXM"
);

// rota teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// teste banco
app.get("/api/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("instagram_accounts")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});
