// src/data/mockData.js
export const mockChats = [
    {
        id: 1,
        name: "Phố Minh đã rời khỏi nhóm",
        type: "group",
        lastMessage: "Nguyen Chuong Jr. đã bị VĐ dz kick ra khỏi nhóm",
        time: "17 phút",
        members: ["Nguyen Chuong Jr.", "VĐ", "Bạn"],
    },
    {
        id: 2,
        name: "Cộng đồng nguồn Bộ Nội tiễn...",
        type: "group",
        lastMessage: "Nhật Tân: @Nguyen Huu L...",
        time: "36 phút",
        members: ["Nhật Tân", "Nguyen Huu L", "Bạn"],
    },
    {
        id: 3,
        name: "Chuu Hoen",
        type: "private",
        lastMessage: "Bận đây gửi mình đạn...",
        time: "1 giờ",
        members: ["Chuu Hoen", "Bạn"],
    },
];

export const mockMessages = {
    1: [
        {
        id: 1,
        sender: "Nguyen Chuong Jr.",
        content: "Thẻ đã rời khỏi nhóm mà trả lời Nguyeen Chuong Jr. đã bị VĐ dz kick ra khỏi nhóm",
        time: "22:29",
        },
        {
        id: 2,
        sender: "Bạn",
        content: "Lạ sao",
        time: "22:29",
        },
    ],
    2: [
        {
        id: 1,
        sender: "Nhật Tân",
        content: "@Nguyen Huu L...",
        time: "21:53",
        },
    ],
    3: [
        {
        id: 1,
        sender: "Chuu Hoen",
        content: "Bận đây gửi mình đạn...",
        time: "21:29",
        },
    ],
};