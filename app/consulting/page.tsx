const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3RYzWv-yZX9WSUnoAr8sFBV-YmpzKmx_gL-RoD7ojp28JJBAj-HRVkRhXxKpSwUYOT50idFV1u";

export const metadata = {
  title: "Consulting",
  description:
    "IT cost optimization and technology strategy for finance leaders.",
};

export default function Consulting() {
  return (
    <div className="max-w-measure mx-auto px-[30px] pt-11">
      <div className="kicker mb-4">Consulting</div>

      <h1 className="font-display font-semibold text-[27px] leading-[1.28] max-w-[20ch]">
        IT spend optimization for finance leaders who didn&rsquo;t sign up to
        manage a tech budget.
      </h1>

      <div className="prose-custom mt-6 text-[16px] leading-[1.75] text-primary">
        <p>
          Every month you delay aligning IT with your business objectives, vendor
          auto-renewals compound and your options narrow. I help you find the
          budget already inside your existing spend &mdash; before the decision
          gets made under pressure.
        </p>
        <p>
          Past clients have cut operational spend by 30% and reduced downtime by
          66%. The work is usually a fixed-scope review: where the money goes,
          what&rsquo;s renewing when, and which line items are funding something
          nobody uses anymore.
        </p>
      </div>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-bg bg-accent hover:bg-accent-hover transition-colors px-6 py-3.5 rounded"
      >
        Book a free 15-min discovery call
      </a>

      <p className="mt-5 font-mono text-[11.5px] text-muted">
        Or email{" "}
        <a
          href="mailto:d.vidal@outlook.com"
          className="text-accent hover:underline"
        >
          d.vidal@outlook.com
        </a>
        .
      </p>
    </div>
  );
}
