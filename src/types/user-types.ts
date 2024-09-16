export interface LoginInfo {
  username: string,
  password: string,
}

export interface User {
  _id: string,
  username: string,
  projects: ProjectData[],
}