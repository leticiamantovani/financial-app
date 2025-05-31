"use client";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-background text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {/* Esquerda */}
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Finance.ia Todos os direitos
          reservados.
        </p>

        {/* Direita */}
        <p className="text-center sm:text-right">
          Made with <span className="text-pink-500">♥</span> by{" "}
          <a
            href="https://www.linkedin.com/in/leticiamantovanisilva"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Leticia Mantovani
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
