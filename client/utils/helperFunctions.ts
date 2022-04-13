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
      if(typeof input[key] === 'object' && input !== null) {
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