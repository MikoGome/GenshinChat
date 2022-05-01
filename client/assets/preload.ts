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

axios.get('/api/character/all')
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

export const sounds: HTMLAudioElement[] = [];
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/0_socu4w.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367773/1_upiwkf.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367773/2_ueea6t.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/3_yfodwk.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/4_ydoikh.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/5_thxali.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/6_pr4bdn.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/7_yczkix.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/8_wp2izg.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651367772/9_zyigw0.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651372163/10_twym3a.mp3'));
sounds.push(new Audio('https://res.cloudinary.com/miko2/video/upload/v1651385970/oi-paimon_uigsjj.mp3'));

export const sfx = (num:number, volume?:number):void => {
  sounds[num].volume = 1;
  if(volume) sounds[num].volume = volume;
  sounds[num].load();
  sounds[num].play();
};