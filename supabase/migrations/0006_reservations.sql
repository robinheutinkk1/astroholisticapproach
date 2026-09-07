-- The shop no longer takes payment on the site. A shopper reserves what is in
-- the cart, Milan reviews it, and payment is arranged between them by e-mail.
--
-- A reservation is an order that has not been paid: same table, two new
-- statuses. The old ones stay valid so Stripe can come back later untouched.
--
--   requested  new, not yet looked at
--   confirmed  Milan said yes — stock is held from this point
--   fulfilled  paid and delivered
--   cancelled  declined, or the customer dropped out — stock is released

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders
  add constraint orders_status_check
  check (status in ('requested', 'confirmed', 'pending', 'paid', 'fulfilled', 'cancelled'));

alter table public.orders
  add column if not exists phone text,
  add column if not exists note  text;

-- Stock is held while an order is in one of these states.
create or replace function public.order_holds_stock(p_status text)
returns boolean
language sql
immutable
as $$
  select p_status in ('confirmed', 'paid', 'fulfilled');
$$;

-- Changes an order's status and moves stock with it, in one transaction, so a
-- double click or a lost connection can never hold or release stock twice.
-- Products without a stock figure (unlimited) are left alone.
create or replace function public.set_order_status(p_order uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_old text;
  v_delta integer;
begin
  select status into v_old from public.orders where id = p_order for update;
  if v_old is null then
    raise exception 'order % not found', p_order;
  end if;
  if v_old = p_status then
    return;
  end if;

  -- Into a holding state: take the stock. Out of one: give it back.
  v_delta := case
    when not public.order_holds_stock(v_old) and public.order_holds_stock(p_status) then -1
    when public.order_holds_stock(v_old) and not public.order_holds_stock(p_status) then  1
    else 0
  end;

  if v_delta <> 0 then
    update public.products p
       set stock = greatest(0, p.stock + v_delta * i.quantity)
      from public.order_items i
     where i.order_id = p_order
       and i.product_id = p.id
       and p.stock is not null;
  end if;

  update public.orders set status = p_status where id = p_order;
end;
$$;

-- Only the server (service role) may call this; the anon and authenticated
-- roles never touch it.
revoke all on function public.set_order_status(uuid, text) from public, anon, authenticated;
