/** The intake → treatment → evaluation triptych shared by both therapy pages. */
const steps = [
  {
    num: "A",
    title: "Intake interview",
    body: "We have a Zoom intake interview together. We get to know each other and formulate and record your problem or question in the form of a treatment plan. An intake interview lasts approximately 60 minutes. In it we also discuss the number of sessions, the frequency and the consultation costs, so that we both have a complete overview.",
  },
  {
    num: "B",
    title: "Treatment plan",
    body: "At the agreed time I contact you via Zoom and we begin treating your question or problem. We have an open discussion, each in our own familiar environment.",
  },
  {
    num: "C",
    title: "End of treatment",
    body: "Together we decide whether there are results and whether the chosen treatment plan was the right one. After each session we evaluate whether we are on the right track.",
  },
];

export function TreatmentSteps() {
  return (
    <div className="grid-3">
      {steps.map((step) => (
        <article className="card reveal" key={step.num}>
          <div className="method-num">{step.num}</div>
          <h3>{step.title}</h3>
          <p className="card-desc">{step.body}</p>
        </article>
      ))}
    </div>
  );
}
