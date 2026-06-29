import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  FileText,
  BookOpen,
  ShieldAlert,
  FolderOpen,
  MessageCircle,
} from "lucide-react";
import { getDocuments } from "@/lib/catalog/catalog.repository";
import { docTypeLabel } from "@/lib/catalog/format";
import { buildMetadata, breadcrumbJsonLd, documentListJsonLd } from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import type { SiteDocument } from "@/domain/catalog/catalog.types";
import { ASSETS } from "@/assets/files";
import { buildWhatsAppLink } from "@/lib/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Descargas y documentación técnica",
  path: "/descargas",
  description:
    "Descarga catálogos, el Manual del Constructor Sika, fichas técnicas y hojas de seguridad. Toda la documentación Sika para aplicar correctamente en tu obra.",
  keywords: ["fichas técnicas Sika", "manual del constructor Sika", "hojas de seguridad Sika"],
});

const DOC_ICONS: Record<string, typeof FileText> = {
  catalogo: FolderOpen,
  manual: BookOpen,
  ficha_tecnica: FileText,
  hoja_seguridad: ShieldAlert,
  comercial: FileText,
};

function DocumentCard({ doc }: { doc: SiteDocument }) {
  const href = doc.file?.url || doc.external_url || "#";
  const Icon = (doc.doc_type && DOC_ICONS[doc.doc_type]) || FileText;
  return (
    <div className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="size-6" />
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {docTypeLabel(doc.doc_type)}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">
        {doc.title}
      </h3>
      {doc.description && (
        <p className="mt-2.5 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {doc.description}
        </p>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand"
      >
        <Download className="size-4" /> Descargar
      </a>
    </div>
  );
}

const DOC_TYPES_INFO = [
  { label: "Catálogos", text: "Portafolio de productos por línea de solución." },
  { label: "Manuales", text: "Guías de aplicación y el Manual del Constructor." },
  { label: "Fichas técnicas", text: "Especificaciones, rendimientos y dosificación." },
  { label: "Hojas de seguridad", text: "Manejo seguro y almacenamiento (MSDS)." },
];

export default async function DescargasPage() {
  const documents = await getDocuments();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Descargas", path: "/descargas" }])} />
      <JsonLd data={documentListJsonLd(documents)} />

      <PageHero
        eyebrow="Documentación"
        title="Descargas de documentación técnica"
        description="Catálogos, manuales, fichas técnicas y hojas de seguridad para que apliques cada producto Sika con total respaldo."
        crumbs={[{ name: "Descargas" }]}
        image={ASSETS.structure.url}
      />

      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container-x">
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc, i) => (
                <Reveal key={doc._id} delay={i * 60}>
                  <DocumentCard doc={doc} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-white py-16 text-center">
              <FolderOpen className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-4 font-display text-lg font-bold text-ink">
                Documentación en preparación
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Escríbenos y te enviamos la ficha técnica que necesites.
              </p>
            </div>
          )}

          {/* What you'll find */}
          <div className="mt-16">
            <h2 className="font-display text-xl font-bold text-ink">
              ¿Qué encontrarás aquí?
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DOC_TYPES_INFO.map((t) => (
                <div
                  key={t.label}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <h3 className="font-display text-base font-bold text-ink">
                    {t.label}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Help band */}
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-ink p-8 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                ¿No encuentras un documento?
              </h2>
              <p className="mt-1.5 text-sm text-white/65">
                Solicítanos la ficha técnica u hoja de seguridad de cualquier
                producto Sika y te la hacemos llegar.
              </p>
            </div>
            <a
              href={buildWhatsAppLink("Hola Tradesika, necesito la ficha técnica de un producto Sika.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <MessageCircle className="size-5" /> Solicitar documento
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
