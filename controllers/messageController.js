const Message = require('../models/Message');

// دالة إرسال رسالة
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // إنشاء رسالة جديدة
    const newMessage = new Message({
      name,
      email,
      message,
    });

    // حفظ الرسالة في MongoDB
    await newMessage.save();

    // الرد على الـ Front-End بنجاح
    res.status(200).json({ message: 'Message has been sent successfully!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// دالة جلب الرسائل
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// دالة حذف رسالة حسب الـ ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ message: 'Failed to delete message' });
  }
};

module.exports = { sendMessage, getMessages, deleteMessage };  // تصدير جميع الدوال