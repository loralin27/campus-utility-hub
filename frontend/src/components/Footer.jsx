function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4 text-center">
        
        <h5 className="mb-2">Campus Utility Hub</h5>

        <p className="mb-1">
          Share resources • Find lost items • Borrow utilities
        </p>

        <small>
          © {new Date().getFullYear()} Campus Utility Hub | All Rights Reserved
        </small>

        <div className="mt-3">
          <a
            href="https://github.com/"
            target="_blank"
            className="text-light me-3"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            className="text-light"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;