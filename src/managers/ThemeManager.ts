import Theme from '../utilities/Theme';

export default class ThemeManager {
  private static currentTheme: Theme;
  private static readonly themes: ReadonlyArray<Theme> = [
    {
      name: 'Night Blue',
      scoreColor: 'yellow',
      background: '#014040',
      ground: '#02735E',
      player: '#03A678',
      fruit: '#731702',
      light: '#F27405',
    },
    {
      name: 'Night Blue 2',
      scoreColor: 'red',
      background: '#ffffff',
      ground: '#000000',
      player: '#ffffff',
      fruit: '#eeeeee',
      light: '#cccccc',
    },
  ];

  public static getTheme(): Theme {
    return ThemeManager.currentTheme;
  }

  public static setup() {
    ThemeManager.addDropdownToggleListener();
    ThemeManager.addThemesToDropdown();

    ThemeManager.currentTheme = ThemeManager.themes[0];
  }

  private static toggleDropdown() {
    const dropdownMenu = document.getElementById('theme-dropdown-menu');
    dropdownMenu!.style.display = dropdownMenu!.style.display === 'none' ? 'block' : 'none';
  }

  private static addDropdownToggleListener() {
    const dropdownMenu = document.getElementById('theme-dropdown-menu');
    dropdownMenu!.style.display = 'none';

    const toggleButton = document.getElementById('theme-dropdown-toggle-button');
    toggleButton?.addEventListener('click', () => {
      ThemeManager.toggleDropdown();
    });
  }

  private static changeTheme(themeName: string) {
    for (let theme of ThemeManager.themes) {
      if (theme.name === themeName) {
        ThemeManager.currentTheme = theme;
        ThemeManager.toggleDropdown();

        const themeChangedEvent = new CustomEvent('themeChangedEvent');
        window.dispatchEvent(themeChangedEvent);

        break;
      }
    }
  }

  public static onThemeChanged(callback: () => void) {
    window.addEventListener('themeChangedEvent', callback);
  }

  private static addThemesToDropdown() {
    const dropdownMenu = document.getElementById('theme-dropdown-menu');
    dropdownMenu!.innerHTML = '';

    ThemeManager.themes.forEach(theme => {
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = '#';
      a.textContent = theme.name;

      li.classList.add('.theme-dropdown-menu');
      li.appendChild(a);

      li.addEventListener('click', () => {
        ThemeManager.changeTheme(theme.name);
      });

      dropdownMenu!.appendChild(li);
    });
  }
}
