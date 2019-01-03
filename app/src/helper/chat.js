export function createChatId(users) {
    const mails = users.map((user) => user.email);
    return mails.sort().join();
}
