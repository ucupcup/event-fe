import { formatIDR } from '@shared/data/events';

export default function Price({ value }: { value: number }) {
  return <>{formatIDR(value)}</>;
}

