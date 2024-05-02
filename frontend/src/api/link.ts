export const userRegister = "auth/";
export const userLogin = "auth/login";
export const userLogout = "auth/logout";
export const cycleToken = "refresh/";
export const createAuthor = "author/create";
export const findAuthor = (name: string) => `author/find/${name}`;
export const createSong = "song/create";
export const getNewSongList = "public/song/new-song";
export const findSong = (id: string) => `public/song/find/${id}`;
