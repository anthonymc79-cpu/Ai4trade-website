// The vertical circuit trace running down the page margin — see the
// `.trace-rail` / `.trace-node` rules in globals.css. Purely decorative
// and hidden below 1200px, so it never fights mobile layout for space.
export default function CircuitTrace() {
  return (
    <div className="trace-rail" aria-hidden="true">
      <span className="trace-node" style={{ top: "12%" }} />
      <span className="trace-node" style={{ top: "38%" }} />
      <span className="trace-node" style={{ top: "64%" }} />
      <span className="trace-node" style={{ top: "88%" }} />
    </div>
  );
}
