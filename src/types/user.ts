export interface User {
    id: number
    name: string
    username: string
    password: string
}

export interface UserForFrontend extends Omit<User, 'password'> {
}