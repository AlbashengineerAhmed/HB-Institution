import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDashboardRoute } from '../../utils/roleUtils';

const RoleRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const dashboardRoute = getDashboardRoute(user.role);
      navigate(dashboardRoute, { replace: true });
    } else if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return null; // This component doesn't render anything
};

export default RoleRedirect;