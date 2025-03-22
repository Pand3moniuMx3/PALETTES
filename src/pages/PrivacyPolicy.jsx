import Badge from "../components/Badge";
import "../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <section>
      <div className="container privacy-policy">
        <div className="row">
          <h2>Privacy Policy</h2>
          <Badge customClass="effective-date">Effective date: 15.03.2025</Badge>
          <p>
            Thank you for using Palettes! Your privacy is important to be, and
            this Privacy Policy explains how I collect, use, and protect your
            information.
          </p>
        </div>
        <div className="row">
          <h3>1. Information I collect</h3>
          <p>
            I only collect your email address when you voluntarily provide it to
            us, such as when signing up for updates, newsletters, or other
            communications.
          </p>
        </div>
        <div className="row">
          <h3>2. How I use your information</h3>
          <p>I use your email address solely for the purpose of:</p>
          <ul>
            <li>
              Sending you updates, newsletters, or relevant information about
              our app.
            </li>
            <li>Responding to inquiries or support requests.</li>
            <li>Improving our services and user experience.</li>
          </ul>
          <p>
            I do not sell, rent, or share your email address with third parties
            for marketing purposes.
          </p>
        </div>
        <div className="row">
          <h3>3. Data storage and security</h3>
          <p>
            Your email address is securely stored in a Supabase database. I
            implement reasonable security measures to protect your information;
            however, no online service can be 100% secure. If I become aware of
            any security breach, I will take appropriate steps to notify you.
          </p>
        </div>
        <div className="row">
          <h3>4. Your rights and choices</h3>
          <p>
            You have the right to request deletion of your email address from
            our database by contacting us at srgmedia.agency@gmail.com.
          </p>
        </div>
        <div className="row">
          <h3>5. Third-Party Services</h3>
          <p>
            We may use third-party services to help operate our app, but we do
            not share your email with them unless required by law.
          </p>
        </div>
        <div className="row">
          <h3>6. Changes to this policy</h3>
          <p>
            We may update this Privacy Policy from time to time. If changes are
            made, we will notify you by posting the updated policy on this page
            with a revised "Effective Date."
          </p>
        </div>
        <div className="row">
          <h3>7. Contact Me</h3>
          <p>
            We may update this Privacy Policy from time to time. If changes are
            made, we will notify you by posting the updated policy on this page
            with a revised "Effective Date."
          </p>
        </div>
      </div>
    </section>
  );
}
