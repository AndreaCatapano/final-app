function Header() {
  <>
    <header>
      <nav id="header-nav">
        <div id="header-title">
          <a href="/">
            <h1>Plant - Shop</h1>
          </a>
        </div>

        <div id="header-link">
          <button id="hamburger-button">
            <img src="/img/icon_menu.svg" alt="hamburger menu" />
          </button>
          <a href="/about">About</a>
          <a href="/plants">Plants</a>
          <a href="/contacts">Contact</a>
        </div>
      </nav>

      <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-links">
          <a href="/about">About</a>
          <a href="/plants">Plants</a>
          <a href="/contacts">Contact</a>
        </div>
      </div>
    </header>
  </>;
}
