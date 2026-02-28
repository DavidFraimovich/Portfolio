import Link from "next/link";

export default function LocaleEntryPage() {
  return (
    <main className="locale-chooser-wrap">
      <section className="locale-chooser card">
        <h1>Select Language | בחר שפה</h1>
        <p>Choose your preferred language to enter the portfolio.</p>
        <div className="locale-buttons">
          <Link className="cta" href="/en">
            English
          </Link>
          <Link className="cta cta-secondary" href="/he">
            עברית
          </Link>
        </div>
      </section>
    </main>
  );
}
