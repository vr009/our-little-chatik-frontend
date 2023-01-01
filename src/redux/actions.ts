export const selectChat = (
    id: string,
    name: string,
    creationTime: string,
) => ({
    type: 'SELECT_CHAT',
    id,
    name,
    creationTime,
} as const);


const actions = {
    selectChat,
}

export type Actions = {
    [Key in keyof typeof actions]: ReturnType<typeof actions[Key]>;
} [keyof typeof actions]


