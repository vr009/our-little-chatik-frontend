import chats from './chatsMock.json';
import messages from './messagesMock.json';

const promiseResponse = data =>
    new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (Object.keys(data).length != 0) {
                resolve(data);
            } else {
                resolve("no data");
            }
        }, 1000);
    });

export const getChats = () => promiseResponse(chats);

export const getMessages = SenderID => {
    const accountOperations = messages[SenderID] || [];

    return promiseResponse(accountOperations);
};
