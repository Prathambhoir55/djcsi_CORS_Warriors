// component
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Employees',
    path: '/dashboard/employee',
    icon: icon('ic_user'),
  },
  {
    title: 'Black List',
    path: '/blacklist',
    icon: icon('ic_warning'),
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

const empConfig = [
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
];

export default {
  navConfig,
  empConfig,
};
