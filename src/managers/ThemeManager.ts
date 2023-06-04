import Theme from '../utilities/Theme';

export default class ThemeManager {
  public static getTheme(): Theme {
    return {
      background: '#014040',
      ground: '#02735E',
      player: '#03A678',
      fruit: '#731702',
      light: '#F27405',
    };
  }
}
