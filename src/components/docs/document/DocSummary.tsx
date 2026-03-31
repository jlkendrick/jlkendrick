export default function DocSummary() {
  return (
    <section style={{ marginBottom: "0", marginTop: "16px" }}>
    <h2 className="docs-section-heading">Summary</h2>
    <hr className="docs-rule" />
      <p
        style={{
          fontSize: "0.6875rem",
          color: "var(--docs-text)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          lineHeight: 1.75,
        }}
      >
        I gravitate toward software engineering at the backend and platform layer that other engineers build on top of.
        What excites me most is designing scalable, intuitive infrastructure in the form of{" "}
        <span style={{ color: "var(--docs-accent)", fontWeight: 500 }}>internal developer tooling</span> and{" "}
        <span style={{ color: "var(--docs-accent)", fontWeight: 500 }}>novel abstractions</span> that compress complexity
        into clean, composable APIs. At Meta, this meant building a configuration-driven pipeline generator that let
        Data Scientists onboard new metric funnels in minutes instead of days, the goal being to encode domain
        expertise into an abstraction expressive enough that boilerplate simply ceases to exist. That same instinct shows
        up in tools like{" "}
        <span style={{ fontStyle: "italic" }}>Dirvana</span>, where I mapped navigation behavior into a small,
        self-contained object model that quietly learns from you. I think deeply about{" "}
        <span style={{ color: "var(--docs-accent)", fontWeight: 500 }}>object-oriented design</span>, not as a
        methodology to follow, but as a way of finding the natural seams in a problem and giving them first-class
        representation in code. The best systems I&apos;ve worked on feel inevitable in hindsight: each piece extensible,
        each interface obvious, each abstraction earning its value.
      </p>
    </section>
  );
}
