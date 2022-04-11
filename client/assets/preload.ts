import axios from 'axios';

axios.get('https://api.genshin.dev/characters/')
  .then(res => {
    res.data.forEach(element => {
      if(element.startsWith('traveler')) {
        new Image().src = `https://api.genshin.dev/characters/${element}/portraitm`;
        new Image().src = `https://api.genshin.dev/characters/${element}/portraitf`;
        new Image().src = `https://api.genshin.dev/characters/${element}/icon-big-aether`;
        new Image().src = `https://api.genshin.dev/characters/${element}/icon-big-lumine`;
      } else {
        new Image().src = `https://api.genshin.dev/characters/${element}/portrait`;
        new Image().src = `https://api.genshin.dev/characters/${element}/icon-big`;
        new Image().src = `https://api.genshin.dev/characters/${element}/icon`;
      }
    });
  })