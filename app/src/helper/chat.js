/**
 * generate the chatroomid for a userchat.
 * make them uniqe by sorting and joining the two user-mail-addresses.
 *
 * @param {Object} users the two users that want to chat.
 * @returns the id of the userchat
 */
export function createChatId(users) {
    const mails = users.map((user) => user.email);
    return mails.sort().join();
}
