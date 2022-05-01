export interface accountStructure {
  username: String,
  password: String,
  gender?: String
}

export const validate = (method:boolean, account:accountStructure):boolean => {
  if(!method && (account.gender !== 'male' && account.gender !== 'female')) return false;
  for(const key in account) {
    const str = account[key];
    if(key === 'username' && str.length < 3 && str.length > 20) return false;
    else if(key === 'password' && str.length < 4) return false;
    if(!str.length) return false;
    for(let i = 0; i < str.length; i++) {
      if(!(/[A-Za-z0-9]/.test(str[i])) && key==='username') return false;
    }
  }
  return true;
}

export const deepCopy = <T>(input: T): T => {
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
  let picture = pictures[main]?.iconBig;
  if(main.startsWith('traveler')) {
    if(gender === 'male') {
      picture = pictures.aether?.iconBig;
    } else if(gender === 'female') {
      picture = pictures.lumine?.iconBig;
    }
  } else if(main === 'thoma') {
    picture = 'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Tohma.png';
  } else if(main === 'yae-miko') {
    picture = 'https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Yae.png'
  }
  return picture;
}

import pictures from '../assets/preload';

export const portrait = (main: string, gender: string) => {
  if(typeof main !== 'string' || typeof gender !== 'string') return;
  if(main.startsWith('traveler')) {
    if(gender === 'male') {
      return pictures.aether?.portrait;
    } else if (gender === 'female') {
      return pictures.lumine?.portrait;
    }
  } else if(main === 'yae-miko') {
    return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5e5896a5-4a79-496a-bea4-81f26cfa2650/df0i8p6-66404a6c-a1f4-4e9f-bf50-4f135c5471c1.png/v1/fill/w_1280,h_1587,strp/yae_miko_genshin_impact_character_render_by_deg5270_df0i8p6-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU4NyIsInBhdGgiOiJcL2ZcLzVlNTg5NmE1LTRhNzktNDk2YS1iZWE0LTgxZjI2Y2ZhMjY1MFwvZGYwaThwNi02NjQwNGE2Yy1hMWY0LTRlOWYtYmY1MC00ZjEzNWM1NDcxYzEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rNLMXuf_g_kRCKDv9kOQhsG0V3HsCoDlg6A6sGBOliw';
  }

  return pictures[main]?.portrait;
}

export const iconSide = (main: string, gender: string):string => {
  if(typeof main !== 'string' || typeof gender !== 'string') return;
  if(main.startsWith('traveler')) {
    if(gender === 'male') {
      return pictures.aether?.iconSide;
    } else if (gender === 'female') {
      return pictures.lumine?.iconSide;
    }
  }

  return pictures[main]?.iconSide;
}