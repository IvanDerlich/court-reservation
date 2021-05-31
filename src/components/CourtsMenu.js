import { Link } from 'react-router-dom';

import './CourtsMenu.scss';

function CourtsMenu() {
  // const allMenuItem = document.querySelector('#courts-menu-item-all');
  // const mineMenuItem = document.querySelector('#courts-menu-item-mine');
  // const newMenuItem = document.querySelector('#courts-menu-item-new');

  // const handleClick = type => {
  //   switch (type) {
  //     case 'mine':
  //       allMenuItem.classList.remove('active');
  //       mineMenuItem.classList.add('active');
  //       newMenuItem.classList.remove('active');
  //       break;
  //     case 'new':
  //       allMenuItem.classList.remove('active');
  //       mineMenuItem.classList.remove('active');
  //       newMenuItem.classList.add('active');
  //       break;
  //     case 'all':
  //       allMenuItem.classList.add('active');
  //       mineMenuItem.classList.remove('active');
  //       newMenuItem.classList.remove('active');
  //       break;
  //     default:
  //       // eslint-disable-next-line no-console
  //       console.error('Error');
  //   }
  // };

  return (
    <div className="vertical-menu">
      <Link
        to="/courts/mine"
        id="courts-menu-item-mine"
        // className="active"
        // onClick={() => handleClick('mine')}
      >
        <h2> See your own courts</h2>
      </Link>
      <Link
        to="/courts/new"
        id="courts-menu-item-new"
        // onClick={() => handleClick('new')}
      >
        <h2> Create a court </h2>
      </Link>
      <Link
        to="/courts/all"
        id="courts-menu-item-all"
        // onClick={() => handleClick('all')}
      >
        <h2> See all courts from all users</h2>
      </Link>
    </div>
  );
}

export default CourtsMenu;
