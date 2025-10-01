import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendOrderConfirmation(order: any) {
  if (!process.env.EMAIL_SERVER_USER) {
    console.log("Email not configured. Order confirmation skipped.");
    return;
  }

  const itemsList = order.items
    .map(
      (item: any) =>
        `- ${item.name} (Size: ${item.size}) x ${item.quantity} - $${item.price * item.quantity}`
    )
    .join("\n");

  const customerEmail = {
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: `Order Confirmation - ${order.orderNumber}`,
    text: `
Hello ${order.customerName},

Thank you for your order at Paula's Place!

Order Number: ${order.orderNumber}
Order Date: ${new Date(order.createdAt).toLocaleDateString()}

Items:
${itemsList}

Subtotal: $${order.subtotal}
Shipping: $${order.shipping}
Total: $${order.total}

Payment Method: ${order.paymentMethod.toUpperCase()}
Payment Status: ${order.paymentStatus}

Shipping Address:
${JSON.parse(order.shippingAddress).address}
${JSON.parse(order.shippingAddress).city}, ${JSON.parse(order.shippingAddress).state} ${JSON.parse(order.shippingAddress).zip}
${JSON.parse(order.shippingAddress).country}

We'll send you another email when your order ships.

Thank you for shopping with Paula's Place!

Best regards,
Paula's Place Team
    `,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Hello ${order.customerName},</p>
      <p>Your order has been confirmed.</p>
      <h3>Order Details</h3>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      <h3>Items</h3>
      <ul>
        ${order.items.map((item: any) => `<li>${item.name} (Size: ${item.size}) x ${item.quantity} - $${item.price * item.quantity}</li>`).join("")}
      </ul>
      <p><strong>Subtotal:</strong> $${order.subtotal}</p>
      <p><strong>Shipping:</strong> $${order.shipping}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
      <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
      <h3>Shipping Address</h3>
      <p>
        ${JSON.parse(order.shippingAddress).address}<br/>
        ${JSON.parse(order.shippingAddress).city}, ${JSON.parse(order.shippingAddress).state} ${JSON.parse(order.shippingAddress).zip}<br/>
        ${JSON.parse(order.shippingAddress).country}
      </p>
      <p>Thank you for shopping with Paula's Place!</p>
    `,
  };

  const adminEmail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_SERVER_USER,
    subject: `New Order - ${order.orderNumber}`,
    text: `
New order received!

Order Number: ${order.orderNumber}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}

Items:
${itemsList}

Total: $${order.total}
Payment Method: ${order.paymentMethod.toUpperCase()}

View order details in your admin dashboard.
    `,
  };

  try {
    await transporter.sendMail(customerEmail);
    await transporter.sendMail(adminEmail);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
