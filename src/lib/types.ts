export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  read_minutes: number | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductKind = "service" | "digital" | "physical";

export type Product = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  description: string;
  price_cents: number;
  price_on_request: boolean;
  currency: string;
  image_url: string | null;
  icon: string;
  category: string;
  badge: string | null;
  kind: ProductKind;
  stock: number | null;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export type Order = {
  id: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  email: string | null;
  customer_name: string | null;
  status: OrderStatus;
  amount_cents: number;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  unit_price_cents: number;
  quantity: number;
};

export type ContactMessage = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  interest: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};
