const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-500 dark:bg-dark shadow-inner py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} CodeQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
