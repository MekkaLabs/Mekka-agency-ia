import Link from "next/link";
import { LeadCreateForm } from "../_components/lead-create-form";

export default function NewLead() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/leads"
          className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          &larr; todos os leads
        </Link>
        <h1 className="font-display mt-2 text-2xl font-semibold">Novo lead</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Cadastre manualmente leads que chegaram fora do site (WhatsApp,
          indicação, evento).
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-surface/50 p-6">
        <LeadCreateForm />
      </div>
    </div>
  );
}
