import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const titulo = formData.get("titulo")?.toString();
  const subtitulo = formData.get("subtitulo")?.toString();
  const cuerpo = formData.get("cuerpo")?.toString();

  if (!titulo || !subtitulo || !cuerpo) {
    return new Response("Faltan campos obligatorios", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const articlesRef = db.collection("Blogs");
    await articlesRef.add({
      titulo,
      subtitulo,
      cuerpo,
    });
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
  return redirect("/");
};
