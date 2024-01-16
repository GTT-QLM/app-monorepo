import { ListItem } from '@onekeyhq/components';

export type IListItemSelectOption<T> = {
  value: T;
  title: string;
  subtitle?: string;
};

export type IListItemSelectProps<T> = {
  value: string;
  options: IListItemSelectOption<T>[];
  onChange: (value: T) => void;
  testID?: string;
};

export function ListItemSelect<T>({
  value,
  options,
  onChange,
  testID = '',
}: IListItemSelectProps<T>) {
  return options.map((opt) => (
    <ListItem
      key={opt.title}
      title={opt.title}
      subtitle={opt.subtitle}
      onPress={() => onChange?.(opt.value)}
      testID={`${testID}-${opt.value}`}
    >
      {value === opt.value ? (
        <ListItem.IconButton
          iconProps={{ 'color': '$iconActive', size: '$6' }}
          icon="CheckRadioSolid"
        />
      ) : null}
    </ListItem>
  ));
}
