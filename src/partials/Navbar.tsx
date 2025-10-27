import { Logo, NavbarTwoColumns, Section } from 'astro-boilerplate-components';

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href="/">
        <Logo
          icon={
            <svg
              className="mr-1 h-10 w-10 stroke-cyan-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none"></path>
              <rect x="3" y="12" width="6" height="8" rx="1"></rect>
              <rect x="9" y="8" width="6" height="12" rx="1"></rect>
              <rect x="15" y="4" width="6" height="16" rx="1"></rect>
              <path d="M4 20h14"></path>
            </svg>
          }
          name="Ixartz's Blog"
        />
      </a>

      <div className="flex items-center space-x-6 text-gray-800 transition-colors duration-300 dark:text-gray-100">
        <a
          href="/"
          className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          Home
        </a>
        <a
          href="/posts/"
          className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          Blogs
        </a>

        {/* <a
          href="/"
          className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          GitHub
        </a>
        <a
          href="/"
          className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          Twitter
        </a> */}
        <a
          href="/product/"
          className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          Product
        </a>
      </div>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };
