export interface accountStructure {
  username: String,
  password: String,
  gender?: String
}

export const validate:Function = (account:accountStructure):boolean => {
  for(const key in account) {
    const str = account[key];
    if(!str.length) return false;
    for(let i = 0; i < str.length; i++) {
      if(!(/[A-Za-z0-9]/.test(str[i]))) return false;
    }
  }
  return true;
}