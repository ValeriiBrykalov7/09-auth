import Link from 'next/link';
import css from './SidebarNotes.module.css';

const SidebarNotes = () => {
  const categories = ['Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];
  return (
    <ul className={css.menuList}>
      <li key='All' className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
