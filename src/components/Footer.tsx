import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} AJ Tran. All rights reserved.
      </p>
      <p>
        <a href="mailto:ajtrandev@gmail.com">ajtrandev@gmail.com</a>
      </p>
    </footer>
  );
};

export default Footer;
