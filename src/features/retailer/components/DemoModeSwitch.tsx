import { useNavigate } from 'react-router-dom';
import { Button } from '@design/components/Button';
import { Icon } from '@design/components/Icon';

export function DemoModeSwitch(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button variant="outline" size="sm" onClick={() => navigate('/retailer')}>
      <span className="flex items-center gap-1.5">
        <Icon name="external" size={14} />
        View as Retailer
      </span>
    </Button>
  );
}
