export interface accountStructure {
  username: String,
  password: String,
  gender?: String
}

export const validate = (method:boolean, account:accountStructure):boolean => {
  if(!method && (account.gender !== 'male' && account.gender !== 'female')) return false;
  for(const key in account) {
    const str = account[key];
    // if(key === 'username' && str.length < 3 && str.length > 20) return false;
    // else if(key === 'password' && str.length < 4) return false;
    if(!str.length) return false;
    for(let i = 0; i < str.length; i++) {
      if(!(/[A-Za-z0-9]/.test(str[i]))) return false;
    }
  }
  return true;
}

export const deepCopy = (input: any) => {
  if(typeof input === 'object' && input !== null) {
    const clone = input.constructor();
    for(const key in input) {
      if(typeof input[key] === 'object' && key !== 'socket' && input !== null) {
        clone[key] = deepCopy(input[key]);
      } else {
        clone[key] = input[key];
      }
    }
    return clone;
  } else {
    return input;
  }
}

export const titleCase = (str: string) => {
  if(typeof str !== 'string') return;
  return str?.split('-')
    .map((el:string) => el[0]?.toUpperCase() + el?.slice(1))
    .join(' ');
}

export const backupCase = (str: string) => {
  if(typeof str !== 'string') return;
  return str[0].toUpperCase() + str.slice(1).replace('-', '');
}

export const iconBig = (main: string, gender: string) => {
  if(typeof main !== 'string' || typeof gender !== 'string') return;
  let picture = `https://api.genshin.dev/characters/${main}/icon-big`;
  let backupPicture = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${backupCase(main)}.png`;
  if(main.startsWith('traveler')) {
    if(gender === 'male') {
      picture = `https://api.genshin.dev/characters/traveler-anemo/icon-big-aether`
      backupPicture = 'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_PlayerBoy.png';
    } else if(gender === 'female') {
      picture = `https://api.genshin.dev/characters/traveler-anemo/icon-big-lumine`
      backupPicture = 'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_PlayerGirl.png';
    }
  } else if(main === 'thoma') {
    picture = 'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Tohma.png';
  }
  return {
    picture,
    backupPicture,
  }
}

export const portrait = (main:string, gender: string) => {
  if(typeof main !== 'string' || typeof gender !== 'string') return;
  if(main.startsWith('traveler')) {
    if(gender === 'male') {
      return 'https://api.genshin.dev/characters/traveler-anemo/portraitm'
    } else if (gender === 'female') {
      return 'https://api.genshin.dev/characters/traveler-anemo/portraitf'
    }
  }

  return `https://api.genshin.dev/characters/${main}/portrait`
}