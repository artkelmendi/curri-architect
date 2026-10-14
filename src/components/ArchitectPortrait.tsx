import Image from "next/image";

export default function ArchitectPortrait({ alt }: { alt: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <figure className="architect-portrait" aria-label={alt}>
      <div className="architect-portrait__crop">
        <Image src={`${basePath}/images/architect-portrait.jpg`} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="architect-portrait__image" />
      </div>
      <span className="architect-portrait__line architect-portrait__line--top" aria-hidden="true" />
      <span className="architect-portrait__line architect-portrait__line--right" aria-hidden="true" />
      <span className="architect-portrait__line architect-portrait__line--bottom" aria-hidden="true" />
      <span className="architect-portrait__line architect-portrait__line--left" aria-hidden="true" />
    </figure>
  );
}
