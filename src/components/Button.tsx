import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';
import React from 'react';

interface ButtonProps extends IButtonProps {
  title?: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  const IS_SECONDARY = type === 'SECONDARY';

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bgColor={IS_SECONDARY ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: IS_SECONDARY ? 'red.600' : 'yellow.600',
      }}
      _loading={{
        _spinner: { color: 'black' },
      }}
      {...rest}>
      <Text fontSize="sm" fontFamily="heading" color={IS_SECONDARY ? 'white' : 'black'}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
