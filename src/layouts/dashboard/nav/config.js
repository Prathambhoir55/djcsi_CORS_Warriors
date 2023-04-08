// component
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const isEmployee = JSON.parse(localStorage.getItem('cm_user'))?.isemployee;

const navConfig = isEmployee
  ? [
      {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: icon('ic_disabled'),
      },
    ]
  : [
      {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
      },
      {
        title: 'user',
        path: '/dashboard/user',
        icon: icon('ic_user'),
      },
      {
        title: 'product',
        path: '/dashboard/products',
        icon: icon('ic_cart'),
      },
      {
        title: 'Check',
        path: '/dashboard/check',
        icon: icon('ic_lock'),
      },
      {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: icon('ic_disabled'),
      },
    ];

export default navConfig;
