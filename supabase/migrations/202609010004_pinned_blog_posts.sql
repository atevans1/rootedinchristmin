alter table rooted_in_christ.posts add column if not exists pinned boolean not null default false;
create or replace function rooted_in_christ.enforce_four_pinned_posts()
returns trigger language plpgsql security definer set search_path = rooted_in_christ, pg_temp as $$
begin
  if new.pinned and (select count(*) from rooted_in_christ.posts where pinned and id <> new.id) >= 4 then
    raise exception 'Only four blog posts can be pinned.';
  end if;
  return new;
end;
$$;
drop trigger if exists rooted_in_christ_four_pins on rooted_in_christ.posts;
create trigger rooted_in_christ_four_pins before insert or update of pinned on rooted_in_christ.posts for each row execute function rooted_in_christ.enforce_four_pinned_posts();
