export default async (req) => {
  // Дозволяємо тільки POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        error: 'Method not allowed',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const order = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(
        JSON.stringify({
          error: 'Telegram environment variables are missing',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
`.trim();

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      return new Response(
        JSON.stringify({
          error: 'Telegram API error',
          details: telegramResult,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('send-order error:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};