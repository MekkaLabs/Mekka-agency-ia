import Link from "next/link";
import { LeadCreateForm } from "../_components/lead-create-form";

export default function NewLead() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/leads"
          className="text-sm text-neutral-500 underline hover:text-neutral-900"
        >
          &larr; todos os leads
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Novo lead</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Cadastre manualmente leads que chegaram fora do site (WhatsApp,
          indicacao, evento).
        </p>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-6">
        <LeadCreateForm />
      </div>
    </div>
  );
}
