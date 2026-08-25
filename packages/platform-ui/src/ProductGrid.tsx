import { ReactNode } from 'react';

export type ProductTile = {
  id: string;
  index?: string;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  featured?: boolean;
  actionIcon?: ReactNode;
};

export const ProductGrid = ({ items, id }: { items: ProductTile[]; id?: string }) => (
  <section className="product-grid" id={id}>
    {items.map((item) => (
      <article className={`product-tile ${item.featured ? 'featured' : ''}`} id={item.id} key={item.id}>
        {item.index && <span className="tile-index">{item.index}</span>}
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.href ? (
          <a className="product-tile-action" href={item.href}>
            {item.actionLabel} {item.actionIcon}
          </a>
        ) : (
          <button className="product-tile-action" type="button">
            {item.actionLabel} {item.actionIcon}
          </button>
        )}
      </article>
    ))}
  </section>
);
