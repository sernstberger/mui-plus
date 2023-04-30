import NumberInput, { NumberInputProps } from '../number-input/number-input';

export interface MoneyProps extends NumberInputProps {
  // fieldName: string;
  // label: React.ReactNode;
}

export function Money({ fieldName, ...rest }: MoneyProps) {
  return <NumberInput fieldName={fieldName} prefix="$" {...rest} />;
}

export default Money;
