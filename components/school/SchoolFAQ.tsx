const questions = [
  {
    question: "What age groups does the school welcome?",
    answer:
      "Our school welcomes students across the relevant grade levels, with programmes designed to support each stage of their academic and personal development.",
  },
  {
    question: "What curriculum does the school follow?",
    answer:
      "The school follows a structured academic curriculum designed to build strong foundations while encouraging curiosity, creativity, and independent thinking.",
  },
  {
    question: "How can I apply for admission?",
    answer:
      "Families can begin the admission process by submitting an enquiry and connecting with our admissions team for the next steps.",
  },
  {
    question: "Can parents visit the campus?",
    answer:
      "Yes. Families can contact the school to arrange a campus visit and learn more about our learning environment.",
  },
  {
    question: "What activities are available beyond academics?",
    answer:
      "Students can participate in a variety of sports, creative activities, clubs, events, and experiences that support confidence, collaboration, and personal growth.",
  },
  {
    question: "How can I contact the school?",
    answer:
      "Use the contact options provided on this website to connect with our admissions or school administration team.",
  },
];

export default function SchoolFAQ() {
  return (
    <section id="faq" className="school-faq">
      <div className="school-section-shell">
        <header className="school-faq-header">
          <div>
            <p className="school-eyebrow">QUESTIONS, ANSWERED</p>
            <h2 className="school-serif school-section-title">
              Everything you need to know
            </h2>
          </div>
          <p className="school-section-intro">
            Find answers to some of the most common questions about learning,
            admissions, campus life, and our community.
          </p>
        </header>

        <div className="school-faq-list">
          {questions.map((item, index) => (
            <details className="school-faq-item" key={item.question}>
              <summary>
                <span className="school-faq-number school-mono">
                  0{index + 1}
                </span>
                <span className="school-faq-question">{item.question}</span>
                <span className="school-faq-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
