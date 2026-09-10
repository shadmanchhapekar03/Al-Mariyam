import * as schema from "./schema";

// Mock database for prototyping - in-memory storage
class MockDatabase {
  private appointments: any[] = [];
  private contactMessages: any[] = [];
  private products: any[] = [];
  private cartItems: any[] = [];
  private orders: any[] = [];
  private orderItems: any[] = [];

  // Appointments
  async createAppointment(data: any) {
    const appointment = { id: Date.now(), ...data, createdAt: new Date().toISOString() };
    this.appointments.push(appointment);
    return appointment;
  }

  async getAppointments() {
    return this.appointments;
  }

  // Contact Messages
  async createContactMessage(data: any) {
    const message = { id: Date.now(), ...data, createdAt: new Date().toISOString() };
    this.contactMessages.push(message);
    return message;
  }

  async getContactMessages() {
    return this.contactMessages;
  }

  // Products
  async getProducts() {
    return this.products;
  }

  async getProductBySlug(slug: string) {
    return this.products.find(p => p.slug === slug);
  }

  // Orders
  async createOrder(data: any) {
    const order = { id: Date.now(), ...data, createdAt: new Date().toISOString() };
    this.orders.push(order);
    return order;
  }

  async getOrders() {
    return this.orders;
  }
}

export const db = new MockDatabase();
