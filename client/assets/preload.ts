import axios from 'axios';

interface picturesShape {
  [name: string]: {
    portrait: string,
    iconBig: string,
    iconSide: string
    icon?: string,
    gachaSplash?: string
  }
}

const pictures: picturesShape = {};

axios.get('https://api.genshin.dev/characters/')
  .then(res => {
    res.data.forEach(element => {
      if(element.startsWith('traveler')) {
        pictures.aether = {
          portrait: new Image().src = `https://api.genshin.dev/characters/traveler-anemo/portraitm`,
          iconBig: new Image().src = `https://api.genshin.dev/characters/traveler-anemo/icon-big-aether`,
          iconSide: new Image().src = `https://api.genshin.dev/characters/traveler-anemo/icon-side-aether`
        };
        pictures.lumine = {
          portrait: new Image().src = `https://api.genshin.dev/characters/${element}/portraitf`,
          iconBig: new Image().src = `https://api.genshin.dev/characters/${element}/icon-big-lumine`,
          iconSide: new Image().src = `https://api.genshin.dev/characters/traveler-anemo/icon-side-lumine`
        };
      } else {
        pictures[element] = {
          portrait: new Image().src = `https://api.genshin.dev/characters/${element}/portrait`,
          iconBig: new Image().src = `https://api.genshin.dev/characters/${element}/icon-big`,
          iconSide: new Image().src = `https://api.genshin.dev/characters/${element}/icon-side`,
          icon: new Image().src = `https://api.genshin.dev/characters/${element}/icon`,
          gachaSplash: new Image().src = `https://api.genshin.dev/characters/${element}/gacha-splash`
        }
      }
    });
  })

  export default pictures;