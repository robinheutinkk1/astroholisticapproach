import { Btn, PageHeader, Section } from "@/components/Layout";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  // Unmatched URLs render under the root layout, which has no site frame of
  // its own, so this page brings it along.
  return (
    <SiteChrome>
      <PageHeader
        trail={[{ label: "Not found" }]}
        eyebrow="404"
        title='Nothing at <span class="accent">this address</span>'
        intro="The page you were looking for has moved or never existed."
      />
      <Section>
        <div className="cta-block reveal">
          <h2>Try one of these</h2>
          <p>The readings, the tariffs, or a short message describing what you are looking for.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="/" arrow>
              Back to home
            </Btn>
            <Btn href="/tariffs" variant="secondary">
              See the tariffs
            </Btn>
            <Btn href="/contact" variant="secondary">
              Contact
            </Btn>
          </div>
        </div>
      </Section>
    </SiteChrome>
  );
}
