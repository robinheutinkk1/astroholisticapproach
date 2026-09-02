import { Button, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-32 text-center">
      <p aria-hidden className="text-4xl text-gold-300">
        ✷
      </p>
      <h1 className="mt-6 font-display text-4xl text-mist-100">Nothing at this address</h1>
      <p className="mx-auto mt-4 max-w-md text-mist-300">
        The page you were looking for has moved or never existed.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back to the site</Button>
        <Button href="/blog" variant="ghost">
          Journal
        </Button>
      </div>
    </Section>
  );
}
