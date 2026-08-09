export default async (req) => {
  if (req.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const order = JSON.parse(req.body);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Telegram environment variables are missing',
        }),
      };
    }

    const customer = order.customer || {};
    const items = order.items || [];

    const itemsText = items
      .map((item) => {
        return `📦 ${item.name}
Розмір: ${item.size}
Кількість: ${item.quantity}
Ціна: ${item.price} грн`;
      })
      .join('\n\n');

    const delivery =
      order.deliveryMethod === 'pickup'
        ? '🏫 Забрати в ACE School'
        : '🚚 Нова пошта / кур’єр';

    const message = `
🛍 НОВЕ ЗАМОВЛЕННЯ

👤 ${customer.firstName || ''} ${customer.lastName || ''}
📞 ${customer.phone || ''}
✉️ ${customer.email || ''}
🏫 Клас: ${customer.class || 'Не вказано'}

${itemsText}

${delivery}

💬 Коментар:
${order.comment || 'Немає'}

💰 РАЗОМ: ${order.total} грн
`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message.trim(),
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Telegram API error',
          details: result,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};