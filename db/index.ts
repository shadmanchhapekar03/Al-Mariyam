import * as schema from "./schema";

// Mock database for prototyping - in-memory storage
class MockDatabase {
  private appointments: any[] = [];
  private contactMessages: any[] = [];
  private products: any[] = [];
  private cartItems: any[] = [];
  private orders: any[] = [];
  private orderItems: any[] = [];
  private lastIds = {
    appointments: 0,
    contactMessages: 0,
    products: 0,
    cartItems: 0,
    orders: 0,
    orderItems: 0,
  };

  // Helper to create mock query builder
  private createQueryBuilder(table: string) {
    return {
      insert: (data: any) => ({
        values: (vals: any) => {
          const id = ++this.lastIds[table as keyof typeof this.lastIds];
          const record = { id, ...vals, createdAt: new Date().toISOString() };
          this.getCollection(table).push(record);
          return Promise.resolve([record]);
        },
      }),
      select: () => ({
        from: (t: any) => ({
          where: (condition: any) => Promise.resolve(this.getCollection(table)),
          all: () => Promise.resolve(this.getCollection(table)),
        }),
        all: () => Promise.resolve(this.getCollection(table)),
      }),
      update: (data: any) => ({
        set: (vals: any) => ({
          where: (condition: any) => {
            const collection = this.getCollection(table);
            const idx = collection.findIndex((item: any) => Object.entries(condition).every(([k, v]: any) => item[k] === v));
            if (idx >= 0) {
              collection[idx] = { ...collection[idx], ...vals };
            }
            return Promise.resolve([collection[idx]]);
          },
        }),
      }),
      delete: () => ({
        where: (condition: any) => {
          const collection = this.getCollection(table);
          const idx = collection.findIndex((item: any) => Object.entries(condition).every(([k, v]: any) => item[k] === v));
          if (idx >= 0) {
            collection.splice(idx, 1);
          }
          return Promise.resolve([]);
        },
      }),
    };
  }

  private getCollection(table: string): any[] {
    switch (table) {
      case "appointments":
        return this.appointments;
      case "contact_messages":
        return this.contactMessages;
      case "products":
        return this.products;
      case "cart_items":
        return this.cartItems;
      case "orders":
        return this.orders;
      case "order_items":
        return this.orderItems;
      default:
        return [];
    }
  }

  // Drizzle-like interface
  query = {
    appointments: this.createQueryBuilder("appointments"),
    contactMessages: this.createQueryBuilder("contact_messages"),
    products: this.createQueryBuilder("products"),
    cartItems: this.createQueryBuilder("cart_items"),
    orders: this.createQueryBuilder("orders"),
    orderItems: this.createQueryBuilder("order_items"),
  };

  // Direct access for simple operations
  insert(table: string) {
    return this.createQueryBuilder(table).insert({});
  }

  select(table: string) {
    return this.createQueryBuilder(table).select();
  }

  update(table: string, data: any) {
    return this.createQueryBuilder(table).update(data);
  }

  delete(table: string) {
    return this.createQueryBuilder(table).delete();
  }

  // Simple helpers for API routes
  async getAppointments() {
    return this.appointments;
  }

  async createAppointment(data: any) {
    const appointment = { id: ++this.lastIds.appointments, ...data, createdAt: new Date().toISOString() };
    this.appointments.push(appointment);
    return appointment;
  }

  async getContactMessages() {
    return this.contactMessages;
  }

  async createContactMessage(data: any) {
    const message = { id: ++this.lastIds.contactMessages, ...data, createdAt: new Date().toISOString() };
    this.contactMessages.push(message);
    return message;
  }

  async getProducts() {
    return this.products;
  }

  async getProductBySlug(slug: string) {
    return this.products.find(p => p.slug === slug);
  }

  async getCartItems(sessionId: string) {
    return this.cartItems.filter(item => item.sessionId === sessionId);
  }

  async addToCart(sessionId: string, productId: number, quantity: number) {
    const existing = this.cartItems.find(item => item.sessionId === sessionId && item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      return existing;
    }
    const item = { id: ++this.lastIds.cartItems, sessionId, productId, quantity, createdAt: new Date().toISOString() };
    this.cartItems.push(item);
    return item;
  }

  async updateCartItem(id: number, quantity: number) {
    const item = this.cartItems.find(c => c.id === id);
    if (item) item.quantity = quantity;
    return item;
  }

  async removeFromCart(id: number) {
    const idx = this.cartItems.findIndex(c => c.id === id);
    if (idx >= 0) this.cartItems.splice(idx, 1);
  }

  async createOrder(data: any) {
    const order = { id: ++this.lastIds.orders, ...data, createdAt: new Date().toISOString() };
    this.orders.push(order);
    return order;
  }

  async getOrders() {
    return this.orders;
  }

  async getOrderByNumber(orderNumber: string) {
    return this.orders.find(o => o.orderNumber === orderNumber);
  }

  async addOrderItem(data: any) {
    const item = { id: ++this.lastIds.orderItems, ...data };
    this.orderItems.push(item);
    return item;
  }

  async getOrderItems(orderId: number) {
    return this.orderItems.filter(item => item.orderId === orderId);
  }
}

export const db = new MockDatabase();
