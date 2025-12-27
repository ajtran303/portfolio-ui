import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <p>&copy; {currentYear} AJ Tran. All rights reserved.</p>
      <p>
        <a href="mailto:ajtrandev@gmail.com">ajtrandev@gmail.com</a>
      </p>
    </footer>
  );
}
