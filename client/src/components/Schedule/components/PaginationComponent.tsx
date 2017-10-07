import * as React from "react";

export default ({itemsCnt, rows, activePage, onSelect}) => {
  const pages = Math.ceil(itemsCnt/rows);
  const items = [];

  for(let i=1; i<=pages; i++) {
    const classes=['page-item'];
    if (i===activePage) classes.push('active');
    items.push(
      (
        <li className={classes.join(' ')} key={"page-"+i}>
          <a className="page-link" href="#" onClick={onSelect(i)}>
            {i}
          </a>
        </li>
      )
    );
  }

  return (
    <ul className="pagination">
      {items}
    </ul>
  )
}
