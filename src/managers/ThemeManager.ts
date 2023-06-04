import Theme from '../utilities/Theme';

export default class ThemeManager {
  private static currentTheme: Theme;
  private static readonly themes: ReadonlyArray<Theme> = [
    {
      name: 'Green',
      scoreColor: 'yellow',
      background: '#014040',
      ground: '#02735E',
      player: '#03A678',
      fruit: '#731702',
      light: '#F27405',
    },
    {
      name: 'Candy',
      scoreColor: '#F2CB05',
      background: '#04B2D9',
      ground: '#04D94F',
      player: '#F28705',
      fruit: '#F2059F',
      light: '#F2CB05',
    },
    {
      name: 'Brown Forest',
      scoreColor: '#F2CB05',
      background: '#26240B',
      ground: '#593B16',
      player: '#BF9169',
      fruit: '#F2C094',
      light: '#F2E3D5',
    },
    {
      name: 'Pink',
      scoreColor: '#B3ECF2',
      background: '#8C0327',
      ground: '#D9436B',
      player: '#732240',
      fruit: '#F277A4',
      light: '#B3ECF2',
    },
    {
      name: 'Cosmic',
      scoreColor: '#F28066',
      background: '#150326',
      ground: '#5114A6',
      player: '#2B0B59',
      fruit: '#F2A25C',
      light: '#F28066',
    },
    {
      name: 'Mono',
      scoreColor: '#F2F2F2',
      background: '#262626',
      ground: '#595959',
      player: '#8C8C8C',
      fruit: '#D9D9D9',
      light: '#F2F2F2',
    },
    {
      name: 'Red',
      scoreColor: '#F2F2F2',
      background: '#0D0D0D',
      ground: '#911717',
      player: '#D9C6B0',
      fruit: '#BF0413',
      light: '#FEE8DA',
    },
    {
      name: 'Sunset',
      scoreColor: '#F2E85E',
      background: '#730C02',
      ground: '#D92B04',
      player: '#F26B1D',
      fruit: '#F2B441',
      light: '#F2E85E',
    },
    {
      name: 'Hacker',
      scoreColor: '#378C84',
      background: '#020D0C',
      ground: '#49BF9E',
      player: '#205B73',
      fruit: '#307B8C',
      light: '#307B8C',
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
