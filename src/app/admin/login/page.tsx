"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

function AdminLoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const isEaster = params.get("easter") === "1";
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEaster) {
      // still allow direct access but hint
    }
  }, [isEaster]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Identifiants invalides");
      // store token via cookie already, redirect
      router.push("/admin/dz");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] bg-white border border-black/10 rounded-[24px] p-6 md:p-8 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#0A1931] text-white grid place-items-center mx-auto">
          <Lock size={20} />
        </div>
        <h1 className="text-center font-black text-2xl tracking-tighter mt-3">Accès Admin</h1>
        <p className="text-center text-sm text-black/50 mt-1">
          {isEaster ? "Accès caché • Badge ×5 validé" : "Espace réservé aux administrateurs"}
        </p>
        {!isEaster && (
          <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl">
            <ShieldAlert size={14} /> Astuce: cliquez 5 fois sur le badge HK dans la navbar.
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-black/40">ID ADMIN</label>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="31" inputMode="numeric" className="mt-1 w-full border border-black/10 rounded-full px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10" required />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest text-black/40">MOT DE PASSE</label>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="mt-1 w-full border border-black/10 rounded-full px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946]" required />
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">{error}</div>}
          <button disabled={loading} className="w-full bg-[#0A1931] text-white py-4 rounded-full font-black text-sm disabled:opacity-50 active:scale-[0.98] transition">
            {loading ? "..." : "Entrer →"}
          </button>
          <div className="text-center text-xs text-black/30">Protégé • Rate limit 5/min • hCaptcha après 3 échecs (à venir)</div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] grid place-items-center text-sm text-black/40">Chargement...</div>}>
      <AdminLoginInner />
    </Suspense>
  );
}
